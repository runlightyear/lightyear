import { deploy } from "../base/deploy";
import { handlerResult } from "./handlerResult";

export interface handleDeployProps {
  envName: string;
}

export async function handleDeploy({ envName }: handleDeployProps) {
  console.debug("Starting deploy");
  try {
    await deploy({ envName });
    return handlerResult(200, "Deploy successful");
  } catch (error) {
    console.error("Failed to deploy", String(error));
    return handlerResult(500, `Deploy failed: ${error}`);
  }
}
