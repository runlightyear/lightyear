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

interface RepoInvocation extends APIGatewayEvent {
  operation: string;
  removed?: boolean;
  actionName?: string;
  webhookName?: string;
  data?: any;
  logDisplayLevel?: "DEBUG" | "INFO";
}

export const handler = async (
  event: RepoInvocation,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const { logDisplayLevel } = event;

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
  console.debug(`Context: ${JSON.stringify(context, null, 2)}`);

  const { operation, webhookName, removed, actionName, data } = event;

  if (!operation) {
    return handlerResult(400, "Required operation missing");
  }

  if (
    !["deploy", "subscribeProps", "subscribe", "unsubscribe", "run"].includes(
      operation
    )
  ) {
    return handlerResult(
      400,
      `Invalid operation, must be 'deploy', 'subscribe', 'unsubscribe', or 'run': ${operation}`
    );
  }

  if (operation === "deploy") {
    return handleDeploy({ envName });
  } else if (operation === "subscribeProps") {
    return handleSubscribeProps({ envName });
  } else if (operation === "unsubscribe") {
    return handleUnsubscribe({ envName, webhookName, removed });
  } else if (operation === "subscribe") {
    return handleSubscribe({ envName, webhookName });
  } else if (operation === "run") {
    return handleRun({ actionName, data, context });
  }

  return handlerResult(500, "Unknown error");
};
