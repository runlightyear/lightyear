/**
 * API Client system for making HTTP requests through the platform proxy
 */

// Request types
export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface BatchRequest {
  id: string;
  request: ApiRequest;
}

export interface BatchResponse {
  id: string;
  response?: ApiResponse;
  error?: {
    code: string;
    message: string;
  };
}

// Platform proxy interfaces
export interface HttpProxy {
  request<T = any>(request: ApiRequest): Promise<ApiResponse<T>>;
}

export interface BatchHttpProxy {
  batchRequest(requests: BatchRequest[]): Promise<BatchResponse[]>;
}

// API client configuration
export interface ApiClientConfig {
  baseUrl: string;
  authHeader?: string; // e.g., "Authorization" or "X-API-Key"
  defaultHeaders?: Record<string, string>;
  maxBatchSize?: number;
}

// Main API client class
export class ApiClient {
  protected config: ApiClientConfig;
  protected httpProxy: HttpProxy;
  protected batchProxy: BatchHttpProxy;

  constructor(
    config: ApiClientConfig,
    httpProxy: HttpProxy,
    batchProxy: BatchHttpProxy
  ) {
    this.config = config;
    this.httpProxy = httpProxy;
    this.batchProxy = batchProxy;
  }

  /**
   * Make a single API request
   */
  async request<T = any>(request: ApiRequest): Promise<ApiResponse<T>> {
    const fullRequest = this.prepareRequest(request);
    return this.httpProxy.request<T>(fullRequest);
  }

  /**
   * Convenience methods for common HTTP verbs
   */
  async get<T = any>(path: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'GET', path, params });
  }

  async post<T = any>(path: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'POST', path, data });
  }

  async put<T = any>(path: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PUT', path, data });
  }

  async patch<T = any>(path: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'PATCH', path, data });
  }

  async delete<T = any>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>({ method: 'DELETE', path });
  }

  /**
   * Make batch requests using platform's batch proxy
   * Used when API doesn't support native batching
   */
  async batchRequest(requests: BatchRequest[]): Promise<BatchResponse[]> {
    const maxBatchSize = this.config.maxBatchSize || 50;
    const results: BatchResponse[] = [];

    // Split into chunks if needed
    for (let i = 0; i < requests.length; i += maxBatchSize) {
      const chunk = requests.slice(i, i + maxBatchSize);
      const preparedRequests = chunk.map(req => ({
        id: req.id,
        request: this.prepareRequest(req.request)
      }));
      
      const responses = await this.batchProxy.batchRequest(preparedRequests);
      results.push(...responses);
    }

    return results;
  }

  /**
   * Prepare request with base URL and headers
   */
  protected prepareRequest(request: ApiRequest): ApiRequest {
    const url = this.buildUrl(request.path);
    const headers = this.buildHeaders(request.headers);

    return {
      ...request,
      path: url,
      headers
    };
  }

  /**
   * Build full URL from path
   */
  protected buildUrl(path: string): string {
    // Remove trailing slash from base URL and leading slash from path
    const base = this.config.baseUrl.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    return `${base}/${cleanPath}`;
  }

  /**
   * Build headers including auth and defaults
   * Override to customize header building
   */
  protected buildHeaders(requestHeaders?: Record<string, string>): Record<string, string> {
    return {
      ...this.config.defaultHeaders,
      ...this.getAuthHeaders(),
      ...requestHeaders
    };
  }

  /**
   * Get authentication headers
   * Override to customize auth header format
   */
  protected getAuthHeaders(): Record<string, string> {
    // This will be populated by the platform based on the auth type
    // For OAuth2: { Authorization: 'Bearer <token>' }
    // For API Key: { [this.config.authHeader]: '<key>' }
    // For Basic: { Authorization: 'Basic <encoded>' }
    return {};
  }
}

// Builder for API client
export class ApiClientBuilder {
  private config: Partial<ApiClientConfig> = {};
  private clientClass: typeof ApiClient = ApiClient;

  withBaseUrl(baseUrl: string): this {
    this.config.baseUrl = baseUrl;
    return this;
  }

  withAuthHeader(headerName: string): this {
    this.config.authHeader = headerName;
    return this;
  }

  withDefaultHeaders(headers: Record<string, string>): this {
    this.config.defaultHeaders = headers;
    return this;
  }

  withMaxBatchSize(size: number): this {
    this.config.maxBatchSize = size;
    return this;
  }

  withClientClass(clientClass: typeof ApiClient): this {
    this.clientClass = clientClass;
    return this;
  }

  build(httpProxy: HttpProxy, batchProxy: BatchHttpProxy): ApiClient {
    if (!this.config.baseUrl) {
      throw new Error('Base URL is required');
    }

    return new this.clientClass(
      this.config as ApiClientConfig,
      httpProxy,
      batchProxy
    );
  }
}

export function defineApiClient(): ApiClientBuilder {
  return new ApiClientBuilder();
}