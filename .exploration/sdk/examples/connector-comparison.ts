import { defineOAuth2Connector } from '../oauth2-connector';
import { defineRestConnector } from '../rest-connector';
import { defineGraphQLConnector } from '../graphql-connector';
import { defineCustomApp } from '../app-builder';

/**
 * Examples showing how different connectors work together
 */

// 1. REST API with OAuth2
const myRestApp = defineCustomApp('my_rest_api', 'OAUTH2')
  .withTitle('My REST API')
  .build();

const oauth2Connector = defineOAuth2Connector(myRestApp)
  .withClientCredentials('client-id', 'client-secret')
  .withEndpoints(
    'https://auth.example.com/oauth/authorize',
    'https://auth.example.com/oauth/token'
  )
  .withScopes('read', 'write')
  .build();

const restConnector = defineRestConnector()
  .withBaseUrl('https://api.example.com/v2')
  .withAuthHeader('Authorization') // OAuth2 token will be injected here
  .withDefaultHeaders({
    'Content-Type': 'application/json'
  })
  .build(httpProxy, batchProxy);

// Usage
async function useRestApi() {
  // Platform handles OAuth2 flow using oauth2Connector
  // Then uses the token with restConnector
  const users = await restConnector.get('/users');
  const newUser = await restConnector.post('/users', {
    name: 'John Doe',
    email: 'john@example.com'
  });
}

// 2. GraphQL API with OAuth2
const myGraphQLApp = defineCustomApp('my_graphql_api', 'OAUTH2')
  .withTitle('My GraphQL API')
  .build();

const graphqlOAuth2Connector = defineOAuth2Connector(myGraphQLApp)
  .withClientCredentials('client-id', 'client-secret')
  .withEndpoints(
    'https://auth.graphql.com/oauth/authorize',
    'https://auth.graphql.com/oauth/token'
  )
  .build();

const graphqlConnector = defineGraphQLConnector()
  .withEndpoint('https://api.graphql.com/graphql')
  .withDefaultHeaders({
    'X-API-Version': '2023-01'
  })
  .build(httpProxy);

// Usage
async function useGraphQLApi() {
  const result = await graphqlConnector.query(`
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
      }
    }
  `, { id: '123' });

  const mutation = await graphqlConnector.mutation(`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        name
      }
    }
  `, {
    input: {
      name: 'Jane Doe',
      email: 'jane@example.com'
    }
  });
}

// 3. REST API with API Key (simpler auth)
const apiKeyApp = defineCustomApp('api_key_service', 'APIKEY')
  .withTitle('API Key Service')
  .build();

// No OAuth2Connector needed for API key auth
const apiKeyRestConnector = defineRestConnector()
  .withBaseUrl('https://api.service.com')
  .withAuthHeader('X-API-Key') // API key will be injected here
  .build(httpProxy, batchProxy);

// 4. GraphQL with API Key
const graphqlApiKeyConnector = defineGraphQLConnector()
  .withEndpoint('https://graphql.service.com/graphql')
  .withDefaultHeaders({
    'X-API-Key': '${apiKey}' // Platform injects the key
  })
  .build(httpProxy);

// 5. Unified integration example
import { defineIntegration } from '../integration-builder-final';

const completeIntegration = defineIntegration('github_sync')
  .withTitle('GitHub Data Sync')
  .withApp('github') // Built-in app
  .withCollections({
    repositories: defineCollection('repositories')
      .addModel('repository', {
        matchPattern: 'full_name'
      })
      .build()
  })
  .build();

// The platform would automatically:
// 1. Use GitHub's OAuth2Connector for auth
// 2. Choose between RestConnector or GraphQLConnector based on GitHub's API
// 3. Handle token refresh, retries, etc.