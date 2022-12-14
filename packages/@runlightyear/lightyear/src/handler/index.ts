import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { run } from "../run";
import { secrets as secretsList } from "../logging";
import { deploy } from "../base/deploy";
import { subscribe, unsubscribe } from "../subscriptionActivities";
import { handleRun } from "./handleRun";
import { handleDeploy } from "./handleDeploy";
import { handleSubscribe } from "./handleSubscribe";
import { handleUnsubscribe } from "./handleUnsubscribe";
import { handlerResult } from "./handlerResult";

interface RepoInvocation extends APIGatewayEvent {
  operation: string;
  removed?: boolean;
  actionName?: string;
  webhookName?: string;
  data?: any;
}

export const handler = async (
  event: RepoInvocation,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const envName = process.env.ENV_NAME;
  if (!envName) {
    console.error("Environment variable ENV_NAME not set");
    return handlerResult(400, "Environment variable ENV_NAME not set");
  }

  const apiKey = process.env.API_KEY;
  if (apiKey) {
    secretsList.push(apiKey);
  } else {
    return handlerResult(400, "Environment variable API_KEY not set");
  }

  if (!process.env.BASE_URL) {
    return handlerResult(400, "Environment variable BASE_URL not set");
  }

  console.debug(`Event: ${JSON.stringify(event, null, 2)}`);
  console.debug(`Context: ${JSON.stringify(context, null, 2)}`);

  const { operation, webhookName, removed, actionName, data } = event;

  if (!operation) {
    return handlerResult(400, "Required operation missing");
  }

  if (!["deploy", "subscribe", "unsubscribe", "run"].includes(operation)) {
    return handlerResult(
      400,
      `Invalid operation, must be 'deploy', 'subscribe', 'unsubscribe', or 'run': ${operation}`
    );
  }

  if (operation === "deploy") {
    return handleDeploy({ envName });
  } else if (operation === "unsubscribe") {
    return handleUnsubscribe({ envName, webhookName, removed });
  } else if (operation === "subscribe") {
    return handleSubscribe({ envName, webhookName });
  } else if (operation === "run") {
    return handleRun({ actionName, data, context });
  }

  return handlerResult(500, "Unknown error");
};
