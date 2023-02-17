import queryString from "query-string";
import { AuthConnector, AuthConnectorProps } from "./AuthConnector";
import { HttpProxyResponse, httpRequest } from "../base/http";
import { HttpProxyRequestOptions } from "../base/http";
import camelize from "../util/camelize";
import { WebhookDeliveryData } from "../base/runData";

/**
 * @public
 */
export interface RestConnectorProps extends AuthConnectorProps {
  baseUrl: string;
  /**
   * Whether to automatically convert calls to and from camelCase to snake_case
   */
  camelize?: boolean;
}

/**
 * @public
 *
 * Rest Connector
 *
 * The base for making calls to REST APIs
 *
 * @param props
 */
export class RestConnector extends AuthConnector {
  baseUrl: string;
  camelize: boolean;

  constructor(props: RestConnectorProps) {
    const { baseUrl, camelize = true, ...rest } = props;
    super(rest);
    this.baseUrl = baseUrl;
    this.camelize = camelize;
  }

  buildUrl(url: string, params?: Record<string, any>) {
    console.debug("in RestConnector.buildUrl");
    const queryStr = params ? `?${queryString.stringify(params)}` : "";

    return `${this.baseUrl}${url}` + queryStr;
  }

  authorizationHeaders(): { [key: string]: string } {
    console.debug("in RestConnector.authorizationHeaders");
    const { accessToken } = this.getAuthData();

    return {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * Make a proxied http request
   */
  async request(options: HttpProxyRequestOptions): Promise<HttpProxyResponse> {
    console.debug("in RestConnector.request");
    const { method, url, params, headers, data } = options;

    const proxyOptions = {
      method,
      url: this.buildUrl(url, params),
      headers: {
        ...headers,
        ...this.authorizationHeaders(),
      },
      body: data && JSON.stringify(data),
    };

    const response = await httpRequest(proxyOptions);

    const processedData = this.camelize
      ? camelize(response.data)
      : response.data;

    return { ...response, data: processedData };
  }

  async get(options: HttpProxyRequestOptions) {
    return await this.request({ ...options, method: "get" });
  }

  async post(options: HttpProxyRequestOptions) {
    return await this.request({ ...options, method: "post" });
  }

  async put(options: HttpProxyRequestOptions) {
    return await this.request({ ...options, method: "put" });
  }

  async patch(options: HttpProxyRequestOptions) {
    return await this.request({ ...options, method: "patch" });
  }

  async delete(options: HttpProxyRequestOptions) {
    return await this.request({ ...options, method: "delete" });
  }

  static processDelivery(delivery: WebhookDeliveryData): WebhookDeliveryData {
    const camelCaseBody = camelize(delivery.body as Record<string, unknown>);

    return { ...delivery, body: camelCaseBody };
  }
}
