import { handlerResult } from "./handlerResult";
import { subscribeProps } from "../subscriptionActivities";

export interface HandleSubscribePropsProps {
  envName: string;
}

export async function handleSubscribeProps({
  envName,
}: HandleSubscribePropsProps) {
  console.debug("Evaluating subscribeProps");
  try {
    await subscribeProps({ envName });
    console.debug("back from subscribeProps");
    return handlerResult(200, "Evaluate subscribe props successful");
  } catch (error) {
    console.error("Failed to evaluate subscribe props", String(error));
    return handlerResult(500, `Evaluate subscribe props failed: ${error}`);
  }
}
