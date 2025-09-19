/**
 * TypeScript types for ACL configuration (acls.toml)
 * Provides type safety for TOML configuration imports
 */

/**
 * ACL resource types as defined in the dataplane ACL protobuf
 */
export type ACLResourceType =
  | 'UNSPECIFIED'
  | 'ANY'
  | 'TOPIC'
  | 'GROUP'
  | 'CLUSTER'
  | 'TRANSACTIONAL_ID'
  | 'DELEGATION_TOKEN'
  | 'USER'
  | 'REGISTRY'
  | 'SUBJECT';

/**
 * ACL operations as defined in the dataplane ACL protobuf
 */
export type ACLOperation =
  | 'UNSPECIFIED'
  | 'ANY'
  | 'ALL'
  | 'READ'
  | 'WRITE'
  | 'CREATE'
  | 'DELETE'
  | 'ALTER'
  | 'DESCRIBE'
  | 'CLUSTER_ACTION'
  | 'DESCRIBE_CONFIGS'
  | 'ALTER_CONFIGS'
  | 'IDEMPOTENT_WRITE'
  | 'CREATE_TOKENS'
  | 'DESCRIBE_TOKENS';

/**
 * ACL permission types as defined in the dataplane ACL protobuf
 */
export type ACLPermissionType = 'UNSPECIFIED' | 'ANY' | 'DENY' | 'ALLOW';

/**
 * ACL resource pattern types as defined in the dataplane ACL protobuf
 */
export type ACLResourcePatternType = 'UNSPECIFIED' | 'ANY' | 'MATCH' | 'LITERAL' | 'PREFIXED';

/**
 * Individual ACL entry configuration
 */
export interface ACLEntry {
  /** The type of resource this ACL applies to */
  resource_type: ACLResourceType;

  /** The name of the resource (e.g., topic name, '*' for all) */
  resource_name: string;

  /** How the resource name should be matched */
  resource_pattern_type: ACLResourcePatternType;

  /** The operation being allowed/denied */
  operation: ACLOperation;

  /** Whether this ACL allows or denies the operation */
  permission_type: ACLPermissionType;

  /** Host pattern (usually '*' for any host) */
  host: string;
}

/**
 * Role configuration with description and ACL entries
 */
export interface RoleConfig {
  /** Human-readable description of what this role provides */
  description: string;

  /** Array of ACL entries that define the role's permissions */
  acls: ACLEntry[];
}

/**
 * Complete ACL configuration structure
 */
export interface ACLConfig {
  /** Map of role names to their configurations */
  roles: {
    [roleName: string]: RoleConfig;
  };
}

/**
 * Well-known role names used in the application
 */
export type KnownRoleName = 'admin' | 'writer' | 'reader';

/**
 * Type-safe accessor for known roles
 */
export type KnownRolesConfig = {
  [K in KnownRoleName]: RoleConfig;
};

/**
 * Helper type for the complete typed ACL configuration
 */
export interface TypedACLConfig extends ACLConfig {
  roles: KnownRolesConfig & { [roleName: string]: RoleConfig };
}
