# Connector Syntax Changes

This document describes the changes made to the connector syntax to differentiate connectors from deployable resources.

## Summary

The connector APIs have been updated to use `create*` functions instead of `define*` functions. This naming convention clearly distinguishes connectors (which are not deployed) from actions and integrations (which are deployed). All connectors still use the fluent builder pattern and require `.build()` to complete construction.

## REST Connector

### Old Syntax
```typescript
const connector = defineRestConnector()
  .withBaseUrl("https://api.example.com")
  .addHeader("Authorization", "Bearer token")
  .build();
```

### New Syntax
```typescript
const connector = createRestConnector()
  .withBaseUrl("https://api.example.com")
  .addHeader("Authorization", "Bearer token")
  .build();
```

## OAuth Connector

### Old Syntax
```typescript
const connector = defineOAuthConnector("MyAPI")
  .withAuthUrl("https://api.example.com/oauth/authorize")
  .withTokenUrl("https://api.example.com/oauth/token")
  .withScope(["read", "write"])
  .build();
```

### New Syntax
```typescript
const connector = createOAuthConnector("MyAPI")
  .withAuthUrl("https://api.example.com/oauth/authorize")
  .withTokenUrl("https://api.example.com/oauth/token")
  .withScope(["read", "write"])
  .build();
```

## Sync Connector

### Old Syntax
```typescript
const connector = defineSyncConnector(restConnector, collection)
  .withDefaultPagination("cursor")
  .addModelConnector("user")
    .withList("/users", { ... })
    .withCreate("/users", { ... })
  .build();
```

### New Syntax
```typescript
const connector = createSyncConnector(restConnector, collection)
  .withDefaultPagination("cursor")
  .addModelConnector("user")
    .withList("/users", { ... })
    .withCreate("/users", { ... })
    .and()
  .build();
```

## Migration Guide

1. **REST Connector**: Replace `defineRestConnector()` with `createRestConnector()`
2. **OAuth Connector**: Replace `defineOAuthConnector()` with `createOAuthConnector()`
3. **Sync Connector**: Replace `defineSyncConnector()` with `createSyncConnector()`

All connectors continue to use the same fluent builder pattern and require `.build()` at the end.

## Key Benefits

1. **Clear distinction**: `create*` for non-deployable connectors vs `define*` for deployable resources
2. **Extensible**: Fluent builder pattern allows for flexible configuration
3. **Type-safe**: Full TypeScript support with proper type inference
4. **Consistent**: All connectors follow the same builder pattern with `.build()`

## Naming Convention

- **`create*`**: Used for connectors (REST, OAuth, Sync) - these are configuration objects that are not deployed
- **`define*`**: Used for deployable resources (Actions, Integrations, Custom Apps) - these are deployed to Lightyear

## Backward Compatibility

The old `define*` functions for connectors are still available but marked as deprecated. They will be removed in a future major version.

## Examples

See the following example files:
- `examples/connector-syntax-examples.ts` - Comprehensive examples of the new syntax
- `examples/rest-connector-example.ts` - REST connector examples
- `examples/oauth-customapp-example.ts` - OAuth connector examples
- `examples/hubspot-sync-complete.ts` - Complete sync connector example