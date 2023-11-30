import readPackage from "./readPackage";
import getCompiledCode from "./getCompiledCode";
import runInContext from "./runInContext";
import { prepareConsole } from "../logging";
import { logDisplayLevel } from "./setLogDisplayLevel";
import { deliverLocalResponse } from "./deliverLocalResponse";
import { getCustomAppWebhookDelivery } from "./getCustomAppWebhookDelivery";
import { updateCustomAppWebhookDelivery } from "./updateCustomAppWebhookDelivery";

export interface ExecReceiveCustomWebhookProps {
  deliveryId: string;
  customAppName: string;
  authName: string;
  localResponseId: string;
}

export async function execReceiveCustomWebhook(
  props: ExecReceiveCustomWebhookProps
) {
  const { customAppName, authName, deliveryId, localResponseId } = props;

  const pkg = readPackage();
  const compiledCode = getCompiledCode(pkg.main);

  const delivery = await getCustomAppWebhookDelivery({
    customAppName,
    deliveryId,
  });

  if (!delivery) {
    throw new Error("Delivery not found");
  }

  console.log("delivery", delivery);

  let handler;
  try {
    handler = runInContext(compiledCode).handler;
  } catch (error) {
    prepareConsole();
    console.error(error);
    return;
  }

  const handlerResult = await handler({
    operation: "receiveCustomAppWebhookDelivery",
    customAppName,
    authName,
    data: {
      method: delivery.method,
      url: delivery.url,
      headers: delivery.requestHeaders,
      body: delivery.requestBody,
    },
    logDisplayLevel,
  });

  prepareConsole();

  const { statusCode, body } = handlerResult;
  const handlerResponseData = JSON.parse(body);
  const { response: receiverResponse, logs } = handlerResponseData;

  await deliverLocalResponse({
    localResponseId,
    response: JSON.stringify({
      response: {
        statusCode: receiverResponse.statusCode,
        headers: receiverResponse.headers,
        body: receiverResponse.body,
      },
    }),
  });

  console.log("receiverResponse", receiverResponse);
  console.log("logs", logs);

  await updateCustomAppWebhookDelivery({
    customAppName,
    deliveryId,
    logs,
  });
}
