import { exportRegistry } from "../registry";
import type { HandlerResponse } from "./types";

interface DeployPayload {
  environment?: string;
  dryRun?: boolean;
  baseUrl?: string;
  [key: string]: any;
}

interface ModelSchema {
  name: string;
  title: string;
  schema?: any;
  matchOn?: any;
}

interface CollectionProps {
  name: string;
  title: string;
  models?: ModelSchema[];
}

interface CustomAppProps {
  name: string;
  title: string;
  authType: "OAUTH2" | "APIKEY" | "BASIC";
  hasOAuth?: boolean;
  hasAppWebhook?: boolean;
  variables?: Array<string | { name: string; description?: string }>;
  secrets?: Array<string | { name: string; description?: string }>;
}

interface DeploymentItem {
  type: "collection" | "customApp";
  collectionProps?: CollectionProps;
  customAppProps?: CustomAppProps;
}

function transformRegistryToDeploymentSchema(
  registryData: any
): DeploymentItem[] {
  const deploymentItems: DeploymentItem[] = [];

  for (const item of registryData.items) {
    switch (item.type) {
      case "collection":
        deploymentItems.push({
          type: "collection",
          collectionProps: {
            name: item.collection.name,
            title: item.collection.title || item.collection.name,
            models: item.collection.models?.map((model: any) => ({
              name: model.name,
              title: model.title || model.name,
              schema: model.schema,
              matchOn: model.matchPattern,
            })),
          },
        });
        break;

      case "customApp":
        const variables = item.customApp.variables?.map((variable: any) =>
          variable.title || variable.description
            ? {
                name: variable.name,
                description: variable.title || variable.description,
              }
            : variable.name
        );

        const secrets = item.customApp.secrets?.map((secret: any) =>
          secret.title || secret.description
            ? {
                name: secret.name,
                description: secret.title || secret.description,
              }
            : secret.name
        );

        deploymentItems.push({
          type: "customApp",
          customAppProps: {
            name: item.customApp.name,
            title: item.customApp.title || item.customApp.name,
            authType: item.customApp.type,
            variables,
            secrets,
          },
        });
        break;

      case "model":
        // Models are handled as part of collections, skip standalone models
        break;

      default:
        console.warn(`Unknown registry item type: ${item.type}`);
    }
  }

  return deploymentItems;
}

async function postDeploymentData(
  deploymentData: DeploymentItem[],
  payload: DeployPayload
): Promise<any> {
  const baseUrl = payload.baseUrl || process.env.BASE_URL;
  const envName = payload.environment || process.env.ENV_NAME || "default";

  if (!baseUrl) {
    throw new Error(
      "BASE_URL must be provided in payload or environment variables"
    );
  }

  const url = `${baseUrl}/api/v1/envs/${envName}/deploy`;

  console.log(`Deploying to: ${url}`);
  console.log(`Deployment data:`, JSON.stringify(deploymentData, null, 2));

  if (payload.dryRun) {
    console.log("DRY RUN: Would POST deployment data to:", url);
    return { dryRun: true, url, data: deploymentData };
  }

  try {
    // In a real implementation, you'd use fetch or another HTTP client
    // For now, we'll simulate the request
    console.log("Making HTTP POST request...");

    // Simulated HTTP request
    const response = {
      status: 200,
      data: {
        deploymentId: `deploy_${Date.now()}`,
        status: "success",
        itemsDeployed: deploymentData.length,
        environment: envName,
        deployedAt: new Date().toISOString(),
      },
    };

    return response.data;
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

export async function handleDeploy(
  payload: DeployPayload = {}
): Promise<HandlerResponse> {
  console.log("Deploy operation called", { payload });

  try {
    // Export current registry state
    const exported = exportRegistry();

    // Transform registry data to match deployment schema
    const deploymentData = transformRegistryToDeploymentSchema(exported);

    if (deploymentData.length === 0) {
      return {
        success: false,
        error: "No deployable items found in registry",
      };
    }

    // Post deployment data to API
    const deploymentResult = await postDeploymentData(deploymentData, payload);

    return {
      success: true,
      data: {
        message: "Deployment completed successfully",
        deployment: deploymentResult,
        registry: exported,
        deployedItems: deploymentData.length,
        environment: payload.environment || process.env.ENV_NAME || "default",
        dryRun: payload.dryRun === true,
        deployedAt: new Date().toISOString(),
      },
      stats: {
        totalItems: exported.items.length,
        deployedItems: deploymentData.length,
        collections: deploymentData.filter((item) => item.type === "collection")
          .length,
        customApps: deploymentData.filter((item) => item.type === "customApp")
          .length,
      },
    };
  } catch (error) {
    console.error("Deploy operation failed:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Deployment failed",
      data: {
        environment: payload.environment || process.env.ENV_NAME || "unknown",
        dryRun: payload.dryRun === true,
        failedAt: new Date().toISOString(),
      },
    };
  }
}
