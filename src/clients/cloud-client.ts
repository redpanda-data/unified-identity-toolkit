/**
 * Redpanda Cloud API client for fetching roles, users, and clusters
 * Using ConnectRPC ES v2 API patterns
 */

import { BadRequestSchema } from '@buf/googleapis_googleapis.bufbuild_es/google/rpc/error_details_pb.js';
import {
  type Cluster,
  Cluster_State,
  ClusterService,
} from '@buf/redpandadata_cloud.bufbuild_es/redpanda/api/controlplane/v1/cluster_pb.js';
import { OrganizationService } from '@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1/organization_pb.js';
import {
  type RoleBinding,
  RoleBinding_ScopeResourceType,
  RoleBindingService,
} from '@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1/role_binding_pb.js';
import { ServiceAccountService } from '@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1/service_account_pb.js';
import { UserService } from '@buf/redpandadata_cloud.bufbuild_es/redpanda/api/iam/v1/user_pb.js';
import { ConnectError, createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-node';

import { createBearerTokenInterceptor, createRetryInterceptor } from '../interceptors.js';
import type { ClusterInfo, MigrationConfig, RoleWithPrincipals } from '../types/index.js';
import { paginateToArray, paginateToMap } from '../utils/pagination.js';

function formatConnectError(error: unknown): string {
  if (error instanceof ConnectError) {
    // Extract key information for cleaner display
    const formattedError: { code: unknown; message: string; validationErrors?: string[] } = {
      code: error.code,
      message: error.message || error.rawMessage,
    };

    // Use proper ConnectError.findDetails method to extract BadRequest details
    try {
      const badRequestDetails = error.findDetails(BadRequestSchema);
      if (badRequestDetails.length > 0) {
        const validationErrors: string[] = [];
        for (const badRequest of badRequestDetails) {
          if (badRequest.fieldViolations) {
            validationErrors.push(
              ...badRequest.fieldViolations.map(
                (violation) => `${violation.field}: ${violation.description}`
              )
            );
          }
        }
        if (validationErrors.length > 0) {
          formattedError.validationErrors = validationErrors;
        }
      }
    } catch (_detailError) {
      // Fallback to original details if parsing fails
    }

    return JSON.stringify(formattedError, null, 2);
  }

  return JSON.stringify(
    {
      type: 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
    },
    null,
    2
  );
}

export class RedpandaCloudClient {
  private readonly clusterClient;
  private readonly userClient;
  private readonly serviceAccountClient;
  private readonly roleBindingClient;
  private readonly organizationClient;

  constructor(readonly config: MigrationConfig) {
    const transport = createConnectTransport({
      httpVersion: '2',
      baseUrl: config.cloudApiBaseUrl ?? 'https://api.redpanda.com',
      interceptors: [createBearerTokenInterceptor(config.cloudApiToken), createRetryInterceptor()],
    });

    this.clusterClient = createClient(ClusterService, transport);
    this.userClient = createClient(UserService, transport);
    this.serviceAccountClient = createClient(ServiceAccountService, transport);
    this.roleBindingClient = createClient(RoleBindingService, transport);
    this.organizationClient = createClient(OrganizationService, transport);
  }

  async listClusters(): Promise<ClusterInfo[]> {
    return paginateToArray(
      {},
      (request) => this.clusterClient.listClusters(request),
      (response) =>
        response.clusters.filter(this.isClusterReady).map((cluster) => ({
          id: cluster.id,
          name: cluster.name,
          dataplaneApiUrl: cluster.dataplaneApi?.url ?? '',
          resourceGroupId: cluster.resourceGroupId,
        })),
      { requestName: 'Clusters' }
    );
  }

  async getCluster(clusterId: string): Promise<ClusterInfo> {
    const request = {
      id: clusterId,
    };
    console.log('📤 Get cluster request:', JSON.stringify(request, null, 2));

    const response = await this.clusterClient.getCluster(request);

    if (!response.cluster) {
      throw new Error(`Cluster with ID ${clusterId} not found or response is empty`);
    }

    return {
      id: response.cluster.id,
      name: response.cluster.name,
      dataplaneApiUrl: response.cluster.dataplaneApi?.url ?? '',
      resourceGroupId: response.cluster.resourceGroupId,
    };
  }

  async getCurrentOrganizationId(): Promise<string> {
    try {
      console.log('📤 Getting current organization...');
      const response = await this.organizationClient.getCurrentOrganization({});

      if (!response.organization?.id) {
        throw new Error('Current organization not found or has no ID');
      }

      console.log(`📊 Current organization ID: ${response.organization.id}`);
      return response.organization.id;
    } catch (error) {
      console.error('Failed to get current organization:');
      console.error(formatConnectError(error));
      throw error;
    }
  }

  async getUsers(): Promise<Map<string, string>> {
    try {
      return paginateToMap(
        { readMask: { paths: ['id', 'email'] } },
        (request) => this.userClient.listUsers(request),
        (response) => response.users,
        (user) => [user.id, user.email],
        { requestName: 'Users' }
      );
    } catch (error) {
      console.error('Failed to fetch users:');
      console.error(formatConnectError(error));
      throw error;
    }
  }

  async getServiceAccounts(): Promise<Map<string, string>> {
    try {
      return paginateToMap(
        {},
        (request) => this.serviceAccountClient.listServiceAccounts(request),
        (response) => response.serviceAccounts,
        (sa) => [sa.id, `${sa.id}@iam.serviceaccount.redpanda.com`],
        { requestName: 'Service accounts' }
      );
    } catch (error) {
      console.error('Failed to fetch service accounts:');
      console.error(formatConnectError(error));
      throw error;
    }
  }

  async getRoleWithPrincipals(
    targetRole: string,
    cluster?: ClusterInfo
  ): Promise<RoleWithPrincipals | null> {
    try {
      // Fetch role bindings from all 3 scopes
      console.log(`Fetching role bindings for ${targetRole} across all scopes...`);
      const roleBindings = await this.getRoleBindingsForRoleAllScopes(targetRole, cluster);

      if (roleBindings.length === 0) {
        return null;
      }

      // Fetch users and service accounts
      console.log('Fetching users...');
      const users = await this.getUsers();

      console.log('Fetching service accounts...');
      const serviceAccounts = await this.getServiceAccounts();

      // Combine user and service account mappings
      const accountMap = new Map([...users, ...serviceAccounts]);

      // Group bindings by role, filtering for target role only
      const principals = new Set<string>();

      for (const binding of roleBindings) {
        if (binding.roleName !== targetRole) {
          continue;
        }

        const email = accountMap.get(binding.accountId);
        if (email) {
          principals.add(email);
        }
      }

      return {
        roleName: targetRole,
        principals: Array.from(principals),
      };
    } catch (error) {
      console.error(`Failed to fetch role ${targetRole} with principals:`);
      console.error(formatConnectError(error));
      throw error;
    }
  }

  private async getRoleBindingsForRoleAllScopes(
    roleName: string,
    cluster?: ClusterInfo
  ): Promise<RoleBinding[]> {
    const allBindings: RoleBinding[] = [];

    try {
      // Get organization ID first
      const organizationId = await this.getCurrentOrganizationId();

      // 1. Organization scope - using organization ID
      console.log(
        `🏢 Fetching role bindings for ${roleName} at ORGANIZATION scope (${organizationId})...`
      );
      const orgBindings = await this.getRoleBindingsWithScope(roleName, {
        resourceType: RoleBinding_ScopeResourceType.ORGANIZATION,
        resourceId: organizationId,
      });
      allBindings.push(...orgBindings);
      console.log(`   Found ${orgBindings.length} bindings at organization scope`);

      if (cluster) {
        // 2. Resource Group scope - using cluster's resource group ID
        console.log(
          `📋 Fetching role bindings for ${roleName} at RESOURCE_GROUP scope (${cluster.resourceGroupId})...`
        );
        const rgBindings = await this.getRoleBindingsWithScope(roleName, {
          resourceType: RoleBinding_ScopeResourceType.RESOURCE_GROUP,
          resourceId: cluster.resourceGroupId,
        });
        allBindings.push(...rgBindings);
        console.log(`   Found ${rgBindings.length} bindings at resource group scope`);

        // 3. Cluster scope - using cluster ID
        console.log(`🖥️ Fetching role bindings for ${roleName} at CLUSTER scope (${cluster.id})...`);
        const clusterBindings = await this.getRoleBindingsWithScope(roleName, {
          resourceType: RoleBinding_ScopeResourceType.CLUSTER,
          resourceId: cluster.id,
        });
        allBindings.push(...clusterBindings);
        console.log(`   Found ${clusterBindings.length} bindings at cluster scope`);
      } else {
        console.log('⚠️ No cluster provided - skipping resource group and cluster scope bindings');
      }

      console.log(`📊 Total role bindings fetched for ${roleName}: ${allBindings.length}`);
      return allBindings;
    } catch (error) {
      console.error(`Failed to fetch role bindings for ${roleName} across all scopes:`);
      console.error(formatConnectError(error));
      throw error;
    }
  }

  private async getRoleBindingsWithScope(
    roleName: string,
    scope: { resourceType: RoleBinding_ScopeResourceType; resourceId?: string }
  ): Promise<RoleBinding[]> {
    try {
      const scopeFilter = scope.resourceId
        ? { resourceType: scope.resourceType, resourceId: scope.resourceId }
        : { resourceType: scope.resourceType };

      return paginateToArray(
        { filter: { roleName: roleName, scope: scopeFilter } },
        (request) => this.roleBindingClient.listRoleBindings(request),
        (response) => response.roleBindings,
        {
          requestName: `Role bindings for ${roleName} with scope ${scope.resourceType}`,
          logRequests: true,
          logResults: false, // Handled by parent method
        }
      );
    } catch (error) {
      console.error(
        `Failed to fetch role bindings for ${roleName} with scope ${scope.resourceType}:`
      );
      console.error(formatConnectError(error));
      throw error;
    }
  }

  private isClusterReady(cluster: Cluster): boolean {
    return cluster.state === Cluster_State.READY;
  }
}
