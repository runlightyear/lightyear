import queryString from "query-string";
import { AuthConnector, AuthConnectorProps } from "./AuthConnector";
import {
  HttpProxyResponse,
  HttpProxyResponseError,
  httpRequest,
} from "../base/http";
import { HttpProxyRequestProps } from "../base/http";
import camelize from "../util/camelize";
import { WebhookDeliveryData } from "../base/runData";
import { setAuthError } from "../base/auth";

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
  async request(props: HttpProxyRequestProps): Promise<HttpProxyResponse> {
    console.debug("in RestConnector.request");
    const { method, url, params, headers, data } = props;

    const proxyProps = {
      method,
      url: this.buildUrl(url, params),
      headers: {
        ...headers,
        ...this.authorizationHeaders(),
      },
      body: data && JSON.stringify(data),
    };

    let response;

    try {
      response = await httpRequest(proxyProps);
    } catch (error) {
      if (error instanceof HttpProxyResponseError) {
        if (error.response.status === 401) {
          const { appName, customAppName, authName } = this.getAuthData();

          console.debug(this.getAuthData());

          await setAuthError({
            appName,
            customAppName,
            authName,
            error: "Unauthorized",
            errorResolution: "REAUTHORIZE",
          });
        }
      }

      throw error;
    }

    const processedData = this.camelize
      ? camelize(response.data)
      : response.data;

    return { ...response, data: processedData };
  }

  async get(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "get" });
  }

  async post(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "post" });
  }

  async put(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "put" });
  }

  async patch(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "patch" });
  }

  async delete(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "delete" });
  }

  static processDelivery(delivery: WebhookDeliveryData): WebhookDeliveryData {
    const camelCaseBody = camelize(delivery.body as Record<string, unknown>);

    return { ...delivery, body: camelCaseBody };
  }
}
