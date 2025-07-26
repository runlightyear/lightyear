# @runlightyear/sdk

TypeScript SDK for building integrations with Lightyear - the fastest and easiest way for developers to integrate web-based applications.

## Installation

```bash
npm install @runlightyear/sdk
# or
pnpm add @runlightyear/sdk
# or
yarn add @runlightyear/sdk
```

## Usage

### Defining Collections

The SDK provides a fluent builder API for defining data collections and models:

```typescript
import { defineCollection, defineModel, match } from "@runlightyear/sdk";

// Define a simple model
const customer = defineModel("customer")
  .withTitle("Customer")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string", format: "email" },
    },
    required: ["id", "name", "email"],
  })
  .withMatchPattern(match.property("email"))
  .build();

// Define a collection with multiple models
const crm = defineCollection("crm")
  .withTitle("CRM Data")
  .withModel(customer)
  .addModel("lead", {
    title: "Lead",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        status: { type: "string", enum: ["new", "qualified", "lost"] },
      },
    },
    matchPattern: match.and(
      match.property("status"),
      match.jsonPath("$.metadata.type")
    ),
  })
  .build();
```

### Match Patterns

Match patterns help identify which model in a collection incoming data should map to:

```typescript
import { match } from "@runlightyear/sdk";

// Simple property match
match.property("email");

// JSON path match
match.jsonPath("$.customer.type");

// Combine patterns
match.or(
  match.property("customer_id"),
  match.jsonPath("$.relationships.customer")
);

match.and(match.property("type"), match.property("status"));
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

### Registry

- `getModels()` - Get all registered models
- `getCollections()` - Get all registered collections
- `getCustomApps()` - Get all registered custom apps
- `exportRegistry()` - Export for deployment

## Types

- `Model` - A single data model with schema and match pattern
- `Collection` - A collection containing multiple related models
- `CustomApp` - A custom app with authentication configuration
- `MatchPattern` - Pattern for matching incoming data to models
- `AppAuthType` - Authentication type: 'OAUTH2' | 'APIKEY' | 'BASIC'

### Registry for Deployment

The SDK automatically tracks all created elements in a global registry, making them available for deployment:

```typescript
import {
  defineModel,
  defineCollection,
  exportRegistry,
  getModels,
  getCollections,
} from "@runlightyear/sdk";

// Create your models and collections
const customer = defineModel("customer").build();
const crm = defineCollection("crm").withModel(customer).build();

// Registry automatically tracks everything
console.log("Models:", getModels().length);
console.log("Collections:", getCollections().length);

// Export for deployment
const deploymentData = exportRegistry();
console.log("Ready for deployment:", deploymentData);
```

The registry provides:

- **Automatic tracking** - All models and collections are registered when built
- **Unique IDs** - Each element gets a unique identifier
- **Metadata** - Tracks how and when elements were created
- **Export functionality** - Generate deployment-ready data structures
- **Statistics** - Get counts and summaries of registered elements

## Features

- ✅ Type-safe builder pattern
- ✅ JSON Schema support for validation
- ✅ Flexible match patterns for data mapping
- ✅ Automatic registry for deployment tracking
- ✅ Comprehensive TypeScript types
- ✅ Zero runtime dependencies (except zod)

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build the package
pnpm build

# Run tests
pnpm test

# Type checking
pnpm compile
```
