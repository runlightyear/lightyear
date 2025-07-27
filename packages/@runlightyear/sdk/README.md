# Lightyear SDK

TypeScript SDK for building integrations with Lightyear.

## Features

- **Builders** - Fluent API for defining integrations, actions, and custom apps
- **OAuth Connectors** - Built-in OAuth2 authentication with configurable endpoints
- **Type Safety** - Full TypeScript support with comprehensive type definitions
- **CLI Integration** - Seamless integration with Lightyear CLI operations
- **Registry** - Automatic registration and discovery of components

## Installation

```bash
npm install @runlightyear/sdk
```

## Quick Start

### OAuth Custom App

```typescript
import { defineOAuth2CustomApp, defineOAuthConnector } from "@runlightyear/sdk";

// Create OAuth connector for Google APIs
const googleConnector = defineOAuthConnector("GoogleDrive")
  .withAuthUrl("https://accounts.google.com/o/oauth2/v2/auth")
  .withTokenUrl("https://oauth2.googleapis.com/token")
  .withScopeConnector(" ")
  .withScope(["https://www.googleapis.com/auth/drive"])
  .withAuthParams({
    access_type: "offline",
    prompt: "consent",
  })
  .build();

// Define custom app with OAuth connector
const googleDriveApp = defineOAuth2CustomApp("google-drive")
  .withTitle("Google Drive Integration")
  .withOAuthConnector(googleConnector)
  .addVariable("folderName", {
    title: "Default Folder",
    defaultValue: "Lightyear",
  })
  .deploy();
```

### Custom OAuth Connector

```typescript
import { defineOAuthConnector } from "@runlightyear/sdk";

const customConnector = defineOAuthConnector("MyAPI")
  .withAuthUrl("https://api.example.com/oauth/authorize")
  .withTokenUrl("https://api.example.com/oauth/token")
  .withScope("read write")
  .withAuthParams({
    prompt: "consent",
    access_type: "offline",
  })
  .buildFactory();
```

## Documentation

- [OAuth Connector](./OAUTH_CONNECTOR.md) - Base OAuth connector functionality
- [OAuth Builder](./OAUTH_BUILDER.md) - OAuth connector builder documentation
- [Examples](./examples/) - Complete working examples

## CLI Integration

OAuth connectors automatically work with Lightyear CLI operations:

- `execGetAuthRequestUrl` - Generates authorization URLs
- `execRequestAccessToken` - Exchanges codes for tokens
- `execRefreshAccessToken` - Refreshes expired tokens

## Common OAuth Providers

Examples for popular OAuth providers:

```typescript
import { defineOAuthConnector } from "@runlightyear/sdk";

// Google APIs
const google = defineOAuthConnector("Google")
  .withAuthUrl("https://accounts.google.com/o/oauth2/v2/auth")
  .withTokenUrl("https://oauth2.googleapis.com/token")
  .withScopeConnector(" ")
  .withAuthParams({
    access_type: "offline",
    prompt: "consent",
  })
  .build();

// GitHub
const github = defineOAuthConnector("GitHub")
  .withAuthUrl("https://github.com/login/oauth/authorize")
  .withTokenUrl("https://github.com/login/oauth/access_token")
  .withScopeConnector(" ")
  .withHeaders({
    Accept: "application/json",
  })
  .build();

// Slack
const slack = defineOAuthConnector("Slack")
  .withAuthUrl("https://slack.com/oauth/v2/authorize")
  .withTokenUrl("https://slack.com/api/oauth.v2.access")
  .withScopeConnector(",")
  .build();
```

## License

MIT
