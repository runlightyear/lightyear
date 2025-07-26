# Lightyear SDK

A TypeScript SDK for building data sync integrations with the Lightyear platform.

## Features

- **Type-safe Model Definitions** - Define data models with JSON Schema validation
- **Flexible Collection Management** - Group and organize related models
- **Custom App Integration** - Support for OAuth2, API Key, and Basic Auth apps
- **Builder Pattern API** - Intuitive, chainable API for defining data structures
- **Automatic Registry** - Tracks all defined elements for deployment
- **Universal Handlers** - Works in AWS Lambda, VMs, Docker, Edge Functions, and more
- **Minimal Bundle Size** - Optimized for fast cold starts and efficient execution

## Installation

```bash
npm install @runlightyear/sdk
# or
pnpm add @runlightyear/sdk
```

## Quick Start

### Defining Models

```typescript
import { defineModel, match } from "@runlightyear/sdk";

const userModel = defineModel("user")
  .withTitle("User Account")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string" },
      name: { type: "string" },
    },
  })
  .withMatchPattern(match.property("type"))
  .build();
```

### Defining Collections

```typescript
import { defineCollection } from "@runlightyear/sdk";

const crmCollection = defineCollection("crm")
  .withTitle("CRM Data")
  .addModel("contact", {
    title: "Contact Record",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        company: { type: "string" },
      },
    },
  })
  .build();
```

### Defining Custom Apps

```typescript
import {
  defineOAuth2CustomApp,
  defineApiKeyCustomApp,
  defineBasicCustomApp,
} from "@runlightyear/sdk";

// OAuth2 Custom App
const githubApp = defineOAuth2CustomApp("github")
  .withTitle("GitHub Integration")
  .addSecret("client_id", { required: true })
  .addSecret("client_secret", { required: true })
  .addVariable("base_url", { defaultValue: "https://api.github.com" })
  .build();

// API Key Custom App
const sendgridApp = defineApiKeyCustomApp("sendgrid")
  .withTitle("SendGrid Email Service")
  .addSecret("api_key", { required: true })
  .build();

// Basic Auth Custom App
const legacyApp = defineBasicCustomApp("legacy-system")
  .withTitle("Legacy System")
  .addSecret("username", { required: true })
  .addSecret("password", { required: true })
  .build();
```

## Universal Handlers

The SDK provides universal handlers that work across different deployment environments.

### Building Handlers

```bash
# Build optimized handler bundle
pnpm build:handlers

# Bundle will be created at dist/handlers.js (typically ~3.4KB)
```

### Using Handlers

````typescript
import { handler } from "@runlightyear/sdk";

// Direct invocation (VM, Docker, serverless functions, etc.)
const response = await handler(
  { operation: "deploy", payload: { environment: "prod" } },
  { requestId: "req-123", remainingTimeMs: 30000 }
);

### Using Individual Handlers

You can import and use individual handlers directly:

```typescript
import {
  handleHealth,
  handleDeploy,
  handleRegistryStats,
  handleRegistryExport
} from '@runlightyear/sdk';

// Health check with full context
const health = await handleHealth({
  requestId: 'req-123',
  remainingTimeMs: 30000,
  memoryLimitMB: '512'
});

// Health check with minimal context (optional parameters)
const healthMinimal = await handleHealth({ requestId: 'req-456' });

// Health check with no context (uses defaults)
const healthDefault = await handleHealth();

// Deploy with full configuration
const deploy = await handleDeploy({
  environment: 'production',
  baseUrl: 'https://api.lightyear.dev',
  dryRun: false
});

// Deploy with minimal configuration (optional parameters)
const deployMinimal = await handleDeploy({ dryRun: true });

// Deploy with no configuration (uses defaults)
const deployDefault = await handleDeploy();

// Registry operations (no parameters required)
const stats = await handleRegistryStats();
const export = await handleRegistryExport();
````

### Handler Parameter Defaults

When using handlers with optional parameters, the following defaults are used:

**Health Handler** (`handleHealth(context?)`):

- `remainingTimeMs`: `30000` (30 seconds)
- `memoryLimitMB`: `"unknown"`
- `requestId`: `req-${Date.now()}`
- `nodeEnv`: `process.env.NODE_ENV || "unknown"`

**Deploy Handler** (`handleDeploy(payload?)`):

- `environment`: `process.env.ENV_NAME || "default"`
- `dryRun`: `false`
- `baseUrl`: `process.env.BASE_URL` (required if not provided)

**Registry Handlers** (`handleRegistryStats()`, `handleRegistryExport()`):

- No parameters required

### Supported Actions

- `health` - Health check endpoint
- `registry-stats` - Get registry statistics
- `registry-export` - Export full registry for deployment
- `deploy` - Transform registry data to deployment schema and POST to API endpoint

### Handler Event Format

```typescript
interface HandlerEvent {
  operation: 'deploy' | 'health' | 'registry-export' | 'registry-stats';
  payload?: any;
}

// Examples
{ "operation": "health" }
{ "operation": "deploy", "payload": { "environment": "production", "dryRun": false } }
```

## Deployment Options

### Docker/VM

```typescript
import { handler } from "@runlightyear/sdk";

