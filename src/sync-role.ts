/**
 * Main migration logic for Redpanda Identity Migration
 * Migrates 3 roles from Cloud to Core with their principals
 */

import {
  ACL_Operation,
  ACL_PermissionType,
  ACL_ResourcePatternType,
  ACL_ResourceType,
} from '@buf/redpandadata_dataplane.bufbuild_es/redpanda/api/dataplane/v1/acl_pb.js';
import { confirm, select } from '@inquirer/prompts';
import aclConfig from '../acls.toml';
import { RedpandaCloudClient } from './clients/cloud-client.js';
import { RedpandaDataplaneClient } from './clients/dataplane-client.js';
import type { TypedACLConfig } from './types/acl-config.js';
import type { ClusterInfo, MigrationConfig } from './types/index.js';

// Type assertion for TOML import
const typedAclConfig = aclConfig as TypedACLConfig;

export interface MigrationResult {
  success: boolean;
  totalRoles: number;
  migratedRoles: number;
  totalPrincipals: number;
  errors: string[];
}

async function createRoleAcls(
  dataplaneClient: RedpandaDataplaneClient,
  roleName: string,
  roleType: string
): Promise<boolean> {
  const roleConfig = typedAclConfig.roles[roleType];
  if (!roleConfig || !roleConfig.acls) {
    console.warn(`⚠️ No ACL configuration found for role type: ${roleType}`);
    return true;
  }

  const principal = `RedpandaRole:${roleName}`;
  console.log(`🔐 Creating ${roleConfig.acls.length} ACLs for role: ${roleName}`);

  let allSuccess = true;
  for (const [index, acl] of roleConfig.acls.entries()) {
    try {
      const aclRequest = {
        resourceType: ACL_ResourceType[acl.resource_type as keyof typeof ACL_ResourceType],
        resourceName: acl.resource_name,
        resourcePatternType:
          ACL_ResourcePatternType[
            acl.resource_pattern_type as keyof typeof ACL_ResourcePatternType
          ],
        principal,
        host: acl.host,
        operation: ACL_Operation[acl.operation as keyof typeof ACL_Operation],
        permissionType: ACL_PermissionType[acl.permission_type as keyof typeof ACL_PermissionType],
      };

      console.log(
        `   ACL ${index + 1}/${roleConfig.acls.length} - ${acl.resource_type}:`,
        JSON.stringify(aclRequest, null, 2)
      );
      await dataplaneClient.createACL(aclRequest);
      console.log(
        `   ✅ Created ACL ${index + 1}/${roleConfig.acls.length} for ${acl.resource_type}`
      );
    } catch (error) {
      console.warn(`⚠️ Failed to create ACL ${index + 1} for ${acl.resource_type}:`);
      console.warn(error);
      allSuccess = false;
    }
  }

  return allSuccess;
}

export class IdentityMigrator {
  private readonly cloudClient: RedpandaCloudClient;

  constructor(private readonly config: MigrationConfig) {
    this.cloudClient = new RedpandaCloudClient(config);
  }

  async selectCluster(clusterId?: string): Promise<ClusterInfo | null> {
    let selectedClusterId: string;

    if (clusterId) {
      // Use provided cluster ID
      console.log(`✅ Using cluster ID from parameter: ${clusterId}`);
      selectedClusterId = clusterId;
    } else {
      // Interactive cluster selection
      const clusters = await this.cloudClient.listClusters();

      if (clusters.length === 0) {
        console.log('❌ No ready clusters found');
        return null;
      }

      // Always show cluster selection, even for single cluster
      selectedClusterId = await select({
        message: 'Select a cluster for migration:',
        choices: clusters.map((cluster) => ({
          name: `${cluster.name} (${cluster.id})`,
          value: cluster.id,
        })),
        pageSize: 10,
        loop: false,
      });
    }

    // Get full cluster details including dataplane URL
    const selectedCluster = await this.cloudClient.getCluster(selectedClusterId);
    console.log(`✅ Using cluster: ${selectedCluster.name} (${selectedCluster.dataplaneApiUrl})`);
    return selectedCluster;
  }

