/**
 * Type declarations for TOML file imports
 */

import type { TypedACLConfig } from './acl-config.js';

declare module '../acls.toml' {
  const content: TypedACLConfig;
  export default content;
}
