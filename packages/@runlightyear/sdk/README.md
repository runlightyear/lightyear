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

- `defineModel(name)` - Create a new model builder
- `defineCollection(name)` - Create a new collection builder
- `match` - Helper object for creating match patterns

## Types

- `Model` - A single data model with schema and match pattern
- `Collection` - A collection containing multiple related models
- `MatchPattern` - Pattern for matching incoming data to models

## Features

- ✅ Type-safe builder pattern
- ✅ JSON Schema support for validation
- ✅ Flexible match patterns for data mapping
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
