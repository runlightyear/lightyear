import {deploy, getDeployData} from "../base/deploy";
import { handlerResult } from "./handlerResult";
import {subscribeProps} from "../subscriptionActivities";

export interface handleDeployProps {
  envName: string;
}

export async function handleDeploy({ envName }: handleDeployProps) {
  console.info("Starting deploy");
  try {
    await deploy({ envName });
    return handlerResult(200, "Deploy successful");
  } catch (error) {
    console.error("Failed to deploy", String(error));
    return handlerResult(500, `Deploy failed: ${error}`);
  }
}
