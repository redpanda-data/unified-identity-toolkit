# Redpanda Identity Toolkit

A command-line tool for synchronizing roles and role bindings from Redpanda Cloud to Redpanda Core clusters. This tool enables seamless migration of identity and access control settings between cloud and self-hosted environments.

## Features

- 🔐 **Role Synchronization** - Sync Admin, Writer, and Reader roles from Cloud to Core
- 👥 **Principal Migration** - Transfer user and service account assignments
- 🎯 **ACL Management** - Create and reconcile Access Control Lists automatically
- 🔧 **Flexible Configuration** - Environment variables and command-line flags
- 🖥️ **Cross-Platform** - Available for Linux, macOS, and Windows
- ⚡ **Single Binary** - No runtime dependencies required

## Quick Start

### Prerequisites

- Redpanda Cloud API token with appropriate permissions
- Access to target Redpanda Core cluster
- Network connectivity to both Cloud API and Core cluster

## Getting a Valid JWT Token

To use this toolkit, you need a Redpanda Cloud API token. You can obtain one using a service account's client ID and secret.

### Step 1: Create a Service Account

1. Go to the **Service Accounts** tab in the [Redpanda Cloud UI](https://cloud.redpanda.com)
2. Click **Create service account**
3. Enter a name and description for your service account
4. Copy the **client ID** and **client secret** - you'll need these to generate tokens

### Step 2: Generate an Access Token

Use the following curl command to obtain a JWT token:

```bash
export CLOUD_CLIENT_ID=<your-client-id>
export CLOUD_CLIENT_SECRET=<your-client-secret>

export REDPANDA_CLOUD_API_TOKEN=$(curl -s --request POST \
  --url 'https://auth.prd.cloud.redpanda.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data grant_type=client_credentials \
  --data client_id="$CLOUD_CLIENT_ID" \
  --data client_secret="$CLOUD_CLIENT_SECRET" \
  --data audience=cloudv2-production.redpanda.cloud | jq -r '.access_token')
```

Replace `<your-client-id>` and `<your-client-secret>` with the values from your service account.

### Important Notes

- **Token Lifetime**: Access tokens are valid for 4 hours. You'll need to regenerate them as needed.
- **Token Scope**: The same token works for both Control Plane API calls and Data Plane operations on your clusters.
- **Security**: Store your client credentials securely and never commit them to version control.

For more details, see the [Redpanda Cloud authentication documentation](https://docs.redpanda.com/redpanda-cloud/security/cloud-authentication/#authenticate-to-the-cloud-api).

### Installation

#### Option 1: Pre-compiled Binaries (Recommended)

Download the appropriate binary for your platform:

- **Linux**: `out/linux/unified-identity-toolkit`
- **macOS**: `out/macos/unified-identity-toolkit`
- **Windows**: `out/windows/unified-identity-toolkit.exe`

Make the binary executable (Linux/macOS):
```bash
chmod +x out/linux/unified-identity-toolkit
```

#### Option 2: Node.js (No Build Required)

If you have Node.js 18+ installed, you can run the tool directly:

```bash
# Set your Cloud API token
export REDPANDA_CLOUD_API_TOKEN="your-cloud-api-token"

# Run the sync command using Node.js
node dist/cli.js sync
```

### Basic Usage

#### Interactive Mode (Recommended)
```bash
# Set your Cloud API token
export REDPANDA_CLOUD_API_TOKEN="your-cloud-api-token"

# Run the sync command (binary)
./out/linux/unified-identity-toolkit sync

# OR using Node.js
node dist/cli.js sync
```

The tool will guide you through:
1. Cluster selection (if multiple clusters available)
2. Role selection (Admin, Writer, Reader)
3. ACL permission review and confirmation

#### Automated Mode
```bash
# Set environment variables for fully automated sync
export REDPANDA_CLOUD_API_TOKEN="your-cloud-api-token"
export REDPANDA_CLUSTER_ID="cluster-abc123"
export REDPANDA_ROLE_NAME="Admin"
export REDPANDA_UPSERT_ACLS="true"

# Run automated sync (binary)
./out/linux/unified-identity-toolkit sync

# OR using Node.js
node dist/cli.js sync
```

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REDPANDA_CLOUD_API_TOKEN` | ✅ | Cloud API authentication token |
| `REDPANDA_DATAPLANE_TOKEN` | ❌ | Dataplane API token (falls back to cloud token) |
| `REDPANDA_CLUSTER_ID` | ❌ | Target cluster ID (skips interactive selection) |
| `REDPANDA_ROLE_NAME` | ❌ | Role to sync: Admin, Writer, or Reader |
| `REDPANDA_UPSERT_ACLS` | ❌ | Set to `true` to auto-reconcile ACLs without prompts |

### Command-Line Flags

```bash
# Using binary
./out/linux/unified-identity-toolkit sync [options]

# Using Node.js
node dist/cli.js sync [options]

Options:
  --cloud-token <token>      Cloud API token
  --dataplane-token <token>  Dataplane API token (optional)
  --cloud-url <url>          Cloud API URL (default: https://api.redpanda.com)
  --cluster-id <id>          Target cluster ID
  --role-name <name>         Role name to sync (Admin, Writer, Reader)
  --upsert-acls              Always reconcile ACLs without confirmation
  -h, --help                 Show help information
```

## Examples

### Sync Admin Role to Specific Cluster
```bash
./out/linux/unified-identity-toolkit sync \
  --cloud-token "rp_abc123..." \
  --cluster-id "cluster-xyz789" \
  --role-name "Admin" \
  --upsert-acls
```

### Interactive Sync with Manual Confirmation
```bash
export REDPANDA_CLOUD_API_TOKEN="rp_abc123..."

# Using binary
./out/linux/unified-identity-toolkit sync

# OR using Node.js
node dist/cli.js sync
```

### Sync to Custom Cloud Environment
```bash
./out/linux/unified-identity-toolkit sync \
  --cloud-token "rp_abc123..." \
  --cloud-url "https://api.custom-cloud.redpanda.com" \
  --role-name "Writer"
```

## Role Types and Permissions

### Admin Role
- Full cluster administration rights
- All Kafka operations on all resources
- Schema Registry management
- Consumer group management
- Topic and partition administration

### Writer Role
- Produce to topics with `ALLOW` permission
- Create topics (if auto-creation enabled)
- Schema Registry write operations
- Limited consumer group access

### Reader Role
- Consume from topics with `ALLOW` permission
- Read-only Schema Registry access
- Consumer group membership
- Topic metadata read access

## Troubleshooting

### Common Issues

**Authentication Error**
```
❌ Cloud API token is required
```
**Solution**: Set `REDPANDA_CLOUD_API_TOKEN` environment variable or use `--cloud-token` flag.

**No Clusters Found**
```
❌ No ready clusters found
```
**Solution**: Ensure your API token has access to clusters and clusters are in READY state.

**Permission Denied**
```
❌ Failed to create role: permission denied
```
**Solution**: Verify your dataplane token has admin permissions on the target cluster.

### Getting Help

```bash
# Show all available commands
./out/linux/unified-identity-toolkit --help

# Show sync command options
./out/linux/unified-identity-toolkit sync --help

# Show environment variables documentation
./out/linux/unified-identity-toolkit env-help

# Show version information
./out/linux/unified-identity-toolkit version
```

### Debug Mode

For troubleshooting, you can run the tool with additional logging by examining the console output. The tool provides detailed information about:

- API requests being made
- Roles and principals discovered
- ACL permissions being created
- Synchronization progress and results

## Security Considerations

- **Token Storage**: Store API tokens securely and avoid committing them to version control
- **Network Security**: Ensure secure network connections to both Cloud API and Core clusters
- **Permission Scope**: Use tokens with minimal required permissions
- **Audit Trail**: Review sync results and maintain logs of identity changes

## Support

For issues and questions:
- Review the troubleshooting section above
- Check Redpanda documentation for cluster configuration
- Verify API token permissions and expiration
- Ensure network connectivity to required endpoints

## License

This tool is distributed under the Business Source License (BSL-1.1).