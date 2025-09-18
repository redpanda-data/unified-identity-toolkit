/**
 * Core application types for Redpanda Identity Migration
 * Simplified for migrating 3 roles and attaching principals
 */

// Simple application types
export interface MigrationConfig {
  readonly cloudApiToken: string;
  readonly dataplaneApiToken?: string;
  readonly cloudApiBaseUrl?: string;
}

export interface ClusterInfo {
  readonly id: string;
  readonly name: string;
  readonly dataplaneApiUrl: string;
  readonly resourceGroupId: string;
}

export interface RoleWithPrincipals {
  readonly roleName: string;
  readonly principals: ReadonlyArray<string>;
}
