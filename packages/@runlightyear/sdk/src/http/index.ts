/**
 * @public
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpProxyRequestHeaders {
  [key: string]: string;
}

/**
 * @public
 */
export interface HttpProxyRequestProps {
  method?: HttpMethod;
  url: string;
  params?: Record<string, any>;
  headers?: HttpProxyRequestHeaders;
  data?: object;
  body?: string;
  redactKeys?: string[];
  maxRetries?: number;
  async?: boolean;
}

/**
 * @public
 */
export type HttpProxyResponse = {
  /**
   * The http status of the proxied response
   */
  status: number;
  /**
   * The http status test of the proxied response
   */
  statusText: string;
  /**
   * The response headers of the proxied response
   */
  headers: any;
  /**
   * The http body of the proxied response
   */
  data: any;
};

/**
 * @public
 */
export class HttpProxyResponseError extends Error {
  response: HttpProxyResponse;

  constructor(response: HttpProxyResponse) {
    super(`HttpProxyResponseError: ${response.status} ${response.statusText}`);
    this.response = response;

    Object.setPrototypeOf(this, HttpProxyResponseError.prototype);
  }
}

export function isHttpProxyResponseError(
  error: unknown
): error is HttpProxyResponseError {
  return !!error && typeof error === "object" && "response" in error;
}

export interface HttpRequest {
  (props: HttpProxyRequestProps): Promise<HttpProxyResponse>;
}

function getRandomJitter(maxJitter: number): number {
  return Math.floor(Math.random() * maxJitter);
}

async function exponentialBackoffWithJitter(retryCount: number): Promise<void> {
  const baseWaitTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
  const jitter = getRandomJitter(5000); // Add up to 5 seconds of jitter
  const waitTime = baseWaitTime + jitter;
  console.log(`Retrying in ${(waitTime / 1000).toFixed(2)} seconds...`);
  await new Promise((resolve) => setTimeout(resolve, waitTime));
}

// Basic HTTP implementation for SDK - for a real implementation, this would need
// to integrate with the actual Lightyear proxy infrastructure
export const httpRequest: HttpRequest = async (props) => {
  const {
    method = "GET",
    url,
    headers,
    body,
    data,
    redactKeys,
    maxRetries = 3,
  } = props;

  const maxBackoffs = 5;
  let backoffCount = 0;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // This is a simplified implementation - in the real SDK, this would
      // go through the Lightyear proxy infrastructure
      const fetchOptions: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (body) {
        fetchOptions.body = body;
      } else if (data) {
        fetchOptions.body = JSON.stringify(data);
      }

      const response = await fetch(url, fetchOptions);

      let responseData;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      const proxyResponse: HttpProxyResponse = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
      };

      if (response.status === 429) {
        backoffCount += 1;
        if (backoffCount > maxBackoffs) {
          throw new HttpProxyResponseError(proxyResponse);
        }
        await exponentialBackoffWithJitter(backoffCount);
        continue;
      } else if (response.status < 200 || response.status >= 300) {
        throw new HttpProxyResponseError(proxyResponse);
      } else {
        // Redact secrets in logs
        console.debug("redacting keys", redactKeys);
        for (const key of redactKeys || []) {
          if (proxyResponse.data[key]) {
            // In a real implementation, this would integrate with the logging system
            console.debug(`Redacted key ${key} from response`);
          }
        }
      }

      return proxyResponse;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (error instanceof HttpProxyResponseError) {
        throw error;
      }

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  throw lastError || new Error("Max retries exceeded");
};
