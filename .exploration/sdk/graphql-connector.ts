/**
 * GraphQL Connector for making GraphQL queries and mutations
 */

export interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
  operationName?: string;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    path?: Array<string | number>;
    extensions?: any;
  }>;
}

export interface GraphQLConnectorConfig {
  endpoint: string;
  defaultHeaders?: Record<string, string>;
  maxBatchSize?: number;
}

export class GraphQLConnector {
  protected config: GraphQLConnectorConfig;
  protected httpProxy: HttpProxy;

  constructor(config: GraphQLConnectorConfig, httpProxy: HttpProxy) {
    this.config = config;
    this.httpProxy = httpProxy;
  }

  /**
   * Execute a GraphQL query
   */
  async query<T = any>(
    query: string,
    variables?: Record<string, any>
  ): Promise<GraphQLResponse<T>> {
    return this.execute<T>({ query, variables });
  }

  /**
   * Execute a GraphQL mutation
   */
  async mutation<T = any>(
    mutation: string,
    variables?: Record<string, any>
  ): Promise<GraphQLResponse<T>> {
    return this.execute<T>({ query: mutation, variables });
  }

  /**
   * Execute a GraphQL request
   */
  protected async execute<T = any>(
    request: GraphQLRequest
  ): Promise<GraphQLResponse<T>> {
    const response = await this.httpProxy.request({
      method: 'POST',
      path: this.config.endpoint,
      headers: this.buildHeaders(),
      data: request
    });

    return response.data as GraphQLResponse<T>;
  }

  /**
   * Batch multiple GraphQL operations
   */
  async batch<T = any>(
    requests: GraphQLRequest[]
  ): Promise<GraphQLResponse<T>[]> {
    // GraphQL naturally supports batching
    const response = await this.httpProxy.request({
      method: 'POST',
      path: this.config.endpoint,
      headers: this.buildHeaders(),
      data: requests // Array of requests
    });

    return response.data as GraphQLResponse<T>[];
  }

  /**
   * Build headers including auth
   */
  protected buildHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...this.config.defaultHeaders,
      ...this.getAuthHeaders()
    };
  }

  /**
   * Get authentication headers (populated by platform)
   */
  protected getAuthHeaders(): Record<string, string> {
    return {};
  }
}

// Builder for GraphQL connector
export class GraphQLConnectorBuilder {
  private config: Partial<GraphQLConnectorConfig> = {};
  private connectorClass: typeof GraphQLConnector = GraphQLConnector;

  withEndpoint(endpoint: string): this {
    this.config.endpoint = endpoint;
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

  withConnectorClass(connectorClass: typeof GraphQLConnector): this {
    this.connectorClass = connectorClass;
    return this;
  }

  build(httpProxy: HttpProxy): GraphQLConnector {
    if (!this.config.endpoint) {
      throw new Error('GraphQL endpoint is required');
    }

    return new this.connectorClass(
      this.config as GraphQLConnectorConfig,
      httpProxy
    );
  }
}

export function defineGraphQLConnector(): GraphQLConnectorBuilder {
  return new GraphQLConnectorBuilder();
}

// Type-safe query builder helpers
export interface TypedGraphQLConnector<TSchema> extends GraphQLConnector {
  // Enhanced type safety for known schemas
}

// Example of custom GraphQL connector with fragments
export class FragmentGraphQLConnector extends GraphQLConnector {
  private fragments: Map<string, string> = new Map();

  registerFragment(name: string, fragment: string): void {
    this.fragments.set(name, fragment);
  }

  protected async execute<T = any>(request: GraphQLRequest): Promise<GraphQLResponse<T>> {
    // Inject fragments into query
    let query = request.query;
    this.fragments.forEach((fragment, name) => {
      if (query.includes(`...${name}`)) {
        query = `${fragment}\n${query}`;
      }
    });

    return super.execute({ ...request, query });
  }
}