const result = await handler(event, context);
```

### AWS Lambda

```bash
# Deploy dist/handlers.js to Lambda
# Set handler: handler
# Runtime: Node.js 18.x
```

### Edge Functions

- Vercel Functions
- Netlify Edge Functions
- Cloudflare Workers
- Deno Deploy

### Kubernetes

Deploy as a microservice with HTTP wrapper around the handlers.

### Integration Example

```typescript
import express from "express";
import { handler } from "@runlightyear/sdk";

const app = express();
app.use(express.json());

app.post("/sdk/:operation", async (req, res) => {
  try {
    const result = await handler(
      { operation: req.params.operation, payload: req.body },
      { requestId: req.headers["x-request-id"], remainingTimeMs: 30000 }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

## Registry System

The SDK automatically tracks all defined elements in a registry for deployment:

```typescript
import { getRegistryStats, exportRegistry } from "@runlightyear/sdk";

// Get statistics
const stats = getRegistryStats();
console.log(`Total items: ${stats.totalItems}`);

// Export for deployment
const exported = exportRegistry();
console.log("Ready for deployment:", exported);
```

## API Reference

### Builders

- `defineModel(name)` - Create a new model builder
- `defineCollection(name)` - Create a new collection builder
- `defineOAuth2CustomApp(name)` - Create an OAuth2 custom app builder
- `defineApiKeyCustomApp(name)` - Create an API Key custom app builder
- `defineBasicCustomApp(name)` - Create a Basic Auth custom app builder
- `defineCustomApp(name, type)` - Create any custom app type builder

### Helpers

- `match` - Helper object for creating match patterns
  - `match.property(prop)` - Match by property value
  - `match.jsonPath(path)` - Match by JSON path
  - `match.or(...patterns)` - Logical OR of patterns
  - `match.and(...patterns)` - Logical AND of patterns

### Registry

- `getModels()` - Get all registered models
- `getCollections()` - Get all registered collections
- `getCustomApps()` - Get all registered custom apps
- `exportRegistry()` - Export for deployment
- `getRegistryStats()` - Get registry statistics
- `clearRegistry()` - Clear all registered items

### Handlers

- `handler` - Universal handler function
- `handleHealth` - Individual health handler
- `handleRegistryExport` - Individual registry export handler
- `handleRegistryStats` - Individual registry stats handler
- `handleDeploy` - Individual deploy handler
- `HandlerEvent` - TypeScript interface for handler events
- `HandlerResponse` - TypeScript interface for handler responses

### Types

- `Model` - Model definition interface
- `Collection` - Collection definition interface
- `CustomApp` - Custom app definition interface
- `AppAuthType` - Authentication type ('OAUTH2' | 'APIKEY' | 'BASIC')
- `MatchPattern` - Pattern matching interface

## Development Scripts

```bash
# Build the package
pnpm build

# Build handler bundle
pnpm build:handlers

# Run tests
pnpm test

# Run handler-specific tests
pnpm test:handlers

# Run examples
pnpm example:basic
pnpm example:registry
pnpm example:customApps
pnpm example:handlers

# Deploy handlers (build only)
pnpm deploy:handlers
```

## Examples

See the `examples/` directory for complete working examples:

- `basic-collection.ts` - Basic usage patterns
- `registry-example.ts` - Registry system demonstration
- `customApps-example.ts` - Custom app creation
- `handlers-example.ts` - Handler testing for all deployment environments

## License

MIT

## Troubleshooting

### JSON Parsing Error: "undefined" is not valid JSON

If you encounter this error when using the deploy handler:

```
SyntaxError: "undefined" is not valid JSON
```

**Common Causes:**

1. **Missing BASE_URL**: The deploy handler requires a `baseUrl` in the payload or `BASE_URL` environment variable

   ```typescript
   // ✅ Correct
   await handleDeploy({
     baseUrl: "https://api.lightyear.dev",
     dryRun: true,
   });

   // ❌ Will fail without BASE_URL env var
   await handleDeploy({ dryRun: true });
   ```

2. **Empty Registry**: Deploying when no SDK elements are defined

   ```typescript
   // ✅ Correct - create some elements first
   defineOAuth2CustomApp("myapp").build();
   await handleDeploy({ baseUrl: "https://api.lightyear.dev" });
   ```

3. **External JSON Parsing**: The error may come from CLI tools or external code calling `JSON.parse()` on undefined values

**Debug Steps:**

1. Enable detailed logging:

   ```bash
   NODE_ENV=development pnpm example:handlers
   ```

2. Check environment variables:

   ```bash
   echo $BASE_URL
   echo $ENV_NAME
   ```

3. Test the handler directly:

   ```typescript
   import { handleDeploy } from "@runlightyear/sdk";

   try {
     const result = await handleDeploy({
       baseUrl: "https://api.lightyear.dev",
       dryRun: true,
     });
     console.log("Deploy result:", result);
   } catch (error) {
     console.error("Deploy error:", error);
   }
   ```
