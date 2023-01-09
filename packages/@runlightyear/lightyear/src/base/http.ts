import baseRequest from "./baseRequest";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface HttpProxyRequestOptions {
  method?: HttpMethod;
  url: string;
  params?: Record<string, any>;
  headers?: {
    [key: string]: string;
  };
  data?: object;
  body?: string;
}

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

export class HttpProxyResponseError extends Error {
  response: HttpProxyResponse;

  constructor(response: HttpProxyResponse) {
    super(`HttpProxyResponseError: ${response.status} ${response.statusText}`);
    this.response = response;
  }
}

export interface HttpRequest {
  (options: HttpProxyRequestOptions): Promise<HttpProxyResponse>;
}

export const httpRequest: HttpRequest = async (options) => {
  console.info("httpRequest with options", JSON.stringify(options, null, 2));

  const response = await baseRequest({
    uri: "/api/v1/httpRequest",
    data: options,
  });

  console.debug(`response.status: ${response.status}`, response.status);
  console.debug(
    `response.statusText: ${response.statusText}`,
    response.statusText
  );
  const proxyResponse = (await response.json()) as HttpProxyResponse;
  console.debug("proxyResponse", proxyResponse);
  console.debug(JSON.stringify(proxyResponse, null, 2));

  if (proxyResponse.status < 200 || proxyResponse.status >= 300) {
    throw new HttpProxyResponseError(proxyResponse);
  }

  return proxyResponse;
};
