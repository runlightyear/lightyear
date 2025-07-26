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
        internalResponse = await handleDeploy(payload);
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
