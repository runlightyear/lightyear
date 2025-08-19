import type { InternalResponse, RunHandler } from "./types";

interface RunPayload {
  actionName: string;
  runId: string;
  data?: any;
  context?: any;
  auths?: Record<string, any>;
  variables?: Record<string, string | null>;
  secrets?: Record<string, string | null>;
  webhook?: string | null;
  integration?: {
    id: string;
    name: string;
    title: string;
  } | null;
  managedUser?: {
    id: string;
    externalId: string;
    displayName: string | null;
  } | null;
}

// Use the same global declaration as in ActionBuilder
import type { RunFunc } from "../types";

declare global {
  var actionIndex: { [name: string]: RunFunc };
}

export const handleRun: RunHandler = async (
  payloadOrEvent?: RunPayload | any
): Promise<InternalResponse> => {
  console.log("\n⚡ Starting action execution...");
  console.log("Run operation called", { payload: payloadOrEvent });

  // Handle both payload structure and direct event structure
  let runData: RunPayload;

  try {
    if (!payloadOrEvent) {
      console.error("❌ Missing payload or event data");
      return {
        success: false,
        error: "Missing payload or event data",
        logs: [],
      };
    }

    // Check if this is a direct event structure (has actionName at top level)
    // or a wrapped payload structure
    if (payloadOrEvent.actionName && payloadOrEvent.runId) {
      // Direct event structure - extract run data directly
      runData = {
        actionName: payloadOrEvent.actionName,
        runId: payloadOrEvent.runId,
        data: payloadOrEvent.data,
        context: payloadOrEvent.context,
        auths: payloadOrEvent.auths,
        variables: payloadOrEvent.variables,
        secrets: payloadOrEvent.secrets,
        webhook: payloadOrEvent.webhook,
        integration: payloadOrEvent.integration,
        managedUser: payloadOrEvent.managedUser,
      };
      console.log("📦 Using direct event structure for run data");
    } else {
      // Assume it's already a proper RunPayload structure
      runData = payloadOrEvent as RunPayload;
      console.log("📦 Using payload structure for run data");
    }

    const {
      actionName,
      runId,
      data,
      context,
      auths,
      variables,
      secrets,
      webhook,
      integration,
      managedUser,
    } = runData;

    if (!actionName) {
      console.error("❌ Missing actionName");
      return {
        success: false,
        error: "Missing actionName",
        logs: [],
      };
    }

    if (!runId) {
      console.error("❌ Missing runId");
      return {
        success: false,
        error: "Missing runId",
        logs: [],
      };
    }

    console.log(`📍 Action: ${actionName}`);
    console.log(`🆔 Run ID: ${runId}`);
    console.log(
      `📊 Data keys: ${data ? Object.keys(data).join(", ") : "none"}`
    );

    // Check if global action index exists and has the action
    if (typeof globalThis === "undefined" || !globalThis.actionIndex) {
      console.error("❌ Action index not initialized");
      return {
        success: false,
        error: "Action index not initialized",
        logs: [],
      };
    }

    console.log(
      `🔍 Available actions: ${Object.keys(globalThis.actionIndex).join(", ")}`
    );

    const runFunction = globalThis.actionIndex[actionName];
    if (!runFunction) {
      console.error(`❌ Unknown action: ${actionName}`);
      console.error(
        `Known actions: ${Object.keys(globalThis.actionIndex).join(", ")}`
      );
      return {
        success: false,
        error: `Unknown action: ${actionName}`,
        logs: [],
      };
    }

    console.log(`🚀 Executing action function...`);

    // If managedUser is not provided, fetch run function props from the platform
    let effectiveAuths = auths || {};
    let effectiveVariables = variables || {};
    let effectiveSecrets = secrets || {};
    let effectiveWebhook = webhook || null;
    let effectiveIntegration = integration || null;
    let effectiveManagedUser = managedUser || null;

    try {
      if (!effectiveManagedUser && runId) {
        const { getRunFuncProps } = await import("../platform/run.js");
        const fetched = await getRunFuncProps(runId);
        if (fetched) {
          effectiveAuths = fetched.auths || effectiveAuths;
          effectiveVariables = fetched.variables || effectiveVariables;
          effectiveSecrets = fetched.secrets || effectiveSecrets;
          effectiveWebhook = fetched.webhook || effectiveWebhook;
          effectiveIntegration = fetched.integration || effectiveIntegration;
          effectiveManagedUser = fetched.managedUser || effectiveManagedUser;
          if (effectiveManagedUser?.externalId) {
            // Populate log context to include managed user for subsequent calls
            try {
              const { getLogCapture } = await import("../logging/index.js");
              getLogCapture()?.setContext({
                managedUserId: effectiveManagedUser.externalId,
                managedUserExternalId: effectiveManagedUser.externalId,
                managedUserDisplayName:
                  effectiveManagedUser.displayName ?? null,
                integrationName: effectiveIntegration?.name,
              } as any);
            } catch {}
          }
        }
      }
    } catch (e) {
      console.debug("Optional run props fetch failed:", e);
    }

    // Execute the action function with the provided data
    const runProps = {
      data: data || null,
      context: context || null,
      auths: effectiveAuths,
      variables: effectiveVariables,
      secrets: effectiveSecrets,
      webhook: effectiveWebhook,
      integration: effectiveIntegration,
      managedUser: effectiveManagedUser,
    };

    console.log(
      `📝 Run function props: ${JSON.stringify(
        {
          ...runProps,
          secrets: runProps.secrets ? Object.keys(runProps.secrets) : {},
          auths: runProps.auths ? Object.keys(runProps.auths) : {},
        },
        null,
        2
      )}`
    );

    await runFunction(runProps);

    console.log("✅ Action executed successfully!");

    return {
      success: true,
      data: {
        message: "Action executed successfully",
        actionName,
        runId,
        executedAt: new Date().toISOString(),
      },
      logs: [],
    };
  } catch (error) {
    console.error("💥 Action execution failed!");
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

    const errorMessage =
      error instanceof Error
        ? error.message
        : `Action execution failed: ${String(error)}`;

    return {
      success: false,
      error: errorMessage,
      data: {
        actionName: payloadOrEvent?.actionName || "unknown",
        runId: payloadOrEvent?.runId || "unknown",
        failedAt: new Date().toISOString(),
        errorType:
          error instanceof Error ? error.constructor.name : typeof error,
        errorName: error instanceof Error ? error.name : "Unknown",
      },
      logs: [],
    };
  }
};
