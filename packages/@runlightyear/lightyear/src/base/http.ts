import baseRequest from "./baseRequest";
import { prefixedRedactedConsole } from "../logging";
import { sleep } from "../util/sleep";
import { getEnvName } from "../util/getEnvName";
import { getContext } from "./context";

/**
 * @public
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpProxyRequestHeaders {
  [key: string]: string;
}

export interface HttpProxyRequestConfirm {
  changeIds?: string[];
  idPath?: string;
  updatedAtPath?: string;
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
  confirm?: HttpProxyRequestConfirm;
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
  // return error instanceof HttpProxyResponseError;
  return !!error && typeof error === "object" && "response" in error;
}

export interface HttpRequest {
  (props: HttpProxyRequestProps): Promise<HttpProxyResponse>;
}

export interface HttpRequestBatch {
  (requests: Array<HttpProxyRequestProps>): Promise<HttpProxyResponse>;
}

function getRandomJitter(maxJitter: number): number {
  return Math.floor(Math.random() * maxJitter);
}
async function exponentialBackoffWithJitter(retryCount: number): Promise<void> {
  const baseWaitTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
  const jitter = getRandomJitter(5000); // Add up to 5 seconds of jitter
  const waitTime = baseWaitTime + jitter;
  console.log(`Retrying in ${(waitTime / 1000).toFixed(2)} seconds...`);
  await sleep(waitTime);
}

export const httpRequest: HttpRequest = async (props) => {
  const envName = getEnvName();
  const { runId } = getContext();
  const { redactKeys, maxRetries, ...rest } = props;

  const maxBackoffs = 5;
  let backoffCount = 0;

  do {
    const response = await baseRequest({
      uri: `/api/v1/envs/${envName}/http-request`,
      data: { ...rest, runId },
      maxRetries,
    });

    const parsedUrl = new URL(props.url);
    const displayUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;

    console.info(
      props.method,
      displayUrl,
      response.status,
      response.statusText
    );

    console.debug(`response.status`, response.status);
    console.debug(`response.statusText`, response.statusText);
    const proxyResponse = (await response.json()) as HttpProxyResponse;

    if (proxyResponse.status === 429) {
      backoffCount += 1;
      if (backoffCount > maxBackoffs) {
        throw new HttpProxyResponseError(proxyResponse);
      }
      await exponentialBackoffWithJitter(backoffCount);
      continue;
    } else if (proxyResponse.status < 200 || proxyResponse.status >= 300) {
      console.error("Error in proxy http request", proxyResponse);
      throw new HttpProxyResponseError(proxyResponse);
    } else {
      console.debug("redacting keys", redactKeys);
      for (const key of redactKeys || []) {
        if (proxyResponse.data[key]) {
          prefixedRedactedConsole.addSecrets([proxyResponse.data[key]]);
        } else {
          console.debug(`key ${key} not found in response data`);
        }
      }

      console.debug("proxyResponse", proxyResponse);
    }

    return proxyResponse;
  } while (true);
};

export const httpRequestBatch: HttpRequestBatch = async (requests) => {
  const envName = getEnvName();
  const { runId, syncId } = getContext();

  const response = await baseRequest({
    uri: `/api/v1/envs/${envName}/http-request/batch`,
    data: { runId, syncId, requests },
  });

  const proxyResponse = (await response.json()) as HttpProxyResponse;

  console.debug("proxyResponse", proxyResponse);

  return proxyResponse;
};
