import type {
  HandlerEvent,
  HandlerResponse,
  HandlerContext,
  DirectHandler,
  InternalResponse,
} from "./types";
import { handleHealth } from "./health";
import { handleRegistryExport, handleRegistryStats } from "./registry";
import { handleDeploy } from "./deploy";
import { handleRun } from "./run";
import {
  initializeLogCapture,
  setLogContext,
  clearLogContext,
  getLogCapture,
  stopLogCapture,
} from "../logging";

/**
 * Main handler for SDK operations
 * Returns Lambda-compatible format (statusCode + JSON body)
 */
export const handler: DirectHandler = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<HandlerResponse> => {
  console.log("Handler invoked", { event, context });

  try {
    const { operation, payload } = event;

    console.log(`Processing operation: ${operation}`, { payload });

    let internalResponse: InternalResponse;

    switch (operation) {
      case "health":
        internalResponse = await handleHealth(context);
        break;

      case "registry-export":
        internalResponse = await handleRegistryExport();
        break;

      case "registry-stats":
        internalResponse = await handleRegistryStats();
        break;

      case "deploy":
        // Check if this is a real deploy that should have log capture
        // CLI format: { operation: "deploy", deployId, logDisplayLevel }
        // SDK format: { operation: "deploy", payload: { environment, dryRun, ... } }
        const deployData = payload || {};
        const hasDeployId = event.deployId || deployData.deployId;
        const isRealDeploy =
          hasDeployId || (deployData.environment && !deployData.dryRun);

        if (isRealDeploy) {
          // Initialize log capture specifically for deploy operations
          console.log("🚀 Starting log capture for deploy operation...");
          const deployLogCapture = initializeLogCapture();

          try {
            // Set initial context with deployId (from CLI) or temp deployId
            const initialDeployId =
              event.deployId ||
              deployData.deployId ||
              `temp-deploy-${Date.now()}`;
            console.log(
              "🔗 Setting initial deploy context with deployId:",
              initialDeployId
            );
            setLogContext({ deployId: initialDeployId });

            internalResponse = await handleDeploy(payload);

            // Update context with the actual deployId from the response if different
            if (
              internalResponse.success &&
              internalResponse.data?.deployment?.deploymentId &&
              internalResponse.data.deployment.deploymentId !== initialDeployId
            ) {
              console.log(
                "🔗 Updating context with real deployId from API response:",
                internalResponse.data.deployment.deploymentId
              );
              setLogContext({
                deployId: internalResponse.data.deployment.deploymentId,
              });
            }
          } finally {
            // Ensure final log upload before stopping
            if (deployLogCapture && deployLogCapture.getLogCount() > 0) {
              console.log("📤 Final log flush before deploy completion...");
              await deployLogCapture.flush();
              // Small delay to allow upload to complete
              await new Promise((resolve) => setTimeout(resolve, 100));
            }

            // Completely stop log capture after deploy completes
            console.log("🛑 Stopping log capture for deploy operation...");
            stopLogCapture();
          }
        } else {
          // No log capture for dry runs or simple operations
          console.log("ℹ️ Skipping log capture for this deploy operation");
          internalResponse = await handleDeploy(payload);
        }
        break;

      case "run":
        // Initialize log capture specifically for run operations
        console.log("🚀 Starting log capture for run operation...");
        const logCapture = initializeLogCapture();

        try {
          // Set log context for run operations
          const runData = payload || event;
          if (runData?.runId) {
            setLogContext({ runId: runData.runId });
          }

          // For run operations, pass the entire event since action data might be at top level
          internalResponse = await handleRun(runData);
        } finally {
          // Ensure final log upload before stopping
          if (logCapture && logCapture.getLogCount() > 0) {
            console.log("📤 Final log flush before operation completion...");
            await logCapture.flush();
            // Small delay to allow upload to complete
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          // Completely stop log capture after run completes
          console.log("🛑 Stopping log capture for run operation...");
          stopLogCapture();
        }
        break;

      default:
        internalResponse = {
          success: false,
          error: `Unknown operation: ${operation}`,
          logs: [],
        };
    }

    // Convert internal response to Lambda format
    const statusCode = internalResponse.success ? 200 : 400;
    return {
      statusCode,
      body: JSON.stringify(internalResponse),
    };
  } catch (error) {
    console.error("Handler error:", error);

    const errorResponse: InternalResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      logs: [],
    };

    return {
      statusCode: 500,
      body: JSON.stringify(errorResponse),
    };
  }
};

// Export types for external use
export type {
  HandlerEvent,
  HandlerResponse,
  HandlerContext,
  DirectHandler,
  InternalResponse,
} from "./types";

// Export individual handlers for direct use
export { handleHealth } from "./health";
export { handleRegistryExport, handleRegistryStats } from "./registry";
export { handleDeploy } from "./deploy";
export { handleRun } from "./run";
