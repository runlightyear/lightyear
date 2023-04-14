/**
 * This is the place to comment on the integration package
 *
 * @packageDocumentation
 */

/** Base Functions **/

/* Action */
import { defineAction } from "./base/action";
import type { DefineActionProps } from "./base/action";

/* Auth */
import { getAuthData } from "./base/auth";
import type { AuthData, AuthProps } from "./base/auth";

/* Base Request */
import baseRequest from "./base/baseRequest";
import type { BaseRequestProps } from "./base/baseRequest";

/* Cache */
import { getCache, saveCache } from "./base/cache";
import type { GetCacheProps, SaveCacheProps, CacheData } from "./base/cache";

/* Deploy */
import { deploy, getDeployData } from "./base/deploy";
import type { DeployFuncProps, DeployFunc } from "./base/deploy";

/* Http Proxy */
import type {
  HttpProxyRequestProps,
  HttpProxyResponse,
  HttpProxyResponseError,
} from "./base/http";

/* Runs */
import { run } from "./run";
import type { RunFunc, RunFuncProps } from "./run";
// TODO: where should these live?
import { PollingData, WebhookDeliveryData } from "./base/runData";

/* Secrets */
import { setSecret } from "./base/secret";
import type { SecretData } from "./base/secret";

/* Smtp Proxy */
import type {
  SmtpProxyRequestProps,
  SmtpProxyResponse,
  EmailAddress,
} from "./base/smtp";

/* Variables */
import { getVariableData, setVariable, VariableData } from "./base/variable";

/* Webhooks */
import { defineWebhook, getWebhookData } from "./base/webhook";
import type {
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
import { BaseConnector } from "./connectors/BaseConnector";
import type { BaseConnectorProps } from "./connectors/BaseConnector";

/* Auth Connector */
import { AuthConnector } from "./connectors/AuthConnector";
import type { AuthConnectorProps } from "./connectors/AuthConnector";

/* OAuth Connector */
import { OAuthConnector } from "./connectors/OAuthConnector";
import type {
  OAuthConnectorProps,
  OAuthConfigData,
} from "./connectors/OAuthConnector";

/* Rest Connector */
import { RestConnector } from "./connectors/RestConnector";
import type { RestConnectorProps } from "./connectors/RestConnector";

/* GraphQL Connector */
import { GraphQLConnector } from "./connectors/GraphQLConnector";
import type {
  GraphQLConnectorProps,
  GraphQLConnectorQueryProps,
} from "./connectors/GraphQLConnector";

/* Smtp Connector */
import { SmtpConnector } from "./connectors/SmtpConnector";
import { SmtpConnectorProps } from "./connectors/SmtpConnector";

/** Logging **/

import { PrefixedRedactedConsole } from "./logging/PrefixedRedactedConsole";

/** Utilities **/
import { base64ToBase64Url } from "./util/base64ToBase64Url";
import camelize from "./util/camelize";
import deCamelize from "./util/deCamelize";
import { getApiKey } from "./util/getApiKey";
import { getBaseUrl } from "./util/getBaseUrl";
import { getEnvName } from "./util/getEnvName";
import toTimestamp from "./util/toTimestamp";
export { dayjsUtc } from "./util/dayjsUtc";
export { isFunction } from "./util/isFunction";

/** Handler **/
import { handler } from "./handler";

/** Action Results */

/**
 * @public
 *
 * This can be thrown inside a RunFunc to end execution and mark the run as Skipped.
 */
const SKIPPED = "SKIPPED";

export {
  defineAction,
  getAuthData,
  getVariableData,
  defineWebhook,
  getWebhookData,
  BaseConnector,
  AuthConnector,
  OAuthConnector,
  RestConnector,
  GraphQLConnector,
  SmtpConnector,
  deploy,
  run,
  PrefixedRedactedConsole,
  handler,
  toTimestamp,
  camelize,
  deCamelize,
  HttpProxyResponseError,
  SKIPPED,
  getApiKey,
  getBaseUrl,
  getEnvName,
  base64ToBase64Url,
  setVariable,
  setSecret,
};

export type {
  AuthData,
  AuthProps,
  DefineActionProps,
  VariableData,
  SecretData,
  BaseConnectorProps,
  AuthConnectorProps,
  HttpProxyRequestProps,
  HttpProxyResponse,
  SmtpProxyRequestProps,
  SmtpProxyResponse,
  EmailAddress,
  OAuthConnectorProps,
  OAuthConfigData,
  RestConnectorProps,
  GraphQLConnectorProps,
  GraphQLConnectorQueryProps,
  SmtpConnectorProps,
  PollingData,
  WebhookDeliveryData,
  RunFunc,
  RunFuncProps,
  DefineWebhookProps,
  SubscribePropsFunc,
  SubscribePropsFuncProps,
  SubscribeFunc,
  SubscribeFuncProps,
  UnsubscribeFunc,
  UnsubscribeFuncProps,
};
