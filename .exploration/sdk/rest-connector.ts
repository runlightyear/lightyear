/**
 * REST Connector (renamed from ApiClient)
 */

// Re-export types with better names
export {
  ApiRequest as RestRequest,
  ApiResponse as RestResponse,
  BatchRequest as RestBatchRequest,
  BatchResponse as RestBatchResponse,
  HttpProxy,
  BatchHttpProxy
} from './api-client';

export interface RestConnectorConfig {
  baseUrl: string;
  authHeader?: string;
  defaultHeaders?: Record<string, string>;
  maxBatchSize?: number;
}

// This would be the renamed ApiClient
export { ApiClient as RestConnector } from './api-client';
export { ApiClientBuilder as RestConnectorBuilder } from './api-client';
export { BatchApiClient as BatchRestConnector } from './api-client-batch';

// Re-export with new names
export { defineApiClient as defineRestConnector } from './api-client';
export { defineBatchApiClient as defineBatchRestConnector } from './api-client-batch';

// Example of how the renamed API would look
/*
const restConnector = defineRestConnector()
  .withBaseUrl('https://api.example.com')
  .withAuthHeader('Authorization')
  .build(httpProxy, batchProxy);

const response = await restConnector.get('/users/123');
*/