  async syncRole(
    roleName: string,
    clusterId?: string,
    forceUpsertAcls = false
  ): Promise<MigrationResult> {
    const result: MigrationResult = {
      success: false,
      totalRoles: 0,
      migratedRoles: 0,
      totalPrincipals: 0,
      errors: [],
    };

    try {
      // Step 1: Select cluster
      console.log('🔍 Selecting cluster...');
      const cluster = await this.selectCluster(clusterId);
      if (!cluster) {
        result.errors.push('No cluster available for sync');
        return result;
      }

      // Step 2: Get role bindings and principals from Cloud for the specific role
      console.log(`📥 Fetching role bindings for ${roleName} from Redpanda Cloud...`);
      const roleWithPrincipals = await this.cloudClient.getRoleWithPrincipals(roleName, cluster);

      if (!roleWithPrincipals) {
        console.log(`ℹ️ No role binding found for ${roleName}`);
        result.success = true;
        return result;
      }

      result.totalRoles = 1;
      result.totalPrincipals = roleWithPrincipals.principals.length;

      console.log(`Found role ${roleName} with ${result.totalPrincipals} principals`);

      // Step 3: Create dataplane client
      const dataplaneClient = new RedpandaDataplaneClient(cluster.dataplaneApiUrl, this.config);

      // Step 4: Sync the role
      console.log('🔄 Starting sync...');

      const coreRoleName = `__redpanda_cloud_role_${roleName.toLowerCase()}`;
      console.log(
        `Processing role: ${coreRoleName} (${roleWithPrincipals.principals.length} principals)`
      );

      try {
        // Create role in Core (without ACLs)
        const roleResult = await dataplaneClient.createRole(coreRoleName);
        if (!roleResult.success) {
          result.errors.push(`Failed to create role: ${coreRoleName}`);
          return result;
        }

        // Handle ACL creation/reconciliation
        let shouldCreateAcls = !roleResult.alreadyExists; // Create ACLs for new roles by default

        if (roleResult.alreadyExists) {
          if (forceUpsertAcls) {
            console.log(
              `✅ Force upsert mode: will reconcile ACLs for existing role ${coreRoleName}`
            );
            shouldCreateAcls = true;
          } else {
            shouldCreateAcls = await confirm({
              message: `Role ${coreRoleName} already exists. Do you want to reconcile/update its ACL permissions?`,
              default: true,
            });
          }
        }

        if (shouldCreateAcls) {
          console.log(`📤 Creating ACLs for role: ${coreRoleName}`);
          const aclCreated = await createRoleAcls(
            dataplaneClient,
            coreRoleName,
            roleName.toLowerCase()
          );
          if (!aclCreated) {
            result.errors.push(`Failed to create/reconcile ACLs for role: ${coreRoleName}`);
            // Continue with membership sync even if ACL creation fails
          }
        } else {
          console.log(`⏭️  Skipping ACL reconciliation for role: ${coreRoleName}`);
        }

        // Sync principals
        const membershipSynced = await dataplaneClient.syncRoleMembership(coreRoleName, [
          ...roleWithPrincipals.principals,
        ]);

        if (!membershipSynced) {
          result.errors.push(`Failed to sync membership for role: ${coreRoleName}`);
          return result;
        }

        result.migratedRoles++;
        console.log(`✅ Synced: ${coreRoleName}`);
      } catch (error) {
        const errorMsg = `Error processing role ${coreRoleName}: ${error}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }

      // Step 5: Summary
      result.success = result.migratedRoles === result.totalRoles && result.errors.length === 0;

      console.log('\n📊 Sync Summary:');
      console.log(`✓ Role synced: ${result.migratedRoles}/${result.totalRoles}`);
      console.log(`✓ Total principals: ${result.totalPrincipals}`);

      if (result.errors.length > 0) {
        console.log(`❌ Errors: ${result.errors.length}`);
        for (const error of result.errors) {
          console.log(`  - ${error}`);
        }
      }

      if (result.success) {
        console.log('🎉 Sync completed successfully!');
      } else {
        console.log('⚠️ Sync completed with errors');
      }

      return result;
    } catch (error) {
      const errorMsg = `Sync failed: ${error}`;
      result.errors.push(errorMsg);
      console.error(errorMsg);
      return result;
    }
  }
}
