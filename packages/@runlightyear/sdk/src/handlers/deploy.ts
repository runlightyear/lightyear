import { exportRegistry } from "../registry";
import type { InternalResponse, DeployHandler } from "./types";

interface DeployPayload {
  environment?: string;
  dryRun?: boolean;
  baseUrl?: string;
  apiKey?: string;
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

interface IntegrationProps {
  name: string;
  title: string;
  description?: string;
  app?: string; // For built-in apps
  customApp?: string; // For custom apps
  actions?: string[]; // Array of action names
  webhooks?: string[]; // Array of webhook names
}

interface ActionProps {
  name: string;
  title: string;
  description?: string;
  variables?: Array<string | { name: string; description?: string }>;
  secrets?: Array<string | { name: string; description?: string }>;
}

interface DeploymentItem {
  type: "collection" | "customApp" | "integration" | "action";
  collectionProps?: CollectionProps;
  customAppProps?: CustomAppProps;
  integrationProps?: IntegrationProps;
  actionProps?: ActionProps;
}

function transformRegistryToDeploymentSchema(
  registryData: any
): DeploymentItem[] {
  console.log("🔄 Starting registry transformation...");
  const deploymentItems: DeploymentItem[] = [];

  // Safety check for registry data
  if (
    !registryData ||
    !registryData.items ||
    !Array.isArray(registryData.items)
  ) {
    console.warn(
      "⚠️ Invalid registry data provided to transformRegistryToDeploymentSchema"
    );
    console.warn("Registry data structure:", registryData);
    return deploymentItems;
  }

  console.log(`📋 Processing ${registryData.items.length} registry items...`);

  for (const [index, item] of registryData.items.entries()) {
    console.log(
      `\n🔍 Processing item ${index + 1}/${registryData.items.length}:`
    );
    console.log(`   Type: ${item?.type || "unknown"}`);
    console.log(
      `   Name: ${
        item?.collection?.name ||
        item?.customApp?.name ||
        item?.model?.name ||
        "unnamed"
      }`
    );

    // Safety check for item structure
    if (!item || typeof item !== "object" || !item.type) {
      console.warn("⚠️ Skipping invalid registry item:", item);
      continue;
    }

    switch (item.type) {
      case "collection":
        console.log("   📚 Processing collection...");

        if (!item.collection || typeof item.collection !== "object") {
          console.warn("   ❌ Skipping collection with invalid data:", item);
          continue;
        }

        const collectionItem = {
          type: "collection" as const,
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
        };

        console.log(
          `   ✅ Collection processed: ${collectionItem.collectionProps.name}`
        );
        console.log(
          `   📊 Models in collection: ${collectionItem.collectionProps.models.length}`
        );
        deploymentItems.push(collectionItem);
        break;

      case "customApp":
        console.log("   🔧 Processing custom app...");

        if (!item.customApp || typeof item.customApp !== "object") {
          console.warn("   ❌ Skipping customApp with invalid data:", item);
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

        const customAppItem = {
          type: "customApp" as const,
          customAppProps: {
            name: item.customApp.name || "unnamed-custom-app",
            title:
              item.customApp.title ||
              item.customApp.name ||
              "Unnamed Custom App",
            authType: item.customApp.type || "OAUTH2",
            hasOAuth: item.customApp.oauthConnector ? true : undefined,
            variables: variables.length > 0 ? variables : undefined,
            secrets: secrets.length > 0 ? secrets : undefined,
          },
        };

        console.log(
          `   ✅ Custom app processed: ${customAppItem.customAppProps.name}`
        );
        console.log(
          `   🔑 Auth type: ${customAppItem.customAppProps.authType}`
        );
        console.log(
          `   🔐 Has OAuth: ${customAppItem.customAppProps.hasOAuth || false}`
        );
        deploymentItems.push(customAppItem);
        break;

      case "integration":
        console.log("   🔗 Processing integration...");

        if (!item.integration || typeof item.integration !== "object") {
          console.warn("   ❌ Skipping integration with invalid data:", item);
          continue;
        }

        // Transform SDK integration format to API format
        const integration = item.integration;
        const integrationProps: IntegrationProps = {
          name: integration.name || "unnamed-integration",
          title: integration.title || integration.name || "Unnamed Integration",
          description: integration.description,
        };

        // Handle app vs customApp based on integration.app.type
        if (integration.app) {
          if (integration.app.type === "builtin") {
            integrationProps.app = integration.app.name;
          } else if (integration.app.type === "custom") {
            integrationProps.customApp = integration.app.name;
          }
        }

        // Add actions if they exist
        if (
          integration.actions &&
          Object.keys(integration.actions).length > 0
        ) {
          integrationProps.actions = Object.keys(integration.actions);
        }

        // Note: Collections are not part of the API integration schema
        // They should be deployed separately as collection items
        // Webhooks will be added when we implement webhook builders

        const integrationItem = {
          type: "integration" as const,
          integrationProps,
        };

        console.log(
          `   ✅ Integration processed: ${integrationItem.integrationProps.name}`
        );
        console.log(
          `   🔧 App: ${
            integrationProps.app || integrationProps.customApp || "none"
          }`
        );
        console.log(`   📱 App type: ${integration.app?.type || "unknown"}`);
        console.log(
          `   ⚡ Actions: ${integrationProps.actions?.join(", ") || "none"}`
        );
        deploymentItems.push(integrationItem);
        break;

      case "action":
        console.log("   ⚡ Processing action...");

        if (!item.action || typeof item.action !== "object") {
          console.warn("   ❌ Skipping action with invalid data:", item);
          continue;
        }

        const actionVariables =
          item.action.variables
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

        const actionSecrets =
          item.action.secrets
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

        const actionItem = {
          type: "action" as const,
          actionProps: {
            name: item.action.name || "unnamed-action",
            title: item.action.title || item.action.name || "Unnamed Action",
            description: item.action.description,
            variables: actionVariables.length > 0 ? actionVariables : undefined,
            secrets: actionSecrets.length > 0 ? actionSecrets : undefined,
          },
        };

        console.log(`   ✅ Action processed: ${actionItem.actionProps.name}`);
        deploymentItems.push(actionItem);
        break;

      case "model":
        console.log(
          "   📄 Skipping standalone model (not deployable in this schema)"
        );
        console.log(`   Model name: ${item.model?.name || "unnamed"}`);
        break;

      default:
        console.warn(`   ❓ Unknown registry item type: ${item.type}`);
    }
  }

  console.log(
    `\n🎯 Transformation complete: ${deploymentItems.length} deployable items created`
  );
  console.log("📦 Deployable items summary:");
  const collections = deploymentItems.filter(
    (item) => item.type === "collection"
  ).length;
  const customApps = deploymentItems.filter(
    (item) => item.type === "customApp"
  ).length;
  const integrations = deploymentItems.filter(
    (item) => item.type === "integration"
  ).length;
  const actions = deploymentItems.filter(
    (item) => item.type === "action"
  ).length;
  console.log(`   - Collections: ${collections}`);
  console.log(`   - Custom Apps: ${customApps}`);
  console.log(`   - Integrations: ${integrations}`);
  console.log(`   - Actions: ${actions}`);

  return deploymentItems;
}

async function postDeploymentData(
  deploymentData: DeploymentItem[],
  payload: DeployPayload
): Promise<any> {
  console.log("\n🚀 Starting deployment API call...");
  console.log("📋 Deployment payload configuration:");
  console.log(`   Environment: ${payload.environment || "(using default)"}`);
  console.log(`   Dry run: ${payload.dryRun || false}`);
  console.log(`   Base URL: ${payload.baseUrl || "(from env/default)"}`);

  const baseUrl =
    payload.baseUrl || process.env.BASE_URL || "https://app.runlightyear.com";
  // Allow payload override, otherwise use Lightyear's standard getEnvName logic
  const envName = payload.environment || process.env.ENV_NAME || "dev";

  console.log("\n🔧 Configuration resolved:");
  console.log(`   Final base URL: ${baseUrl}`);
  console.log(`   Final environment: ${envName}`);
  console.log(
    `   BASE_URL source: ${
      payload.baseUrl
        ? "payload"
        : process.env.BASE_URL
        ? "environment"
        : "default (https://app.runlightyear.com)"
    }`
  );

  // BASE_URL should always be available now with the default fallback

  const url = `${baseUrl}/api/v1/envs/${envName}/deploy`;
  console.log(`🎯 Target deployment URL: ${url}`);

  try {
    console.log("📝 Serializing deployment data...");
    const deploymentDataJson = JSON.stringify(deploymentData, null, 2);
    console.log("✅ Deployment data serialized successfully");
    console.log(
      `📏 Serialized data size: ${deploymentDataJson.length} characters`
    );
    console.log(`Deployment data:`, deploymentDataJson);
  } catch (jsonError) {
    console.error("❌ Error serializing deployment data:", jsonError);
    console.error(
      "🔍 Raw deployment data that failed serialization:",
      deploymentData
    );
    throw new Error(
      `Failed to serialize deployment data: ${
        jsonError instanceof Error ? jsonError.message : "Unknown error"
      }`
    );
  }

  if (payload.dryRun) {
    console.log("🏃 DRY RUN mode - skipping actual HTTP request");
    console.log(`📍 Would POST to: ${url}`);
    return { dryRun: true, url, data: deploymentData };
  }

  try {
    console.log("🌐 Making REAL HTTP POST request...");
    console.log(`📊 Sending ${deploymentData.length} items to deployment API`);
    console.log(`📍 Request URL: ${url}`);
    console.log(`📋 Request Method: POST`);

    // Get API key for authentication
    const apiKey =
      payload.apiKey || process.env.LIGHTYEAR_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.error("❌ No API key provided");
      console.error("💡 API key can be provided via:");
      console.error("   - payload.apiKey parameter");
      console.error("   - LIGHTYEAR_API_KEY environment variable");
      console.error("   - API_KEY environment variable");
      throw new Error(
        "Missing API key. Provide via payload.apiKey or LIGHTYEAR_API_KEY/API_KEY environment variable."
      );
    }

    console.log(
      "🔐 API key source:",
      payload.apiKey
        ? "payload"
        : process.env.LIGHTYEAR_API_KEY
        ? "LIGHTYEAR_API_KEY env"
        : "API_KEY env"
    );

    // Prepare request headers
    const requestHeaders = {
      "Content-Type": "application/json",
      "User-Agent": "@runlightyear/sdk",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      "X-SDK-Version": "0.1.0",
      "X-Environment": envName,
      "X-Request-ID": `req_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    };
    console.log("📨 Request Headers:");
    Object.entries(requestHeaders).forEach(([key, value]) => {
      // Redact the Authorization header for security
      const displayValue =
        key === "Authorization" ? "Bearer [REDACTED]" : value;
      console.log(`   ${key}: ${displayValue}`);
    });

    // Prepare request body
    const requestBody = JSON.stringify(deploymentData);
    const requestBodyPreview = requestBody.substring(0, 200);
    console.log(
      `📤 Request Body Preview (first 200 chars): ${requestBodyPreview}${
        requestBody.length > 200 ? "..." : ""
      }`
    );
    console.log(`📏 Full request body size: ${requestBody.length} bytes`);

    const startTime = Date.now();
    console.log(`⏰ Starting HTTP request at: ${new Date().toISOString()}`);

    // Make the ACTUAL HTTP request using fetch with retries for transient errors
    const maxAttempts = 5; // total attempts including first
    let attempt = 1;
    let response: Response | null = null;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        response = await fetch(url, {
          method: "POST",
          headers: requestHeaders,
          body: requestBody,
        });

        if (!response.ok) {
          const retriable =
            response.status === 429 ||
            (response.status >= 500 && response.status < 600);
          if (retriable && attempt < maxAttempts) {
            const waitMs =
              Math.pow(2, attempt) * 1000 + Math.floor(Math.random() * 5000);
            console.warn(
              `Transient deploy API error ${response.status}. Retrying in ${(
                waitMs / 1000
              ).toFixed(2)}s (attempt ${attempt}/${maxAttempts})`
            );
            await new Promise((r) => setTimeout(r, waitMs));
            attempt += 1;
            continue;
          }
        }
        break;
      } catch (err: any) {
        const isNetworkError = err && !("status" in (err as any));
        if (isNetworkError && attempt < maxAttempts) {
          const waitMs =
            Math.pow(2, attempt) * 1000 + Math.floor(Math.random() * 5000);
          console.warn(
            `Network error calling deploy API. Retrying in ${(
              waitMs / 1000
            ).toFixed(2)}s (attempt ${attempt}/${maxAttempts})`
          );
          await new Promise((r) => setTimeout(r, waitMs));
          attempt += 1;
          continue;
        }
        throw err;
      }
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`⏰ HTTP request completed in: ${duration}ms`);
    console.log(
      `📈 Response Status: ${response.status} ${response.statusText}`
    );

    // Log actual response headers
    console.log("📥 Response Headers:");
    response.headers.forEach((value, key) => {
      console.log(`   ${key}: ${value}`);
    });

    // Get response body
    const responseText = await response.text();
    console.log(`📏 Response body size: ${responseText.length} bytes`);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log("📦 Response Body (parsed JSON):");
      console.log(JSON.stringify(responseData, null, 2));
    } catch (parseError) {
      console.log("📦 Response Body (raw text - not valid JSON):");
      console.log(responseText);
      console.log("⚠️ Failed to parse response as JSON:", parseError);
    }

    // Check if request was successful
    if (!response.ok) {
      console.error(
        `❌ HTTP request failed with status: ${response.status} ${response.statusText}`
      );
      throw new Error(
        `HTTP ${response.status}: ${response.statusText}${
          responseData?.error ? ` - ${responseData.error}` : ""
        }`
      );
    }

    console.log("✅ HTTP POST request completed successfully");

    // Log deployment summary if we have structured data
    if (responseData && typeof responseData === "object") {
      console.log("🎯 Deployment Summary:");
      if (responseData.deploymentId)
        console.log(`   ✅ Deployment ID: ${responseData.deploymentId}`);
      if (responseData.itemsDeployed)
        console.log(`   📊 Items Deployed: ${responseData.itemsDeployed}`);
      if (responseData.environment)
        console.log(`   🌍 Environment: ${responseData.environment}`);
      if (responseData.processing?.totalMs)
        console.log(
          `   ⏱️ Processing Time: ${responseData.processing.totalMs}ms`
        );
      if (responseData.summary?.totalBytes)
        console.log(
          `   📏 Payload Size: ${responseData.summary.totalBytes} bytes`
        );
    }

    return (
      responseData || {
        status: "success",
        message: "Deployment request sent successfully",
        httpStatus: response.status,
        responseSize: responseText.length,
      }
    );
  } catch (error) {
    console.error("❌ HTTP POST request failed:", error);
    if (error instanceof Error) {
      console.error(`💥 Error name: ${error.name}`);
      console.error(`📝 Error message: ${error.message}`);
      console.error(`🔍 Error stack: ${error.stack}`);
    } else {
      console.error(`🤷 Non-Error object thrown: ${typeof error}`, error);
    }
    throw error;
  }
}

export const handleDeploy: DeployHandler = async (
  payload?: DeployPayload
): Promise<InternalResponse> => {
  // Use empty object as default if no payload provided
  const deployPayload: DeployPayload = payload || {};

  console.log("\n🚀 Starting deployment process...");
  console.log("Deploy operation called", { payload: deployPayload });

  try {
    console.log("\n📋 Step 1: Exporting registry...");
    const exported = exportRegistry();

    console.log("Exported registry:", exported);
    console.log(`📊 Registry stats: ${exported.items.length} total items`);

    console.log("\n🔄 Step 2: Transforming data...");
    const deploymentData = transformRegistryToDeploymentSchema(exported);

    console.log("Deployment data:", deploymentData);

    if (deploymentData.length === 0) {
      console.log("ℹ️ No deployable items found in registry");
      console.log("💡 Note: Only collections and custom apps are deployable");
      console.log(
        "💡 Standalone models must be part of a collection to be deployed"
      );
      console.log(
        "📤 Proceeding with empty deployment to clear/deactivate previous deployments"
      );
    }

    if (deploymentData.length === 0) {
      // Treat no deployable items as an error per tests
      return {
        success: false,
        error: "No deployable items found in registry",
        data: {
          environment:
            deployPayload.environment || process.env.ENV_NAME || "default",
          dryRun: deployPayload.dryRun === true,
          deployedAt: new Date().toISOString(),
        },
        logs: [],
      };
    }

    const deploymentMessage = `\n🎯 Step 3: Deploying ${deploymentData.length} items...`;
    console.log(deploymentMessage);
    const deploymentResult = await postDeploymentData(
      deploymentData,
      deployPayload
    );

    console.log("✅ Deployment completed successfully!");

    return {
      success: true,
      data: {
        message: `Deployment completed successfully with ${deploymentData.length} items`,
        deployment: deploymentResult,
        registry: exported,
        deployedItems: deploymentData.length,
        empty: false,
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
        integrations: deploymentData.filter(
          (item) => item.type === "integration"
        ).length,
        actions: deploymentData.filter((item) => item.type === "action").length,
      },
      logs: [],
    };
  } catch (error) {
    console.error("\n💥 Deploy operation failed!");
    console.error("❌ Error details:", error);

    // Enhanced error logging
    if (error instanceof Error) {
      console.error(`🏷️ Error type: ${error.constructor.name}`);
      console.error(`📝 Error name: ${error.name}`);
      console.error(`💬 Error message: ${error.message}`);
      console.error(`🔍 Error stack:`);
      console.error(error.stack);
    } else {
      console.error(`🤷 Non-Error object thrown:`);
      console.error(`   Type: ${typeof error}`);
      console.error(`   Value:`, error);
      console.error(`   String representation: ${String(error)}`);
    }

    // Log current state for debugging
    console.error("\n🔍 Debug information:");
    console.error(
      `📋 Deployment payload: ${JSON.stringify(deployPayload, null, 2)}`
    );
    console.error(`🌍 Environment variables:`);
    console.error(
      `   BASE_URL: ${
        process.env.BASE_URL || "(using default: https://app.runlightyear.com)"
      }`
    );
    console.error(
      `   ENV_NAME: ${process.env.ENV_NAME || "(using default: default)"}`
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : `Deployment failed: ${String(error)}`;

    return {
      success: false,
      error: errorMessage,
      data: {
        environment:
          deployPayload.environment || process.env.ENV_NAME || "default",
        dryRun: deployPayload.dryRun === true,
        failedAt: new Date().toISOString(),
        errorType:
          error instanceof Error ? error.constructor.name : typeof error,
        errorName: error instanceof Error ? error.name : "Unknown",
      },
      logs: [],
    };
  }
};
