/**
 * Redpanda Dataplane API client for managing roles and ACLs
 * Using ConnectRPC ES v2 API patterns
 */

import { BadRequestSchema } from '@buf/googleapis_googleapis.bufbuild_es/google/rpc/error_details_pb.js';
import {
  type ACL_Operation,
  type ACL_PermissionType,
  type ACL_ResourcePatternType,
  type ACL_ResourceType,
  ACLService,
} from '@buf/redpandadata_dataplane.bufbuild_es/redpanda/api/dataplane/v1/acl_pb.js';
import {
  type RoleMembership,
  RoleMembershipSchema,
  SecurityService,
} from '@buf/redpandadata_dataplane.bufbuild_es/redpanda/api/dataplane/v1/security_pb.js';
import { create } from '@bufbuild/protobuf';
import { Code, ConnectError, createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-node';

import { createBearerTokenInterceptor, createRetryInterceptor } from '../interceptors.js';
import type { MigrationConfig } from '../types/index.js';

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

export class RedpandaDataplaneClient {
  private readonly securityClient;
  private readonly aclClient;

  constructor(
    readonly dataplaneUrl: string,
    readonly config: MigrationConfig
  ) {
    // Try dataplane token first, fallback to cloud token
    const token = config.dataplaneApiToken ?? config.cloudApiToken;

    const transport = createConnectTransport({
      httpVersion: '2',
      baseUrl: dataplaneUrl,
      interceptors: [createBearerTokenInterceptor(token), createRetryInterceptor()],
    });

    this.securityClient = createClient(SecurityService, transport);
    this.aclClient = createClient(ACLService, transport);
  }

  async createRole(roleName: string): Promise<{ success: boolean; alreadyExists: boolean }> {
    try {
      console.log('📤 Creating role request:');
      const createRoleRequest = {
        role: { name: roleName },
      };
      console.log('   Request:', JSON.stringify(createRoleRequest, null, 2));

      await this.securityClient.createRole(createRoleRequest);

      return { success: true, alreadyExists: false };
    } catch (error: unknown) {
      // Handle role already exists error gracefully
      if (
        error instanceof ConnectError &&
        (error.code === Code.AlreadyExists || error.message?.includes('already exists'))
      ) {
        console.log(`✅ Role ${roleName} already exists`);
        return { success: true, alreadyExists: true };
      }

      console.error(`❌ Failed to create role ${roleName}:`);
      console.error(formatConnectError(error));
      return { success: false, alreadyExists: false };
    }
  }

  async createACL(aclRequest: {
    resourceType: ACL_ResourceType;
    resourceName: string;
    resourcePatternType: ACL_ResourcePatternType;
    principal: string;
    host: string;
    operation: ACL_Operation;
    permissionType: ACL_PermissionType;
  }): Promise<void> {
    await this.aclClient.createACL(aclRequest);
  }

  async syncRoleMembership(roleName: string, principals: string[]): Promise<boolean> {
    try {
      console.log(`📤 Syncing membership for role: ${roleName}`);
      console.log('   Target principals:', principals);

      const currentMembers = await this.getRoleMembers(roleName);
      console.log('   Current members:', Array.from(currentMembers));

      // Normalize for comparison - remove "User:" prefix from current members
      const normalizedCurrentMembers = new Set(
        Array.from(currentMembers).map((member) =>
          member.startsWith('User:') ? member.substring(5) : member
        )
      );
      const normalizedTargetMembers = new Set(principals);

      console.log('   Target principals:', principals);

      // Find differences using normalized values (plain emails, no prefix)
      const toAdd = Array.from(normalizedTargetMembers).filter(
        (p) => !normalizedCurrentMembers.has(p)
      );
      const toRemove = Array.from(normalizedCurrentMembers).filter(
        (p) => !normalizedTargetMembers.has(p)
      );

      // Ensure no conflicts between add and remove lists
      const conflictingMembers = toAdd.filter((member) => toRemove.includes(member));
      if (conflictingMembers.length > 0) {
        console.warn(
          '⚠️  Found conflicting members in both add and remove lists:',
          conflictingMembers
        );
        console.warn('⚠️  This should not happen - skipping conflicting members');
      }

      const finalToAdd = toAdd.filter((member) => !conflictingMembers.includes(member));
      const finalToRemove = toRemove.filter((member) => !conflictingMembers.includes(member));

      console.log('   To add:', finalToAdd);
      console.log('   To remove:', finalToRemove);

      if (finalToAdd.length === 0 && finalToRemove.length === 0) {
        console.log('   No membership changes needed');
        return true;
      }

      const addMembers: RoleMembership[] = finalToAdd.map((principal) =>
        create(RoleMembershipSchema, { principal })
      );
      const removeMembers: RoleMembership[] = finalToRemove.map((principal) =>
        create(RoleMembershipSchema, { principal })
      );

      const membershipRequest = {
        roleName,
        create: false,
        add: addMembers,
        remove: removeMembers,
      };
      console.log('   Membership request:', JSON.stringify(membershipRequest, null, 2));

      await this.securityClient.updateRoleMembership(membershipRequest);

      return true;
    } catch (error) {
      console.error(`❌ Failed to sync membership for role ${roleName}:`);
      console.error(formatConnectError(error));
      return false;
    }
  }

  private async getRoleMembers(roleName: string): Promise<Set<string>> {
    try {
      const response = await this.securityClient.getRole({ roleName });
      const members = new Set<string>();

      // Members are in the GetRoleResponse.members field, not role.members
      if (response.members) {
        for (const member of response.members) {
          members.add(member.principal);
        }
      }

      return members;
    } catch (error) {
      console.warn(`Could not get members for role ${roleName}:`);
      console.warn(formatConnectError(error));
      return new Set();
    }
  }
}
