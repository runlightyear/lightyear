/**
 * This is the place to comment on the integration package
 *
 * @packageDocumentation
 */

/** Base Functions **/

/* Action */
export { defineAction } from "./base/action";
export type { DefineActionProps } from "./base/action";

/* Auth */
export {
  getAuthData,
  updateAuthData,
  updateAuthDataState,
  setAuthError,
} from "./base/auth";
export type { AuthData, AuthProps } from "./base/auth";

/* Base Request */
export { default as baseRequest } from "./base/baseRequest";
export type { BaseRequestProps } from "./base/baseRequest";

/* Cache */
export { getCache, saveCache } from "./base/cache";
export type { GetCacheProps, SaveCacheProps, CacheData } from "./base/cache";

/* Deploy */
export { deploy, getDeployData } from "./base/deploy";
export type { DeployFuncProps, DeployFunc } from "./base/deploy";
export { getDeployList } from "./base/deploy";

/* Http Proxy */
export type {
  HttpProxyRequestProps,
  HttpProxyResponse,
  HttpProxyResponseError,
} from "./base/http";

/* OAuth */
export { defineOAuth } from "./base/oauth";
export type { DefineOAuthProps } from "./base/oauth";

/* Runs */
export { run } from "./run";
export type { RunFunc, RunFuncProps } from "./run";
// TODO: where should these live?
export type { PollingData, WebhookDeliveryData } from "./base/runData";

/* Secrets */
export { setSecret } from "./base/secret";
export type { SecretData } from "./base/secret";

/* Smtp Proxy */
export type {
  SmtpProxyRequestProps,
  SmtpProxyResponse,
  EmailAddress,
} from "./base/smtp";

/* Variables */
export { getVariableData, setVariable } from "./base/variable";
export type { VariableData } from "./base/variable";

/* Webhooks */
export { defineWebhook, getWebhookData } from "./base/webhook";
export type {
  DefineWebhookProps,
  SubscribePropsFunc,
  SubscribePropsFuncProps,
  SubscribeFunc,
  SubscribeFuncProps,
  UnsubscribeFunc,
  UnsubscribeFuncProps,
} from "./base/webhook";

/** Connectors **/

/* Base Connector */
export { BaseConnector } from "./connectors/BaseConnector";
export type { BaseConnectorProps } from "./connectors/BaseConnector";

/* Auth Connector */
export { AuthConnector } from "./connectors/AuthConnector";
export type { AuthConnectorProps } from "./connectors/AuthConnector";

/* OAuth Connector */
export { OAuthConnector } from "./connectors/OAuthConnector";
export type {
  OAuthConnectorProps,
  OAuthConfigData,
} from "./connectors/OAuthConnector";

/* Rest Connector */
export { RestConnector } from "./connectors/RestConnector";
export type { RestConnectorProps } from "./connectors/RestConnector";

/* GraphQL Connector */
export { GraphQLConnector } from "./connectors/GraphQLConnector";
export type {
  GraphQLConnectorProps,
  GraphQLConnectorQueryProps,
} from "./connectors/GraphQLConnector";

/* Smtp Connector */
// export { SmtpConnector } from "./connectors/SmtpConnector";
// export type { SmtpConnectorProps } from "./connectors/SmtpConnector";

/** Logging **/
export { PrefixedRedactedConsole } from "./logging/PrefixedRedactedConsole";

/** Utilities **/
export { base64ToBase64Url } from "./util/base64ToBase64Url";
export { default as camelize } from "./util/camelize";
export { default as deCamelize } from "./util/deCamelize";
export { getApiKey } from "./util/getApiKey";
export { getBaseUrl } from "./util/getBaseUrl";
export { getEnvName } from "./util/getEnvName";
export { default as toTimestamp } from "./util/toTimestamp";
export { dayjsUtc } from "./util/dayjsUtc";
export { isFunction } from "./util/isFunction";

/** Handler **/
export { handler } from "./handler";

/** Action Results */

/**
 * @public
 *
 * This can be thrown inside a RunFunc to end execution and mark the run as Skipped.
 */
export const SKIPPED = "SKIPPED";
