import type {
  HandlerEvent,
  HandlerResponse,
  HandlerContext,
  DirectHandler,
} from "./types";
import { handleHealth } from "./health";
import { handleRegistryExport, handleRegistryStats } from "./registry";
import { handleDeploy } from "./deploy";

/**
 * Main handler for SDK operations
 * Supports direct invocation for VM, Docker, serverless functions, etc.
 */
export const handler: DirectHandler = async (
  event: HandlerEvent,
  context: HandlerContext
): Promise<HandlerResponse> => {
  console.log("Handler invoked", { event, context });

  try {
    const { operation, payload } = event;

    console.log(`Processing operation: ${operation}`, { payload });

    switch (operation) {
      case "health":
        return handleHealth(context);

      case "registry-export":
        return handleRegistryExport();

      case "registry-stats":
        return handleRegistryStats();

      case "deploy":
        return handleDeploy(payload);

      default:
        return {
          success: false,
          error: `Unknown operation: ${operation}`,
        };
    }
  } catch (error) {
    console.error("Handler error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Export types for external use
export type {
  HandlerEvent,
  HandlerResponse,
  HandlerContext,
  DirectHandler,
} from "./types";

// Export individual handlers for direct use
export { handleHealth } from "./health";
export { handleRegistryExport, handleRegistryStats } from "./registry";
export { handleDeploy } from "./deploy";
