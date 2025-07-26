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

```typescript
import { handler } from "@runlightyear/sdk";

// Direct invocation (VM, Docker, serverless functions, etc.)
const response = await handler(
  { operation: "deploy", payload: { environment: "prod" } },
  { requestId: "req-123", remainingTimeMs: 30000 }
);

// Individual handler usage
import { handleHealth, handleDeploy } from "@runlightyear/sdk";

const health = await handleHealth({ requestId: "req-123" });
const deploy = await handleDeploy({ environment: "production" });
```

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
