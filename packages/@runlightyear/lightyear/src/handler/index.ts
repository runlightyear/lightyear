import "../logging";
import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { run } from "../run";
import { deploy } from "../base/deploy";
import { subscribe, unsubscribe } from "../subscriptionActivities";
import { handleRun } from "./handleRun";
import { handleDeploy } from "./handleDeploy";
import { handleSubscribe } from "./handleSubscribe";
import { handleUnsubscribe } from "./handleUnsubscribe";
import { handlerResult } from "./handlerResult";
import { prefixedRedactedConsole } from "../logging";
import { prepareConsole } from "../logging/prepareConsole";
import { handleSubscribeProps } from "./handleSubscribeProps";
import { getEnvName } from "../util/getEnvName";
import { getApiKey } from "../util/getApiKey";
import { getBaseUrl } from "../util/getBaseUrl";
import { setContext } from "../base/context";
import { handleGetAuthRequestUrl } from "./handleGetAuthRequestUrl";
import { handleRequestAccessToken } from "./handleRequestAccessToken";
import { handleRefreshAccessToken } from "./handleRefreshAccessToken";
import { handleRefreshSubscription } from "./handleRefreshSubscription";
import { handleReceiveCustomAppWebhookDelivery } from "./handleReceiveCustomAppWebhookDelivery";

/**
 * @internal
 */
export interface RepoInvocation extends APIGatewayEvent {
  operation: string;
  removed?: boolean;
  actionName?: string;
  webhookName?: string;
  customAppName?: string;
  authName?: string;
  code?: string;
  data?: any;
  logDisplayLevel?: "DEBUG" | "INFO";
}

/**
 * @internal
 *
 * The entry point for all operations
 *
 * @param event
 * @param context
 */
export async function handler(
  event: RepoInvocation,
  context: Context
): Promise<APIGatewayProxyResult> {
  const { logDisplayLevel } = event;

  setContext({});
  prepareConsole(logDisplayLevel || "DEBUG");
  prefixedRedactedConsole.initialize();
  console.debug("Initialized console");

  const envName = getEnvName();
  if (!envName) {
    console.error("Environment variable ENV_NAME not set");
    return handlerResult(400, "Environment variable ENV_NAME not set");
  } else {
    console.debug("In environment", envName);
  }

  const apiKey = getApiKey();
  if (apiKey) {
    prefixedRedactedConsole.addSecrets([apiKey]);
  } else {
    return handlerResult(400, "Environment variable API_KEY not set");
  }

  if (!getBaseUrl()) {
    return handlerResult(400, "Environment variable BASE_URL not set");
  }

  console.debug(`Event: ${JSON.stringify(event, null, 2)}`);

  const {
    operation,
    webhookName,
    removed,
    actionName,
    customAppName,
    authName,
    code,
    data,
  } = event;

  if (!operation) {
    return handlerResult(400, "Required operation missing");
  }

  if (
    ![
      "deploy",
      "subscribeProps",
      "subscribe",
      "unsubscribe",
      "refreshSubscription",
      "run",
      "getAuthRequestUrl",
      "requestAccessToken",
      "refreshAccessToken",
      "receiveWebhookDelivery",
      "receiveCustomAppWebhookDelivery",
    ].includes(operation)
  ) {
    return handlerResult(400, `Invalid operation: ${operation}`);
  }

  setContext({ operation, actionName, webhookName });

  if (operation === "deploy") {
    return handleDeploy({ envName });
  } else if (operation === "subscribeProps") {
    return handleSubscribeProps({ envName });
  } else if (operation === "unsubscribe") {
    return handleUnsubscribe({ envName, webhookName, removed });
  } else if (operation === "subscribe") {
    return handleSubscribe({ envName, webhookName });
  } else if (operation === "refreshSubscription") {
    return handleRefreshSubscription({ webhookName });
  } else if (operation === "run") {
    return handleRun({ actionName, data, context });
  } else if (operation === "getAuthRequestUrl") {
    if (!customAppName) {
      return handlerResult(400, "Missing customAppName");
    }
    if (!authName) {
      return handlerResult(400, "Missing authName");
    }
    return handleGetAuthRequestUrl({ customApp: customAppName, authName });
  } else if (operation === "requestAccessToken") {
    return handleRequestAccessToken({
      customAppName,
      authName,
      code,
    });
  } else if (operation === "refreshAccessToken") {
    return handleRefreshAccessToken({
      customAppName,
      authName,
    });
  } else if (operation === "receiveCustomAppWebhookDelivery") {
    if (!customAppName) {
      return handlerResult(400, "Missing customAppName");
    }
    if (!authName) {
      return handlerResult(400, "Missing authName");
    }
    return handleReceiveCustomAppWebhookDelivery({
      customAppName,
      delivery: data,
    });
    // } else if (operation === "receiveWebhookDelivery") {
    //   return handleReceiveWebhookDelivery({ data });
  }

  return handlerResult(500, "Unknown error");
}
