import queryString from "query-string";
import { AuthConnector, AuthConnectorProps } from "./AuthConnector";
import {
  HttpProxyResponse,
  HttpProxyResponseError,
  httpRequest,
  httpRequestBatch,
} from "../base/http";
import { HttpProxyRequestProps } from "../base/http";
import camelize from "../util/camelize";
import { WebhookDeliveryData } from "../base/runData";
import { setAuthError } from "../base/auth";
import { sleep } from "../util/sleep";

/**
 * @public
 */
export interface RestConnectorProps extends AuthConnectorProps {
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
export abstract class RestConnector extends AuthConnector {
  camelize: boolean;

  constructor(props: RestConnectorProps) {
    const { camelize = false, ...rest } = props;
    super(rest);

    this.camelize = camelize;
  }

  abstract getBaseUrl(): string;

  getDefaultParams(): Record<string, any> {
    return {};
  }

  getDefaultHeaders(): Record<string, any> {
    const { accessToken } = this.getAuthData();

    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };
  }

  getDefaultData(): Record<string, any> {
    return {};
  }

  buildUrl(url: string, params?: Record<string, any>) {
    console.debug("in RestConnector.buildUrl");
    const queryStr =
      params && Object.keys(params).length > 0
        ? `?${queryString.stringify(params)}`
        : "";

    return `${this.getBaseUrl()}${url}` + queryStr;
  }

  /**
   * Make a proxied http request
   */
  async request(props: HttpProxyRequestProps): Promise<HttpProxyResponse> {
    console.debug("in RestConnector.request");
    const {
      method,
      url,
      params,
      headers,
      data,
      async,
      confirm,
      syncInfo,
      managedUserId,
      managedUserExternalId,
      integrationName,
    } = props;

    const proxyProps = {
      method,
      url: this.buildUrl(url, {
        ...this.getDefaultParams(),
        ...params,
      }),
      headers: {
        ...this.getDefaultHeaders(),
        ...headers,
      },
      body:
        data &&
        JSON.stringify({
          ...this.getDefaultData(),
          ...data,
        }),
      async,
      confirm,
      syncInfo,
      managedUserId,
      managedUserExternalId,
      integrationName,
    };

    let response;
    const maxAuthFails = 1;
    let authRetries = 0;

    do {
      try {
        await this.refreshAuthDataIfNecessary();
        response = await httpRequest(proxyProps);
        break;
      } catch (error) {
        if (error instanceof HttpProxyResponseError) {
          if (error.response.status === 401) {
            const { appName, customAppName, authName } = this.getAuthData();

            console.debug("old auth data", this.getAuthData());

            authRetries += 1;
            if (authRetries <= maxAuthFails) {
              await sleep(1000);
              console.info(
                `Auth failure, retrying (${authRetries}/${maxAuthFails})`
              );
              await this.refreshAuthData();
              console.debug("new auth data", this.getAuthData());
              continue;
            }

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
    } while (true);

    const processedData = this.camelize
      ? camelize(response.data)
      : response.data;

    return { ...response, data: processedData };
  }

  async requestBatch(props: Array<HttpProxyRequestProps>, syncId?: string) {
    const requests = props.map((prop) => {
      const {
        method,
        url,
        params,
        headers,
        data,
        async,
        confirm,
        syncInfo,
        managedUserId,
        managedUserExternalId,
        integrationName,
      } = prop;

      return {
        method,
        url: this.buildUrl(url, {
          ...this.getDefaultParams(),
          ...params,
        }),
        headers: {
          ...this.getDefaultHeaders(),
          ...headers,
        },
        body:
          data &&
          JSON.stringify({
            ...this.getDefaultData(),
            ...data,
          }),
        async,
        confirm,
        syncInfo,
        managedUserId,
        managedUserExternalId,
        integrationName,
      };
    });

    const response = await httpRequestBatch(requests, syncId);

    return response;
  }

  async get(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "GET" });
  }

  async post(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "POST" });
  }

  async put(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "PUT" });
  }

  async patch(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "PATCH" });
  }

  async delete(props: HttpProxyRequestProps) {
    return await this.request({ ...props, method: "DELETE" });
  }

  static processDelivery(delivery: WebhookDeliveryData): WebhookDeliveryData {
    const camelCaseBody = camelize(delivery.body as Record<string, unknown>);

    return { ...delivery, body: camelCaseBody };
  }
}
