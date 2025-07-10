---
sidebar_position: 2
---

# API Reference

This section contains the complete API reference for Lightyear connectors and core functionality.

## Core Packages

### @runlightyear/lightyear

The core Lightyear package provides the fundamental building blocks for creating integrations.

#### Key Components:

- **Actions**: Define the operations your integration can perform
- **Integrations**: Configure and manage integration connections
- **Authentication**: Handle OAuth and API key authentication
- **Webhooks**: Receive and process webhooks from external services

### @runlightyear/cli

The Lightyear CLI provides commands for developing, testing, and deploying integrations.

#### Available Commands:

- `lightyear create` - Create a new integration project
- `lightyear dev` - Run integrations locally for development
- `lightyear build` - Build your integration
- `lightyear deploy` - Deploy to production
- `lightyear test` - Run integration tests

## Connectors

### HubSpot Connector

The HubSpot connector provides access to HubSpot's CRM and marketing automation features.

```typescript
import { HubSpot } from "@runlightyear/hubspot";
```

### Salesforce Connector

The Salesforce connector enables integration with Salesforce CRM.

```typescript
import { Salesforce } from "@runlightyear/salesforce";
```

## Getting Started

To start using the Lightyear API:

1. Install the Lightyear CLI
2. Create a new project with `lightyear create`
3. Import the connectors you need
4. Define your integration logic
5. Deploy with `lightyear deploy`

For detailed documentation on each connector and method, please refer to the specific connector documentation.