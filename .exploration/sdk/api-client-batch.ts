import { ApiClient, ApiRequest, ApiResponse, ApiClientConfig, HttpProxy, BatchHttpProxy } from './api-client';

/**
 * Extended API client with native batch operation support
 */

export interface NativeBatchRequest {
  operations: Array<{
    id?: string;
    method: string;
    path: string;
    data?: any;
  }>;
}

export interface NativeBatchResponse<T = any> {
  results: Array<{
    id?: string;
    status: number;
    data?: T;
    error?: any;
  }>;
}

export abstract class BatchApiClient extends ApiClient {
  /**
   * Check if the API supports native batch operations
   */
  abstract supportsNativeBatch(): boolean;

  /**
   * Get the batch endpoint path
   */
  abstract getBatchEndpoint(): string;

  /**
   * Format requests for the native batch API
   */
  abstract formatNativeBatchRequest(requests: ApiRequest[]): NativeBatchRequest;

  /**
   * Parse the native batch response
   */
  abstract parseNativeBatchResponse<T = any>(response: ApiResponse<any>): NativeBatchResponse<T>;

  /**
   * Make batch write operations using native API batching if supported
   */
  async batchWrite<T = any>(requests: ApiRequest[]): Promise<Array<ApiResponse<T> | Error>> {
    if (this.supportsNativeBatch()) {
      return this.nativeBatchWrite<T>(requests);
    } else {
      return this.proxyBatchWrite<T>(requests);
    }
  }

  /**
   * Use native API batch endpoint
   */
  protected async nativeBatchWrite<T = any>(requests: ApiRequest[]): Promise<Array<ApiResponse<T> | Error>> {
    const batchRequest = this.formatNativeBatchRequest(requests);
    
    const response = await this.post<any>(
      this.getBatchEndpoint(),
      batchRequest
    );

    const batchResponse = this.parseNativeBatchResponse<T>(response);
    
    // Convert to standard format
    return batchResponse.results.map(result => {
      if (result.error) {
        return new Error(result.error.message || 'Batch operation failed');
      }
      return {
        data: result.data,
        status: result.status,
        headers: {}
      } as ApiResponse<T>;
    });
  }

  /**
   * Fall back to platform batch proxy
   */
  protected async proxyBatchWrite<T = any>(requests: ApiRequest[]): Promise<Array<ApiResponse<T> | Error>> {
    const batchRequests = requests.map((req, index) => ({
      id: index.toString(),
      request: req
    }));

    const responses = await this.batchRequest(batchRequests);
    
    return responses.map(res => {
      if (res.error) {
        return new Error(res.error.message);
      }
      return res.response as ApiResponse<T>;
    });
  }
}

// Example: Salesforce-style batch API
export class SalesforceBatchApiClient extends BatchApiClient {
  supportsNativeBatch(): boolean {
    return true;
  }

  getBatchEndpoint(): string {
    return '/services/data/v58.0/composite/batch';
  }

  formatNativeBatchRequest(requests: ApiRequest[]): NativeBatchRequest {
    return {
      operations: requests.map((req, index) => ({
        id: index.toString(),
        method: req.method,
        path: req.path.replace(this.config.baseUrl, ''), // Relative path
        data: req.data
      }))
    };
  }

  parseNativeBatchResponse<T = any>(response: ApiResponse<any>): NativeBatchResponse<T> {
    return {
      results: response.data.results.map((result: any) => ({
        id: result.id,
        status: result.statusCode,
        data: result.result,
        error: result.error
      }))
    };
  }
}

// Example: HubSpot-style batch API
export class HubSpotBatchApiClient extends BatchApiClient {
  supportsNativeBatch(): boolean {
    return true;
  }

  getBatchEndpoint(): string {
    return '/crm/v3/objects/contacts/batch/create';
  }

  formatNativeBatchRequest(requests: ApiRequest[]): NativeBatchRequest {
    // HubSpot expects a different format
    return {
      operations: requests.map(req => ({
        method: req.method,
        path: req.path,
        data: {
          properties: req.data
        }
      }))
    };
  }

  parseNativeBatchResponse<T = any>(response: ApiResponse<any>): NativeBatchResponse<T> {
    return {
      results: response.data.results.map((result: any) => ({
        status: 200,
        data: result,
        error: result.error
      }))
    };
  }
}

// Builder extension for batch API clients
export class BatchApiClientBuilder {
  private apiClientBuilder: ApiClientBuilder;
  private clientClass: typeof BatchApiClient = BatchApiClient;

  constructor() {
    this.apiClientBuilder = new ApiClientBuilder();
  }

  withBaseUrl(baseUrl: string): this {
    this.apiClientBuilder.withBaseUrl(baseUrl);
    return this;
  }

  withAuthHeader(headerName: string): this {
    this.apiClientBuilder.withAuthHeader(headerName);
    return this;
  }

  withDefaultHeaders(headers: Record<string, string>): this {
    this.apiClientBuilder.withDefaultHeaders(headers);
    return this;
  }

  withMaxBatchSize(size: number): this {
    this.apiClientBuilder.withMaxBatchSize(size);
    return this;
  }

  withBatchClientClass(clientClass: typeof BatchApiClient): this {
    this.clientClass = clientClass;
    return this;
  }

  build(httpProxy: HttpProxy, batchProxy: BatchHttpProxy): BatchApiClient {
    this.apiClientBuilder.withClientClass(this.clientClass);
    return this.apiClientBuilder.build(httpProxy, batchProxy) as BatchApiClient;
  }
}

export function defineBatchApiClient(): BatchApiClientBuilder {
  return new BatchApiClientBuilder();
}