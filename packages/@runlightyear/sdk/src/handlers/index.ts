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
  handleGetAuthRequestUrl,
  handleRequestAccessToken,
  handleRefreshAccessToken,
} from "./oauth";
import {
  initializeLogCapture,
  setLogContext,
  clearLogContext,
  getLogCapture,
  stopLogCapture,
  LogEntry,
  getRunCancellationPromise,
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
          // Also set additional execution context commonly needed by SDK internals
          try {
            const integrationName = runData?.integration?.name;
            const managedUser = runData?.managedUser;
            const syncId = runData?.context?.syncId;
            const extraContext: any = {};
            if (integrationName) extraContext.integrationName = integrationName;
            try {
              const appInfo = (runData as any)?.integration?.app;
              if (appInfo?.type === "builtin" && appInfo?.name) {
                extraContext.appName = appInfo.name;
              } else if (appInfo?.type === "custom" && appInfo?.name) {
                extraContext.customAppName = appInfo.name;
              }
              // Fallback: derive app/customApp from auths keys if present
              const authKeys = runData?.auths ? Object.keys(runData.auths) : [];
              if (
                !extraContext.appName &&
                !extraContext.customAppName &&
                authKeys.length === 1
              ) {
                // Prefer treating single auth as custom app name
                extraContext.customAppName = authKeys[0];
              }
            } catch {}
            if (managedUser?.externalId) {
              extraContext.managedUserId = managedUser.externalId;
              extraContext.managedUserExternalId = managedUser.externalId;
              extraContext.managedUserDisplayName =
                managedUser.displayName ?? null;
            }
            if (syncId) {
              // Custom key consumed by SyncConnector
              extraContext.syncId = syncId;
            }
            if (Object.keys(extraContext).length > 0) {
              getLogCapture()?.setContext(extraContext);
            }
          } catch (e) {
            console.debug("Optional context enrichment failed:", e);
          }

          // For run operations, pass the entire event since action data might be at top level
          // Race execution with cancellation (triggered when log upload gets 410)
          const runPromise = handleRun(runData);
          const canceledTag = { __canceled: true } as const;
          const cancelPromise = getRunCancellationPromise().then(
            () => canceledTag
          );
          const raceResult = (await Promise.race([
            runPromise,
            cancelPromise,
          ])) as InternalResponse | typeof canceledTag;
          if ((raceResult as any).__canceled) {
            console.warn("🛑 Run canceled by platform; returning early.");
            internalResponse = {
              success: false,
              error: "Run canceled",
              logs: [],
            };
          } else {
            internalResponse = raceResult as InternalResponse;
          }
          // If action indicated SKIPPED, convert to appropriate success response with 202 later
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

      case "getAuthRequestUrl":
        // Initialize log capture for OAuth operations
        console.log("🚀 Starting log capture for OAuth getAuthRequestUrl...");
        const getAuthLogCapture = initializeLogCapture();

        try {
          internalResponse = await handleGetAuthRequestUrl({
            customAppName: event.customAppName || "",
            authName: event.authName || "",
            oauthConfigData: event.payload?.oauthConfigData,
            authData: event.payload?.authData,
            oauthConnector: event.payload?.oauthConnector,
          });

          // Add captured logs to the response
          if (getAuthLogCapture) {
            const capturedLogs = getAuthLogCapture
              .getLogs()
              .map(
                (log: LogEntry) => `[${log.level.toUpperCase()}] ${log.message}`
              );
            internalResponse.logs = [
              ...(internalResponse.logs || []),
              ...capturedLogs,
            ];
          }
        } finally {
          stopLogCapture();
        }
        break;

      case "requestAccessToken":
        // Initialize log capture for OAuth operations
        console.log("🚀 Starting log capture for OAuth requestAccessToken...");
        const requestTokenLogCapture = initializeLogCapture();

        try {
          internalResponse = await handleRequestAccessToken({
            customAppName: event.customAppName || "",
            authName: event.authName || "",
            code: event.code || "",
            oauthConfigData: event.payload?.oauthConfigData,
            authData: event.payload?.authData,
            oauthConnector: event.payload?.oauthConnector,
          });

          // Add captured logs to the response
          if (requestTokenLogCapture) {
            const capturedLogs = requestTokenLogCapture
              .getLogs()
              .map(
                (log: LogEntry) => `[${log.level.toUpperCase()}] ${log.message}`
              );
            internalResponse.logs = [
              ...(internalResponse.logs || []),
              ...capturedLogs,
            ];
          }
        } finally {
          stopLogCapture();
        }
        break;

      case "refreshAccessToken":
        // Initialize log capture for OAuth operations
        console.log("🚀 Starting log capture for OAuth refreshAccessToken...");
        const refreshTokenLogCapture = initializeLogCapture();

        try {
          internalResponse = await handleRefreshAccessToken({
            customAppName: event.customAppName || "",
            authName: event.authName || "",
            oauthConfigData: event.payload?.oauthConfigData,
            authData: event.payload?.authData,
            oauthConnector: event.payload?.oauthConnector,
          });

          // Add captured logs to the response
          if (refreshTokenLogCapture) {
            const capturedLogs = refreshTokenLogCapture
              .getLogs()
              .map(
                (log: LogEntry) => `[${log.level.toUpperCase()}] ${log.message}`
              );
            internalResponse.logs = [
              ...(internalResponse.logs || []),
              ...capturedLogs,
            ];
          }
        } finally {
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
    // Map "Skipped" and "Rerun" to 202 to align with Lightyear behavior
    const isSkipped =
      internalResponse.success &&
      (internalResponse.data?.message === "Skipped" ||
        internalResponse.data?.status === "SKIPPED");
    const isRerun =
      internalResponse.success &&
      (internalResponse.data?.message === "Rerun" ||
        internalResponse.data?.status === "RERUN");
    const statusCode =
      isSkipped || isRerun ? 202 : internalResponse.success ? 200 : 400;

    // For OAuth operations, format response to match lightyear package format
    // CLI expects { authRequestUrl, message, logs } at top level
    if (
      operation === "getAuthRequestUrl" &&
      internalResponse.success &&
      internalResponse.data?.authRequestUrl
    ) {
      return {
        statusCode,
        body: JSON.stringify({
          message: "Success",
          logs: internalResponse.logs || [],
          authRequestUrl: internalResponse.data.authRequestUrl,
        }),
      };
    }

    if (operation === "requestAccessToken" && internalResponse.success) {
      return {
        statusCode,
        body: JSON.stringify({
          message: "Success",
          logs: internalResponse.logs || [],
          ...(internalResponse.data || {}),
        }),
      };
    }

    if (operation === "refreshAccessToken" && internalResponse.success) {
      return {
        statusCode,
        body: JSON.stringify({
          message: "Success",
          logs: internalResponse.logs || [],
          ...(internalResponse.data || {}),
        }),
      };
    }

    // For OAuth errors, format to match lightyear error format
    if (
      (operation === "getAuthRequestUrl" ||
        operation === "requestAccessToken" ||
        operation === "refreshAccessToken") &&
      !internalResponse.success
    ) {
      return {
        statusCode: statusCode >= 400 ? statusCode : 500,
        body: JSON.stringify({
          message: internalResponse.error || "Unknown error",
          logs: internalResponse.logs || [],
        }),
      };
    }

    // Default format for other operations
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
export {
  handleGetAuthRequestUrl,
  handleRequestAccessToken,
  handleRefreshAccessToken,
} from "./oauth";
