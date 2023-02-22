import baseRequest from "./baseRequest";

/**
 * @public
 */
export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

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
  }
}

export interface HttpRequest {
  (props: HttpProxyRequestProps): Promise<HttpProxyResponse>;
}

export const httpRequest: HttpRequest = async (props) => {
  console.debug("httpRequest with props", JSON.stringify(props, null, 2));

  const response = await baseRequest({
    uri: "/api/v1/httpRequest",
    data: props,
  });

  console.debug(`response.status`, response.status);
  console.debug(`response.statusText`, response.statusText);
  const proxyResponse = (await response.json()) as HttpProxyResponse;

  if (proxyResponse.status < 200 || proxyResponse.status >= 300) {
    console.error("Error in proxy http request", proxyResponse);
    throw new HttpProxyResponseError(proxyResponse);
  } else {
    console.debug("proxyResponse", proxyResponse);
  }

  return proxyResponse;
};
