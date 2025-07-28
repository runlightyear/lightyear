import { RestConnector, RestConnectorProps } from "../connectors/RestConnector";

/**
 * @public
 *
 * REST Connector Builder - fluent API for creating REST connectors
 */
export class RestConnectorBuilder {
  private baseUrl?: string;
  private headers: Record<string, string> = {};

  constructor() {
    // Start with default headers
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * Set the base URL for all requests
   */
  withBaseUrl(baseUrl: string): this {
    this.baseUrl = baseUrl;
    return this;
  }

  /**
   * Replace all headers with the provided headers
   * This will override the default headers completely
   */
  withHeaders(headers: Record<string, string>): this {
    this.headers = { ...headers };
    return this;
  }

  /**
   * Add headers to the existing headers
   * This will merge with existing headers, overriding individual ones if they exist
   */
  addHeaders(headers: Record<string, string>): this {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  /**
   * Add a single header
   */
  addHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  /**
   * Remove a header
   */
  removeHeader(name: string): this {
    delete this.headers[name];
    return this;
  }

  /**
   * Build the REST connector
   */
  build(): RestConnector {
    const props: RestConnectorProps = {
      baseUrl: this.baseUrl,
      headers: this.headers,
    };

    return new RestConnector(props);
  }
}

/**
 * Factory function for creating a REST connector builder
 */
export function defineRestConnector(): RestConnectorBuilder {
  return new RestConnectorBuilder();
}
