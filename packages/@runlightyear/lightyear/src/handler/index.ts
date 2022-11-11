import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { run } from "../run";
import { emptyLogs, emptySecrets, secrets as secretsList } from "../logging";
import { deploy } from "../base/deploy";
import { getActionData } from "../base/action";
import { getSubscriptionData, updateSubscription } from "../base/subscription";
import { subscribe, unsubscribe } from "../subscriptionActions";
import { createSubscriptionAction } from "../base/subscriptionAction";

interface RepoInvocation extends APIGatewayEvent {
  operation: string;
  subscriptionName?: string;
  removed?: boolean;
  actionName?: string;
  data?: any;
}

function result(statusCode: number, message: string) {
  // @ts-ignore
  const logList = [...global.logs];

  // Lambdas retain state in between 'warm' runs, so important to clear
  // anything global
  emptyLogs();
  emptySecrets();

  return {
    statusCode,
    body: JSON.stringify({ message, logs: logList }, null, 2),
  };
}

export const handler = async (
  event: RepoInvocation,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const envName = process.env.ENV_NAME;
  if (!envName) {
    console.log("Environment variable ENV_NAME not set");
    return result(400, "Environment variable ENV_NAME not set");
  }

  const apiKey = process.env.API_KEY;
  if (apiKey) {
    secretsList.push(apiKey);
  } else {
    return result(400, "Environment variable API_KEY not set");
  }

  if (!process.env.BASE_URL) {
    return result(400, "Environment variable BASE_URL not set");
  }

  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const { operation, subscriptionName, removed, actionName, data } = event;

  if (!operation) {
    return result(400, "Required action missing");
  }

  if (!["deploy", "subscribe", "unsubscribe", "run"].includes(operation)) {
    return result(
      400,
      `Invalid action, must be 'deploy', 'subscribe', 'unsubscribe', or 'run': ${operation}`
    );
  }

  if (operation === "deploy") {
    console.log("About to deploy");
    try {
      await deploy({ envName });
      return result(200, "Deploy successful");
    } catch (error) {
      console.log("Failed to deploy", String(error));
      console.trace();
      return result(500, `Deploy failed: ${error}`);
    }
  } else if (operation === "unsubscribe") {
    if (!subscriptionName) {
      return result(400, "Missing subscriptionName");
    }

    const subscriptionData = await getSubscriptionData(subscriptionName);
    const { unsubscribeArgs, auths } = subscriptionData;

    let statusCode: number;
    let message: string;

    try {
      await unsubscribe({
        name: subscriptionName,
        unsubscribeArgs,
        auths,
      });
      statusCode = 200;
      message = "Unsubscribe successful";
    } catch (error) {
      console.log("Failed to cleanup", String(error));
      console.trace();
      statusCode = 500;
      message = `Unsubscribe failed: ${error}`;
    }

    // @ts-ignore
    const logList = [...global.logs];

    await createSubscriptionAction({
      type: "UNSUBSCRIBE",
      status: statusCode === 200 ? "SUCCESS" : "FAILURE",
      subscriptionName,
      logs: logList,
    });

    if (removed) {
      await updateSubscription(envName, {
        name: subscriptionName,
        status: statusCode === 200 ? "UNSUBSCRIBED" : "UNSUBSCRIBE_FAILED",
        unsubscribeArgs,
      });
    }

    return result(statusCode, message);
  } else if (operation === "subscribe") {
    console.log("ready to try subscribing");
    if (!subscriptionName) {
      return result(400, "Missing subscriptionName");
    }

    const subscriptionData = await getSubscriptionData(subscriptionName);
    const { subscribeArgs, auths } = subscriptionData;

    let statusCode: number;
    let message: string;

    let unsubscribeArgs: object | undefined = undefined;

    try {
      unsubscribeArgs = await subscribe({
        name: subscriptionName,
        subscribeArgs,
        auths,
      });
      statusCode = 200;
      message = "Subscribe successful";
    } catch (error) {
      console.log("Failed to subscribe", String(error));
      console.trace();
      statusCode = 500;
      message = `Subscribe failed: ${error}`;
    }

    // @ts-ignore
    const logList = [...global.logs];

    await createSubscriptionAction({
      type: "SUBSCRIBE",
      status: statusCode === 200 ? "SUCCESS" : "FAILURE",
      subscriptionName,
      logs: logList,
    });

    await updateSubscription(envName, {
      name: subscriptionName,
      status: statusCode === 200 ? "SUBSCRIBED" : "SUBSCRIBE_FAILED",
      unsubscribeArgs,
    });

    return result(statusCode, message);
  } else if (operation === "run") {
    if (!actionName) {
      return result(400, "Missing actionName");
    }

    const actionData = await getActionData(actionName);
    const { auths, variables, secrets, webhook } = actionData;

    try {
      console.log(`About to run action ${actionName}`);
      await run({
        name: actionName,
        data,
        variables,
        auths,
        secrets,
        webhook,
        context,
      });
      return result(200, "Run successful");
    } catch (error) {
      console.log("Failed to run action", String(error));
      return result(500, "Run failed");
    }
  }

  return result(500, "Unknown error");
};
