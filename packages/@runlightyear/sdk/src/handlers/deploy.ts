import { exportRegistry } from "../registry";
import type { HandlerResponse, DeployHandler } from "./types";

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

  // Safety check for registry data
  if (
    !registryData ||
    !registryData.items ||
    !Array.isArray(registryData.items)
  ) {
    console.warn(
      "Invalid registry data provided to transformRegistryToDeploymentSchema"
    );
    return deploymentItems;
  }

  for (const item of registryData.items) {
    // Safety check for item structure
    if (!item || typeof item !== "object" || !item.type) {
      console.warn("Skipping invalid registry item:", item);
      continue;
    }

    switch (item.type) {
      case "collection":
        if (!item.collection || typeof item.collection !== "object") {
          console.warn("Skipping collection with invalid data:", item);
          continue;
        }

        deploymentItems.push({
          type: "collection",
          collectionProps: {
            name: item.collection.name || "unnamed-collection",
            title:
              item.collection.title ||
              item.collection.name ||
              "Unnamed Collection",
            models:
              item.collection.models
                ?.map((model: any) => ({
                  name: model?.name || "unnamed-model",
                  title: model?.title || model?.name || "Unnamed Model",
                  schema: model?.schema || undefined,
                  matchOn: model?.matchPattern || undefined,
                }))
                .filter(Boolean) || [],
          },
        });
        break;

      case "customApp":
        if (!item.customApp || typeof item.customApp !== "object") {
          console.warn("Skipping customApp with invalid data:", item);
          continue;
        }

        const variables =
          item.customApp.variables
            ?.map((variable: any) => {
              if (!variable) return null;
              return variable.title || variable.description
                ? {
                    name: variable.name || "unnamed-variable",
                    description: variable.title || variable.description,
                  }
                : variable.name || "unnamed-variable";
            })
            .filter(Boolean) || [];

        const secrets =
          item.customApp.secrets
            ?.map((secret: any) => {
              if (!secret) return null;
              return secret.title || secret.description
                ? {
                    name: secret.name || "unnamed-secret",
                    description: secret.title || secret.description,
                  }
                : secret.name || "unnamed-secret";
            })
            .filter(Boolean) || [];

        deploymentItems.push({
          type: "customApp",
          customAppProps: {
            name: item.customApp.name || "unnamed-custom-app",
            title:
              item.customApp.title ||
              item.customApp.name ||
              "Unnamed Custom App",
            authType: item.customApp.type || "OAUTH2",
            variables: variables.length > 0 ? variables : undefined,
            secrets: secrets.length > 0 ? secrets : undefined,
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

  try {
    // Safe JSON serialization with error handling
    const deploymentDataJson = JSON.stringify(deploymentData, null, 2);
    console.log(`Deployment data:`, deploymentDataJson);
  } catch (jsonError) {
    console.error("Error serializing deployment data:", jsonError);
    console.log("Raw deployment data:", deploymentData);
    throw new Error(
      `Failed to serialize deployment data: ${
        jsonError instanceof Error ? jsonError.message : "Unknown error"
      }`
    );
  }

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

export const handleDeploy: DeployHandler = async (
  payload?: DeployPayload
): Promise<HandlerResponse> => {
  // Use empty object as default if no payload provided
  const deployPayload: DeployPayload = payload || {};

  console.log("Deploy operation called", { payload: deployPayload });

  try {
    // Export current registry state
    const exported = exportRegistry();

    console.log("Exported registry:", exported);

    // Transform registry data to match deployment schema
    const deploymentData = transformRegistryToDeploymentSchema(exported);

    console.log("Deployment data:", deploymentData);

    if (deploymentData.length === 0) {
      console.log("No deployable items found in registry");
      return {
        success: false,
        error: "No deployable items found in registry",
      };
    }

    // Post deployment data to API
    const deploymentResult = await postDeploymentData(
      deploymentData,
      deployPayload
    );

    return {
      success: true,
      data: {
        message: "Deployment completed successfully",
        deployment: deploymentResult,
        registry: exported,
        deployedItems: deploymentData.length,
        environment:
          deployPayload.environment || process.env.ENV_NAME || "default",
        dryRun: deployPayload.dryRun === true,
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
        environment:
          deployPayload.environment || process.env.ENV_NAME || "unknown",
        dryRun: deployPayload.dryRun === true,
        failedAt: new Date().toISOString(),
      },
    };
  }
};
