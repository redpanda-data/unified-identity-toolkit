# Redpanda Unified Identity Toolkit

A command-line tool to synchronize roles and role bindings from Redpanda Cloud clusters to Redpanda Self-Managed clusters. This tool enables seamless migration of identity and access control settings between cloud and self-managed environments.

## Features

- **Role synchronization**: Sync Admin, Writer, and Reader roles from Redpanda Cloud to Redpanda Self-Managed
- **Principal migration**: Transfer user and service account assignments
- **ACL management**: Create and reconcile access control lists (ACLs) automatically
- **Flexible configuration**: Configure environment variables and command-line flags
- **Cross-platform**: Available for Linux, macOS, and Windows
- **Single binary**: No runtime dependencies required

## Prerequisites

- Redpanda Cloud API token with appropriate permissions (see Step 1)
- Access to target Redpanda Self-Managed cluster
- Network connectivity to both the Cloud API and the Self-Managed cluster

## Get Started

### Step 1: Get a Valid JWT Token

To use this toolkit, you need a Redpanda Cloud API token. You can obtain one with a service account's client ID and secret.

#### Create a Service Account

1. Go to the **Service Account** tab of the **Organization IAM** page in the [Redpanda Cloud UI](https://cloud.redpanda.com).
2. Click **Create service account**.
3. Enter a name and description, then click **Create**.
4. Copy and save the **Client ID** and **Client Secret**.

#### Generate an Access Token

Run the following curl command, replacing `<your-client-id>` and `<your-client-secret>` with the values from your service account:

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

**Important Notes**

- **Token lifetime**: Access tokens are valid for 4 hours. You must regenerate them as needed.
- **Token scope**: The same token works for both Control Plane API calls and Data Plane operations.
- **Security**: Store your client credentials securely and never commit them to version control.

For details, see the [Redpanda Cloud authentication documentation](https://docs.redpanda.com/redpanda-cloud/security/cloud-authentication/#authenticate-to-the-cloud-api).

### Step 2: Install the Toolkit

#### Option 1: Pre-compiled Binaries (Recommended)

Download the appropriate binary for your platform:

- **Linux**: `out/linux/unified-identity-toolkit`
- **macOS**: `out/macos/unified-identity-toolkit`
- **Windows**: `out/windows/unified-identity-toolkit.exe`

Make the binary executable (Linux/macOS):
```bash
chmod +x out/linux/unified-identity-toolkit
```

#### Option 2: Node.js (no build)

If you have Node.js 18+ installed, you can run the tool directly:

```bash
# Set your Cloud API token
export REDPANDA_CLOUD_API_TOKEN="your-cloud-api-token"

# Run the sync command using Node.js
node dist/cli.js sync
```

### Step 3: Run the Sync

#### Interactive Mode (Recommended)
```bash
# Set your Cloud API token
export REDPANDA_CLOUD_API_TOKEN="your-cloud-api-token"

# Run the sync command (binary)
./out/linux/unified-identity-toolkit sync

# OR use Node.js
node dist/cli.js sync
```

The tool guides you through:
1. Cluster selection (if multiple clusters are available)
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

# OR use Node.js
node dist/cli.js sync
```

## Configuration Reference

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REDPANDA_CLOUD_API_TOKEN` | ✅ | Cloud API authentication token |
| `REDPANDA_DATAPLANE_TOKEN` | ❌ | Data Plane API token (falls back to cloud token) |
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
  --dataplane-token <token>  Data Plane API token (optional)
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

### Admin role
- Full cluster administration rights
- All Kafka operations on all resources
- Schema Registry management
- Consumer group management
- Topic and partition administration

### Writer role
- Produce to topics with `ALLOW` permission
- Create topics (if auto-creation enabled)
- Schema Registry write operations
- Limited consumer group access

### Reader role
- Consume from topics with `ALLOW` permission
- Read-only Schema Registry access
- Consumer group membership
- Topic metadata read access

## Troubleshooting

### Common Issues

| Error | Cause | Solution |
|-------|-------|---------|
| `Cloud API token is required` | Missing authentication | Set `REDPANDA_CLOUD_API_TOKEN` or use `--cloud-token` |
| `No ready clusters found` | No accessible clusters | Verify token permissions and cluster status |
| `Failed to create role: permission denied` | Insufficient permissions | Ensure Data Plane token has admin permissions on the target cluster |


### Get Help

```bash
# Show all commands
./out/linux/unified-identity-toolkit --help

# Show sync options
./out/linux/unified-identity-toolkit sync --help

# Show environment variables documentation
./out/linux/unified-identity-toolkit env-help

# Show version
./out/linux/unified-identity-toolkit version
```

### Debug Information

The tool provides detailed console output including:
- API requests and responses
- Discovered roles and principals
- ACL permissions being created
- Synchronization progress

## Security Best Practices

- **Secure token storage**: Use environment variables, not hardcoded values.
- **Network security**: Ensure encrypted connections to all endpoints.
- **Minimal permissions**: Use tokens with only required access levels.
- **Audit trail**: Review sync operations and log changes.

## Tips

- **Documentation**: Check [Redpanda documentation](https://docs.redpanda.com/) for cluster configuration.
- **Network**: Verify connectivity to required endpoints.
- **Permissions**: Ensure API tokens have appropriate cluster access.

## License

This tool is distributed under the Business Source License (BSL-1.1).