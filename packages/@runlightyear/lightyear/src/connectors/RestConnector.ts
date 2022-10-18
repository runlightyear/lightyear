import queryString from "query-string";
import { AuthConnector, AuthConnectorOptions } from "./AuthConnector";
import { HttpProxyResponse, httpRequest } from "../base/http";
import { HttpProxyRequestOptions } from "../base/http";
import camelize from "../util/camelize";
import { WebhookDeliveryData } from "../base/runData";

export interface RestConnectorOptions extends AuthConnectorOptions {
  baseUrl: string;
}

export class RestConnector extends AuthConnector {
  baseUrl: string;

  constructor({ baseUrl, ...rest }: RestConnectorOptions) {
    super(rest);
    this.baseUrl = baseUrl;
  }

  buildUrl(url: string, params?: Record<string, any>) {
    console.log("in RestConnector.buildUrl");
    const queryStr = params ? `?${queryString.stringify(params)}` : "";

    return `${this.baseUrl}${url}` + queryStr;
  }

  authorizationHeaders(): { [key: string]: string } {
    console.log("in RestConnector.authorizationHeaders");
    const { accessToken } = this.getAuthData();

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  /**
   * Make a proxied http request
   */
  async request(options: HttpProxyRequestOptions): Promise<HttpProxyResponse> {
    console.log("in RestConnector.request");
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

    return { ...response, data: camelize(response.data) };
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
