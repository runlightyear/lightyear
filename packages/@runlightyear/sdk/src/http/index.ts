import { getCurrentContext } from "../logging";

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

// Get the current context values from log context
function getCurrentRunContext(): {
  runId?: string;
  integrationName?: string;
  managedUserId?: string;
  managedUserExternalId?: string;
  managedUserDisplayName?: string | null;
} {
  const ctx = getCurrentContext();
  return {
    runId: ctx.runId,
    integrationName: (ctx as any).integrationName,
    managedUserId: (ctx as any).managedUserId,
    managedUserExternalId: (ctx as any).managedUserExternalId,
    managedUserDisplayName: (ctx as any).managedUserDisplayName ?? null,
  };
}

// HTTP implementation for SDK that uses the Lightyear proxy infrastructure
export const httpRequest: HttpRequest = async (props) => {
  const { redactKeys, maxRetries = 3, ...rest } = props;

  // Get environment variables
  const envName = process.env.ENV_NAME || "dev";
  const baseUrl = process.env.BASE_URL || "https://app.runlightyear.com";
  const apiKey = process.env.LIGHTYEAR_API_KEY || process.env.API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing API key. Set LIGHTYEAR_API_KEY or API_KEY environment variable."
    );
  }

  // Get the current run and execution context
  const { runId } = getCurrentRunContext();

  console.debug("SDK httpRequest - runId from context:", runId);
  console.debug("SDK httpRequest - props:", JSON.stringify(rest, null, 2));

  const maxBackoffs = 5;
  let backoffCount = 0;

  do {
    try {
      // Use the same proxy endpoint as the lightyear package
      const proxyUrl = `${baseUrl}/api/v1/envs/${envName}/http-request`;

      const requestBody = {
        ...rest,
        runId,
      };

      console.debug("Making proxy request to:", proxyUrl);
      console.debug("Request body:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: {
          Authorization: `apiKey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Proxy request failed: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const proxyResponse = (await response.json()) as HttpProxyResponse;

      if (proxyResponse.status === 429) {
        backoffCount += 1;
        if (backoffCount > maxBackoffs) {
          throw new HttpProxyResponseError(proxyResponse);
        }
        await exponentialBackoffWithJitter(backoffCount);
        continue;
      } else if (proxyResponse.status < 200 || proxyResponse.status >= 300) {
        throw new HttpProxyResponseError(proxyResponse);
      } else {
        // Redact secrets in logs
        console.debug("redacting keys", redactKeys);
        for (const key of redactKeys || []) {
          if (proxyResponse.data[key]) {
            console.debug(`Redacted key ${key} from response`);
          } else {
            console.debug(`key ${key} not found in response data`);
          }
        }
      }

      return proxyResponse;
    } catch (error) {
      if (error instanceof HttpProxyResponseError) {
        throw error;
      }

      // For non-HTTP errors, retry with exponential backoff
      if (backoffCount < maxBackoffs) {
        backoffCount += 1;
        await exponentialBackoffWithJitter(backoffCount);
        continue;
      }

      throw error;
    }
  } while (true);
};
