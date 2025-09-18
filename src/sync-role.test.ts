/**
 * Tests for Redpanda Identity Migration using Bun test
 */

import { beforeEach, describe, expect, it, mock } from 'bun:test';

// Mock the inquirer/prompts module
mock.module('@inquirer/prompts', () => ({
  select: mock().mockResolvedValue('cluster-1'),
}));

// Create mock implementations
const mockCloudClient = {
  listClusters: mock(),
  getCluster: mock(),
  getAvailableRoles: mock(),
};

const mockDataplaneClient = {
  createRole: mock(),
  syncRoleMembership: mock(),
};

// Mock the client modules
mock.module('./clients/cloud-client.ts', () => ({
  RedpandaCloudClient: mock(() => mockCloudClient),
}));

mock.module('./clients/dataplane-client.ts', () => ({
  RedpandaDataplaneClient: mock(() => mockDataplaneClient),
}));

import { IdentityMigrator } from './sync-role.js';
import type { MigrationConfig } from './types/index.js';

describe('IdentityMigrator', () => {
  let migrator: IdentityMigrator;
  let mockConfig: MigrationConfig;

  beforeEach(() => {
    mockConfig = {
      cloudApiToken: 'test-cloud-token',
      dataplaneApiToken: 'test-dataplane-token',
    };
    migrator = new IdentityMigrator(mockConfig);

    // Reset all mocks
    mockCloudClient.listClusters.mockReset();
    mockCloudClient.getCluster.mockReset();
    mockDataplaneClient.createRole.mockReset();
    mockDataplaneClient.syncRoleMembership.mockReset();
  });

  describe('selectCluster', () => {
    it('should return null when no clusters available', async () => {
      mockCloudClient.listClusters.mockResolvedValue([]);

      const cluster = await migrator.selectCluster();
      expect(cluster).toBeNull();
    });

    it('should return single cluster when only one available', async () => {
      const mockCluster = {
        id: 'cluster-1',
        name: 'test-cluster',
        dataplaneApiUrl: 'https://api.test.com',
      };

      mockCloudClient.listClusters.mockResolvedValue([mockCluster]);
      mockCloudClient.getCluster.mockResolvedValue(mockCluster);

      const cluster = await migrator.selectCluster();
      expect(cluster).toEqual(mockCluster);
    });
  });
});
