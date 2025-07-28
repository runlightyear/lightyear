import { defineApiClient, ApiClient } from '../api-client';
import { HttpProxy, BatchHttpProxy } from '../api-client';

/**
 * Basic API client examples
 */

// Mock proxies (provided by platform in real usage)
const httpProxy: HttpProxy = {
  async request(req) {
    console.log('Proxying request:', req);
    return { data: {}, status: 200, headers: {} };
  }
};

const batchProxy: BatchHttpProxy = {
  async batchRequest(requests) {
    console.log('Batch proxy:', requests);
    return requests.map(req => ({
      id: req.id,
      response: { data: {}, status: 200, headers: {} }
    }));
  }
};

// Basic API client
const basicClient = defineApiClient()
  .withBaseUrl('https://api.example.com')
  .withDefaultHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
  .build(httpProxy, batchProxy);

// Using the client
async function basicUsage() {
  // Simple GET request
  const response = await basicClient.get('/users/123');
  console.log('User:', response.data);

  // GET with query parameters
  const searchResponse = await basicClient.get('/users', {
    filter: 'active',
    limit: 10
  });

  // POST request
  const createResponse = await basicClient.post('/users', {
    name: 'John Doe',
    email: 'john@example.com'
  });

  // PUT request
  const updateResponse = await basicClient.put('/users/123', {
    name: 'Jane Doe'
  });

  // DELETE request
  const deleteResponse = await basicClient.delete('/users/123');
}

// API with custom auth header
const apiKeyClient = defineApiClient()
  .withBaseUrl('https://api.service.com/v2')
  .withAuthHeader('X-API-Key') // Platform will inject the key here
  .withDefaultHeaders({
    'Content-Type': 'application/json'
  })
  .build(httpProxy, batchProxy);

// Batch operations using platform proxy
async function batchOperations() {
  // When API doesn't support native batching, use platform's batch proxy
  const batchRequests = [
    {
      id: '1',
      request: { method: 'POST' as const, path: '/contacts', data: { name: 'Alice' } }
    },
    {
      id: '2',
      request: { method: 'POST' as const, path: '/contacts', data: { name: 'Bob' } }
    },
    {
      id: '3',
      request: { method: 'PUT' as const, path: '/contacts/123', data: { name: 'Charlie' } }
    }
  ];

  const results = await basicClient.batchRequest(batchRequests);
  
  results.forEach(result => {
    if (result.error) {
      console.error(`Request ${result.id} failed:`, result.error);
    } else {
      console.log(`Request ${result.id} succeeded:`, result.response?.data);
    }
  });
}

// Custom API client with special behavior
class CustomApiClient extends ApiClient {
  protected buildHeaders(requestHeaders?: Record<string, string>): Record<string, string> {
    const headers = super.buildHeaders(requestHeaders);
    
    // Add custom header logic
    headers['X-Client-Version'] = '1.0';
    
    // Add request ID for tracing
    headers['X-Request-ID'] = this.generateRequestId();
    
    return headers;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Override auth headers for custom format
  protected getAuthHeaders(): Record<string, string> {
    // Custom auth header format
    return {
      'X-Auth-Token': '${authToken}' // Platform will replace this
    };
  }
}

const customClient = defineApiClient()
  .withBaseUrl('https://custom.api.com')
  .withClientClass(CustomApiClient)
  .build(httpProxy, batchProxy);