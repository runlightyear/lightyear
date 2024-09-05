import baseRequest from "./baseRequest";
import { prefixedRedactedConsole } from "../logging";

/**
 * @public
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * @public
 */
export interface HttpProxyRequestProps {
  method?: HttpMethod;
  url: string;
  params?: Record<string, any>;
  headers?: {
    [key: string]: string;
  };
  data?: object;
  body?: string;
  redactKeys?: string[];
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

export const httpRequest: HttpRequest = async (props) => {
  const { redactKeys, ...rest } = props;

  console.log("httpRequest with props", JSON.stringify(props, null, 2));

  const response = await baseRequest({
    uri: "/api/v1/httpRequest",
    data: rest,
  });

  const parsedUrl = new URL(props.url);
  const displayUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;

  console.info(props.method, displayUrl, response.status, response.statusText);

  console.debug(`response.status`, response.status);
  console.debug(`response.statusText`, response.statusText);
  const proxyResponse = (await response.json()) as HttpProxyResponse;

  if (proxyResponse.status < 200 || proxyResponse.status >= 300) {
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
};
