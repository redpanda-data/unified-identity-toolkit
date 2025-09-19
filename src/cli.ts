#!/usr/bin/env node
/**
 * CLI for Redpanda Identity Migration Tool
 */

import { confirm, select } from '@inquirer/prompts';
import { Command } from 'commander';
import aclConfig from '../acls.toml';
import { IdentityMigrator } from './sync-role.js';
import type { ACLEntry, TypedACLConfig } from './types/acl-config.js';
import type { MigrationConfig } from './types/index.js';

// Type assertion for TOML import
const typedAclConfig = aclConfig as TypedACLConfig;

const program = new Command();

function generateAclConfirmationMessage(roleName: string): string {
  const roleType = roleName.toLowerCase();
  const roleConfig = typedAclConfig.roles[roleType];

  if (!roleConfig || !roleConfig.acls) {
    return `⚠️  No ACL configuration found for role: ${roleName}`;
  }

  const messages = [
    `🔐 ACL Permissions that will be created for ${roleName} role:`,
    `📋 Description: ${roleConfig.description}`,
    '',
  ];

  // Group ACLs by resource type for cleaner display
  const aclsByResource =
    roleConfig.acls?.reduce(
      (acc, acl) => {
        if (!acc[acl.resource_type]) {
          acc[acl.resource_type] = [];
        }
        acc[acl.resource_type]?.push(acl);
        return acc;
      },
      {} as Record<string, ACLEntry[]>
    ) || {};

  Object.entries(aclsByResource).forEach(([resourceType, acls]) => {
    messages.push(`  📋 Resource Type: ${resourceType}`);

    acls?.forEach((acl) => {
      messages.push(`     • Resource Name: ${acl.resource_name}`);
      messages.push(`     • Pattern Type: ${acl.resource_pattern_type}`);
      messages.push(`     • Operation: ${acl.operation}`);
      messages.push(`     • Permission: ${acl.permission_type}`);
      messages.push(`     • Host: ${acl.host}`);
      if (acls.length > 1) messages.push('');
    });

    messages.push('');
  });

  messages.push(`  👤 Principal: RedpandaRole:__redpanda_cloud_role_${roleType}`);
  messages.push(`  📊 Total ACL entries: ${roleConfig.acls.length}`);

  return messages.join('\n');
}

program
  .name('redpanda-migration')
  .description('Migrate roles and principals from Redpanda Cloud to Core')
  .version('1.0.0');

program
  .command('sync')
  .description('Sync roles from Cloud to Core cluster')
  .option('--cloud-token <token>', 'Redpanda Cloud API token')
  .option('--dataplane-token <token>', 'Redpanda Dataplane API token (optional)')
  .option('--cloud-url <url>', 'Redpanda Cloud API URL', 'https://api.redpanda.com')
  .option('--cluster-id <id>', 'Target cluster ID (skips interactive selection)')
  .option('--role-name <name>', 'Role name to sync (skips interactive selection)')
  .option('--upsert-acls', 'Always upsert/reconcile ACLs even if role exists', false)
  .action(async (options) => {
    console.log('🚀 Redpanda Identity Sync Tool\n');

    // Get configuration from options or environment
    const cloudApiToken = options.cloudToken ?? process.env.REDPANDA_CLOUD_API_TOKEN;
    const dataplaneApiToken = options.dataplaneToken ?? process.env.REDPANDA_DATAPLANE_TOKEN;
    const clusterId = options.clusterId ?? process.env.REDPANDA_CLUSTER_ID;
    const roleName = options.roleName ?? process.env.REDPANDA_ROLE_NAME;
    const upsertAcls = options.upsertAcls ?? process.env.REDPANDA_UPSERT_ACLS === 'true';

    if (!cloudApiToken) {
      console.error('❌ Cloud API token is required');
      console.log('Set REDPANDA_CLOUD_API_TOKEN environment variable or use --cloud-token');
      process.exit(1);
    }

    // Display configuration info
    console.log('🔧 Configuration:');
    if (clusterId) console.log(`  • Cluster ID: ${clusterId}`);
    if (roleName) console.log(`  • Role Name: ${roleName}`);
    if (upsertAcls) console.log('  • ACL Upsert: Enabled');
    console.log('');

    const migrationConfig: MigrationConfig = {
      cloudApiToken,
      dataplaneApiToken,
      cloudApiBaseUrl: options.cloudUrl,
    };

    try {
      const migrator = new IdentityMigrator(migrationConfig);

      // Role selection - use provided role or prompt
      let selectedRole: string;
      if (roleName) {
        console.log(`✅ Using role from parameter/environment: ${roleName}`);
        selectedRole = roleName;
      } else {
        console.log('📋 Available roles for sync:');
        selectedRole = await select({
          message: 'Select a role to sync:',
          choices: [
            {
              name: 'Admin - Full administrative access to cluster',
              value: 'Admin',
            },
          ],
        });
        console.log(`✅ Selected role: ${selectedRole}\n`);
      }

      // ACL confirmation - skip if upsertAcls is true or show confirmation
      let confirmed = upsertAcls;
      if (!confirmed) {
        console.log(generateAclConfirmationMessage(selectedRole));
        console.log('');

        confirmed = await confirm({
          message: 'Do you want to proceed with creating these ACL permissions?',
          default: false,
        });
      } else {
        console.log('✅ ACL upsert mode enabled - will reconcile ACLs automatically\n');
      }

      if (!confirmed) {
        console.log('❌ Sync cancelled by user');
        process.exit(0);
      }

      const result = await migrator.syncRole(selectedRole, clusterId, upsertAcls);

      process.exit(result.success ? 0 : 1);
    } catch (error) {
      console.error(`❌ Sync failed: ${error}`);
      process.exit(1);
    }
  });

program
  .command('version')
  .description('Show version information')
  .action(() => {
    console.log('Redpanda Identity Migration Tool v1.0.0');
    console.log('Built with TypeScript and ConnectRPC');
  });

program
  .command('env-help')
  .description('Show environment variables documentation')
  .action(() => {
    console.log('🌍 Environment Variables:\n');
    console.log('Required:');
    console.log('  REDPANDA_CLOUD_API_TOKEN     - Cloud API authentication token');
    console.log('\nOptional:');
    console.log('  REDPANDA_DATAPLANE_TOKEN     - Dataplane API token (falls back to cloud token)');
    console.log('  REDPANDA_CLUSTER_ID          - Target cluster ID (skips interactive selection)');
    console.log('  REDPANDA_ROLE_NAME           - Role name to sync (Admin, Writer, Reader)');
    console.log('  REDPANDA_UPSERT_ACLS=true    - Always reconcile ACLs without confirmation');
    console.log('\nExample usage:');
    console.log('  export REDPANDA_CLOUD_API_TOKEN="your-token"');
    console.log('  export REDPANDA_CLUSTER_ID="cluster-123"');
    console.log('  export REDPANDA_ROLE_NAME="Admin"');
    console.log('  export REDPANDA_UPSERT_ACLS="true"');
    console.log('  redpanda-migration sync');
  });

// Parse command line arguments
program.parse();
