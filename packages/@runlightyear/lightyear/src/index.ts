/**
 * This is the place to comment on the integration package
 *
 * @packageDocumentation
 */

/** Initialize globals **/
globalThis.deployList = [];
globalThis.actionIndex = {};
globalThis.subscribeIndex = {};
globalThis.unsubscribeIndex = {};
globalThis.refreshSubscriptionIndex = {};
globalThis.receiveDeliveryIndex = {};
globalThis.authorizerIndex = {};
globalThis.customAppWebhookIndex = {};

/** Base Functions **/

/* Action */
export { defineAction } from "./base/action";
export type { AppName, DefineActionProps } from "./base/action";

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

/* Collection */
export {
  defineCollection,
  getModels,
  upsertObject,
  upsertObjectBatch,
  confirmChange,
  confirmChangeBatch,
  deleteObject,
  detectHardDeletes,
  finishSync,
} from "./base/collection";
export type {
  DefineCollectionProps,
  UpsertObjectProps,
  ConfirmChangeProps,
  DetectHardDeletesProps,
  FinishSyncProps,
} from "./base/collection";

/* Collection: CRM */
export type {
  DefineCrmCollectionProps,
  CrmUserDataType,
  CrmUserType,
  CrmAccountDataType,
  CrmAccountType,
  CrmContactDataType,
  CrmContactType,
  CrmOpportunityDataType,
  CrmLeadDataType,
  CrmCallDataType,
  CrmTaskDataType,
  CrmMeetingDataType,
  CrmNoteDataType,
  CrmProductDataType,
  CrmOpportunityLineItemDataType,
} from "./collections/crm";
export { defineCrmCollection } from "./collections/crm";

/* Custom App */
export { defineCustomApp } from "./base/customApp";
export type {
  DefineCustomAppBasicProps,
  DefineCustomAppApiKeyProps,
  DefineCustomAppOAuthProps,
  DefineCustomAppProps,
  AppWebhookFunc,
} from "./base/customApp";

/* Delivery */
export type {
  WebhookDelivery,
  AppWebhookDeliveryResponse,
  WebhookDeliveryResponse,
} from "./base/delivery";

/* Deploy */
export { deploy, getDeployData } from "./base/deploy";
export type { DeployFuncProps, DeployFunc } from "./base/deploy";
export { getDeployList } from "./base/deploy";

/* Http Proxy */
export { isHttpProxyResponseError } from "./base/http";
export type {
  HttpProxyRequestProps,
  HttpProxyResponse,
  HttpProxyResponseError,
} from "./base/http";

/* Integration */
export { defineIntegration } from "./base/integration";
export type { DefineIntegrationProps } from "./base/integration";

/* OAuth */
export { defineAuthorizer, defineOAuth } from "./base/authorizer";
export type {
  DefineAuthorizerProps,
  DefineOAuthProps,
} from "./base/authorizer";

/* Runs */
export { run } from "./run";
export type {
  RunFunc,
  RunFuncProps,
  Auths,
  Variables,
  Secrets,
  RunProps,
} from "./run";
// TODO: where should these live?
export type { PollingData, WebhookDeliveryData } from "./base/runData";

/* Secrets */
export { setSecret } from "./base/secret";
export type { SecretDef, SecretData } from "./base/secret";

/* Subscriptions */
export { setSubscriptionExpiresAt } from "./base/subscription";

/* Sync Actions */
export { defineSyncAction } from "./base/syncAction";
export type {
  DefineSyncActionProps,
  SynchronizerProps,
} from "./base/syncAction";

/* Sync Integrations */
export { defineSyncIntegration } from "./base/syncIntegration";
export type { DefineSyncIntegrationProps } from "./base/syncIntegration";

/* Variables */
export { getVariableData, setVariable } from "./base/variable";
export type { VariableDef, VariableData } from "./base/variable";

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
  RefreshSubscriptionFunc,
  RefreshSubscriptionFuncProps,
} from "./base/webhook";

/** Connectors **/

/* Base Connector */
export { BaseConnector } from "./connectors/BaseConnector";
export type { BaseConnectorProps, AuthType } from "./connectors/BaseConnector";

/* App Webhook Connector */
export { AppWebhookConnector } from "./connectors/AppWebhookConnector";
export type { AppWebhookConnectorProps } from "./connectors/AppWebhookConnector";

/* Auth Connector */
export { AuthConnector } from "./connectors/AuthConnector";
export type { AuthConnectorProps } from "./connectors/AuthConnector";

/* Model Connector */
export { ModelConnector } from "./connectors/ModelConnector";
export type {
  ModelConnectorProps,
  ListProps,
  ReadProps,
  CreateProps,
  UpdateProps,
  DeleteProps,
  CreateBatchProps,
  UpdateBatchProps,
  DeleteBatchProps,
  ObjectList,
  ObjectMeta,
  Object,
  Prettify,
  ObjectId,
  ExternalId,
  BaseObject,
  BaseExternal,
  ValidateFn,
} from "./connectors/ModelConnector";

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

/* Sync Connector */
export { SyncConnector } from "./connectors/SyncConnector";
export type {
  SyncConnectorProps,
  SyncConnectorGetModelsResponse,
  ModelConnectorConstructor,
} from "./connectors/SyncConnector";

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
export { sleep } from "./util/sleep";
export { default as zod } from "zod";
export { v4 as uuidv4 } from "uuid";
export type { FromSchema } from "json-schema-to-ts";

/** Handler **/
export { handler } from "./handler";

/** Action Results */

/**
 * @public
 *
 * This can be thrown inside a RunFunc to end execution and mark the run as Skipped.
 */
export const SKIPPED = "SKIPPED";

/**
 * @public
 *
 * This can be thrown inside a RunFunc to end execution tell the action to rerun.
 *
 * The action will be rerun with the same props as the original run.
 */
export const RERUN = "RERUN";
