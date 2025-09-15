import { defineBatchApiClient, SalesforceBatchApiClient, HubSpotBatchApiClient, BatchApiClient } from '../api-client-batch';
import { ApiRequest, ApiResponse } from '../api-client';
import { HttpProxy, BatchHttpProxy } from '../api-client';

/**
 * Examples of API clients with native batch support
 */

// Mock proxies
const httpProxy: HttpProxy = {
  async request(req) {
    console.log('Proxying request:', req);
    return { data: {}, status: 200, headers: {} };
  }
};

const batchProxy: BatchHttpProxy = {
  async batchRequest(requests) {
    return requests.map(req => ({
      id: req.id,
      response: { data: {}, status: 200, headers: {} }
    }));
  }
};

// Salesforce with native batch API
const salesforceClient = defineBatchApiClient()
  .withBaseUrl('https://mycompany.my.salesforce.com')
  .withAuthHeader('Authorization')
  .withDefaultHeaders({
    'Content-Type': 'application/json'
  })
  .withBatchClientClass(SalesforceBatchApiClient)
  .build(httpProxy, batchProxy);

async function salesforceBatchExample() {
  // These will use Salesforce's native batch API
  const results = await salesforceClient.batchWrite([
    {
      method: 'POST',
      path: '/services/data/v58.0/sobjects/Contact',
      data: {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john@example.com'
      }
    },
    {
      method: 'PATCH',
      path: '/services/data/v58.0/sobjects/Contact/003XX000004TMM2',
      data: {
        Email: 'newemail@example.com'
      }
    },
    {
      method: 'DELETE',
      path: '/services/data/v58.0/sobjects/Contact/003XX000004TMM3'
    }
  ]);

  results.forEach((result, index) => {
    if (result instanceof Error) {
      console.error(`Operation ${index} failed:`, result.message);
    } else {
      console.log(`Operation ${index} succeeded:`, result.data);
    }
  });
}

// Custom batch API implementation
class CustomBatchApiClient extends BatchApiClient {
  supportsNativeBatch(): boolean {
    // Check if we're working with the right endpoints
    return this.config.baseUrl.includes('api.custom.com');
  }

  getBatchEndpoint(): string {
    return '/v1/batch';
  }

  formatNativeBatchRequest(requests: ApiRequest[]): any {
    // Custom API expects different format
    return {
      batch: requests.map(req => ({
        operation: req.method,
        resource: req.path,
        body: req.data,
        headers: req.headers
      }))
    };
  }

  parseNativeBatchResponse<T = any>(response: ApiResponse<any>): any {
    return {
      results: response.data.responses.map((res: any) => ({
        status: res.code,
        data: res.body,
        error: res.error ? { message: res.error } : undefined
      }))
    };
  }
}

// API that doesn't support native batching
class NoBatchApiClient extends BatchApiClient {
  supportsNativeBatch(): boolean {
    return false; // Always use platform batch proxy
  }

  getBatchEndpoint(): string {
    throw new Error('This API does not support native batching');
  }

  formatNativeBatchRequest(requests: ApiRequest[]): any {
    throw new Error('This API does not support native batching');
  }

  parseNativeBatchResponse<T = any>(response: ApiResponse<any>): any {
    throw new Error('This API does not support native batching');
  }
}

const noBatchClient = defineBatchApiClient()
  .withBaseUrl('https://simple.api.com')
  .withBatchClientClass(NoBatchApiClient)
  .build(httpProxy, batchProxy);

async function fallbackBatchExample() {
  // This will use the platform's batch proxy since native batching is not supported
  const results = await noBatchClient.batchWrite([
    { method: 'POST', path: '/items', data: { name: 'Item 1' } },
    { method: 'POST', path: '/items', data: { name: 'Item 2' } },
    { method: 'POST', path: '/items', data: { name: 'Item 3' } }
  ]);

  console.log('Results from platform batch proxy:', results);
}

// Conditional batch support based on operation type
class ConditionalBatchApiClient extends BatchApiClient {
  supportsNativeBatch(): boolean {
    return true;
  }

  getBatchEndpoint(): string {
    return '/batch/operations';
  }

  formatNativeBatchRequest(requests: ApiRequest[]): any {
    // Group by operation type
    const groups = requests.reduce((acc, req) => {
      const key = `${req.method}_${req.path.split('/')[1]}`; // Group by method and resource
      if (!acc[key]) acc[key] = [];
      acc[key].push(req);
      return acc;
    }, {} as Record<string, ApiRequest[]>);

    return { operationGroups: groups };
  }

  parseNativeBatchResponse<T = any>(response: ApiResponse<any>): any {
    const results: any[] = [];
    
    Object.values(response.data.groupResults).forEach((groupResult: any) => {
      groupResult.items.forEach((item: any) => {
        results.push({
          status: item.success ? 200 : 400,
          data: item.data,
          error: item.error
        });
      });
    });

    return { results };
  }

  // Override to handle special cases
  async batchWrite<T = any>(requests: ApiRequest[]): Promise<Array<ApiResponse<T> | Error>> {
    // Separate requests that can be batched vs those that cannot
    const batchable = requests.filter(req => req.path.includes('/contacts'));
    const nonBatchable = requests.filter(req => !req.path.includes('/contacts'));

    const results: Array<ApiResponse<T> | Error> = [];

    // Use native batch for batchable requests
    if (batchable.length > 0) {
      const batchResults = await this.nativeBatchWrite<T>(batchable);
      results.push(...batchResults);
    }

    // Use proxy for non-batchable
    if (nonBatchable.length > 0) {
      const proxyResults = await this.proxyBatchWrite<T>(nonBatchable);
      results.push(...proxyResults);
    }

    return results;
  }
}