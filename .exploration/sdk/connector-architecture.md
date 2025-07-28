# Connector Architecture

## Naming Convention: Everything as Connectors

### Auth Connectors
Handle authentication flows and credential management:
- `OAuth2Connector` - OAuth2 authorization flow
- `ApiKeyConnector` - API key authentication (future)
- `BasicAuthConnector` - Basic auth (future)

### API Connectors
Handle actual API communication:
- `RestConnector` - REST API operations (GET, POST, etc.)
- `GraphQLConnector` - GraphQL queries and mutations
- `SoapConnector` - SOAP operations (if needed)

## Benefits of This Approach

1. **Consistent Terminology**
   - Everything that connects to external systems is a "Connector"
   - Clear mental model for developers

2. **Clear Separation**
   - Auth Connectors = "How to authenticate"
   - API Connectors = "How to communicate"

3. **Extensible**
   - Easy to add new auth methods (SAML, JWT, etc.)
   - Easy to add new API types (gRPC, WebSocket, etc.)

4. **Composable**
   ```typescript
   // Any auth connector can work with any API connector
   OAuth2Connector + RestConnector
   OAuth2Connector + GraphQLConnector
   ApiKeyConnector + RestConnector
   ApiKeyConnector + GraphQLConnector
   ```

## Future Connectors

### Potential Auth Connectors
- `JWTConnector` - JWT token management
- `SAMLConnector` - SAML authentication
- `OAuth1Connector` - Legacy OAuth 1.0

### Potential API Connectors
- `GrpcConnector` - gRPC services
- `WebSocketConnector` - Real-time connections
- `GraphQLSubscriptionConnector` - GraphQL subscriptions

## Usage Pattern

```typescript
// 1. Define the app
const app = defineCustomApp('my_app', 'OAUTH2').build();

// 2. Configure auth connector
const authConnector = defineOAuth2Connector(app)
  .withClientCredentials(...)
  .build();

// 3. Configure API connector
const apiConnector = defineRestConnector()
  .withBaseUrl(...)
  .build();

// Platform combines them automatically
```