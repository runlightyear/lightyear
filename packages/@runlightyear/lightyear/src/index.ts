/**
 * This is the place to comment on the integration package
 *
 * @packageDocumentation
 */

import { getAuthData, AuthData, AuthProps } from "./base/auth";
import {
  HttpProxyRequestOptions,
  HttpProxyResponse,
  HttpProxyResponseError,
} from "./base/http";
import { SecretData } from "./base/secret";
import { defineAction, DefineActionOptions } from "./base/action";
import { RunFunc, RunFuncProps } from "./run";
import { getVariableData, VariableData } from "./base/variable";
import {
  defineWebhook,
  getWebhookData,
  SubscribePropsFunc,
  SubscribePropsFuncProps,
  SubscribeFunc,
  SubscribeFuncProps,
  UnsubscribeFunc,
  UnsubscribeFuncProps,
} from "./base/webhook";
import {
  BaseConnector,
  BaseConnectorOptions,
} from "./connectors/BaseConnector";
import {
  AuthConnector,
  AuthConnectorOptions,
} from "./connectors/AuthConnector";
import {
  OauthConnector,
  OauthConnectorProps,
  OauthConfigData,
} from "./connectors/OauthConnector";
import {
  RestConnector,
  RestConnectorOptions,
} from "./connectors/RestConnector";
import { deploy } from "./base/deploy";
import { run } from "./run";
import { PrefixedRedactedConsole } from "./logging/PrefixedRedactedConsole";
import { handler } from "./handler";
import toTimestamp from "./util/toTimestamp";
import { PollingData, WebhookDeliveryData } from "./base/runData";
import deCamelize from "./util/deCamelize";

const SKIPPED = "SKIPPED";

export {
  defineAction,
  getAuthData,
  getVariableData,
  defineWebhook,
  getWebhookData,
  BaseConnector,
  AuthConnector,
  OauthConnector,
  RestConnector,
  deploy,
  run,
  PrefixedRedactedConsole,
  handler,
  toTimestamp,
  deCamelize,
  HttpProxyResponseError,
  SKIPPED,
};

export type {
  AuthData,
  AuthProps,
  DefineActionOptions,
  VariableData,
  SecretData,
  BaseConnectorOptions,
  AuthConnectorOptions,
  HttpProxyRequestOptions,
  HttpProxyResponse,
  OauthConnectorProps,
  OauthConfigData,
  RestConnectorOptions,
  PollingData,
  WebhookDeliveryData,
  RunFunc,
  RunFuncProps,
  SubscribePropsFunc,
  SubscribePropsFuncProps,
  SubscribeFunc,
  SubscribeFuncProps,
  UnsubscribeFunc,
  UnsubscribeFuncProps,
};
