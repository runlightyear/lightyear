import { defineAction, handleRun, exportRegistry } from "../src";

/**
 * Example: Action Execution with Lightyear SDK
 *
 * This example demonstrates how to define actions with run functions
 * and execute them using the handleRun handler.
 */

console.log("⚡ Action Execution Example\n");

// Example 1: Simple action with basic data processing
const dataProcessor = defineAction("process-data")
  .withTitle("Data Processor")
  .withDescription("Processes incoming data and logs results")
  .withRun(async ({ data, variables, secrets }) => {
    console.log("📊 Processing data:", data);
    console.log("⚙️ Variables:", variables);
    console.log("🔐 Secrets keys:", Object.keys(secrets || {}));

    // Simulate some data processing
    if (data?.items) {
      console.log(`✅ Processed ${data.items.length} items`);
    } else {
      console.log("ℹ️ No items to process");
    }
  })
  .addVariable("batch_size", {
    title: "Batch Size",
    description: "Number of items to process at once",
    defaultValue: "10",
    required: false,
  })
  .addSecret("api_key", {
    title: "API Key",
    description: "Secret key for external API",
    required: true,
  })
  .deploy();

console.log("✅ Defined action:", dataProcessor.name);

// Example 2: Action with run function and context
const dataSyncer = defineAction("data-sync")
  .withTitle("Data Synchronization")
  .withDescription("Synchronizes data from external sources")
  .withRun(async ({ data, variables, integration, managedUser }) => {
    console.log("🔄 Syncing data...");
    console.log("📍 Integration:", integration?.name);
    console.log("👤 User:", managedUser?.displayName);
    console.log("⚙️ Variables:", Object.keys(variables || {}));

    if (data?.items) {
      console.log(`📚 Syncing ${data.items.length} items`);
      for (const item of data.items) {
        console.log(
          `  - ${item.name}: ${item.description || "No description"}`
        );
      }
    }

    console.log("✅ Data sync completed!");
  })
  .addVariable("sync_mode", {
    title: "Sync Mode",
    description: "How to sync the data",
    defaultValue: "incremental",
    required: false,
  })
  .deploy();

console.log("✅ Defined action:", dataSyncer.name);

// Example 3: Action that can fail (for error handling demo)
const flakyAction = defineAction("flaky-operation")
  .withTitle("Flaky Operation")
  .withDescription("An operation that sometimes fails")
  .withRun(async ({ data }) => {
    console.log("🎲 Running flaky operation...");

    if (data?.shouldFail) {
      throw new Error("Operation failed as requested!");
    }

    console.log("✅ Operation completed successfully!");
  })
  .deploy();

console.log("✅ Defined action:", flakyAction.name);

// Async function to execute the actions
async function runActionExamples() {
  console.log("\n🚀 Executing Actions...\n");

  // Execute the data processor action
  console.log("1. Executing data processor action:");
  try {
    const result1 = await handleRun({
      actionName: "process-data",
      runId: "run-001",
      data: {
        items: [
          { id: 1, name: "Item 1" },
          { id: 2, name: "Item 2" },
          { id: 3, name: "Item 3" },
        ],
      },
      variables: {
        batch_size: "5",
      },
      secrets: {
        api_key: "secret-key-123",
      },
    });

    console.log("📋 Result:", result1.success ? "SUCCESS" : "FAILED");
    if (!result1.success) {
      console.log("❌ Error:", result1.error);
    }
  } catch (error) {
    console.error("💥 Execution error:", error);
  }

  console.log("\n" + "=".repeat(50) + "\n");

  // Execute the data sync action
  console.log("2. Executing data sync action:");
  try {
    const result2 = await handleRun({
      actionName: "data-sync",
      runId: "run-002",
      data: {
        items: [
          { name: "awesome-dataset", description: "An awesome dataset" },
          { name: "user-records", description: "User information records" },
        ],
      },
      variables: {
        sync_mode: "full",
      },
      integration: {
        id: "int-123",
        name: "data-sync",
        title: "Data Synchronization",
      },
      managedUser: {
        id: "user-456",
        externalId: "ext-user-789",
        displayName: "Jane Developer",
      },
    });

    console.log("📋 Result:", result2.success ? "SUCCESS" : "FAILED");
    if (!result2.success) {
      console.log("❌ Error:", result2.error);
    }
  } catch (error) {
    console.error("💥 Execution error:", error);
  }

  console.log("\n" + "=".repeat(50) + "\n");

  // Execute the flaky action (success case)
  console.log("3. Executing flaky action (success case):");
  try {
    const result3 = await handleRun({
      actionName: "flaky-operation",
      runId: "run-003",
      data: { shouldFail: false },
    });

    console.log("📋 Result:", result3.success ? "SUCCESS" : "FAILED");
  } catch (error) {
    console.error("💥 Execution error:", error);
  }

  console.log("\n" + "=".repeat(50) + "\n");

  // Execute the flaky action (failure case)
  console.log("4. Executing flaky action (failure case):");
  try {
    const result4 = await handleRun({
      actionName: "flaky-operation",
      runId: "run-004",
      data: { shouldFail: true },
    });

    console.log("📋 Result:", result4.success ? "SUCCESS" : "FAILED");
    if (!result4.success) {
      console.log("❌ Error:", result4.error);
      console.log("📊 Error data:", result4.data);
    }
  } catch (error) {
    console.error("💥 Execution error:", error);
  }

  console.log("\n" + "=".repeat(50) + "\n");

  // Try to execute a non-existent action
  console.log("5. Executing non-existent action:");
  try {
    const result5 = await handleRun({
      actionName: "non-existent-action",
      runId: "run-005",
    });

    console.log("📋 Result:", result5.success ? "SUCCESS" : "FAILED");
    if (!result5.success) {
      console.log("❌ Error:", result5.error);
    }
  } catch (error) {
    console.error("💥 Execution error:", error);
  }

  // Show registry summary
  console.log("\n📊 Registry Summary:");
  const registry = exportRegistry();
  console.log(`  Total Items: ${registry.stats.totalItems}`);
  console.log(`  Actions: ${registry.stats.byType.action || 0}`);
  console.log(`  Custom Apps: ${registry.stats.byType.customApp || 0}`);

  // Show global action index
  console.log("\n🔍 Global Action Index:");
  if (typeof globalThis !== "undefined" && globalThis.actionIndex) {
    const actionNames = Object.keys(globalThis.actionIndex);
    console.log(`  Available Actions: ${actionNames.join(", ")}`);
    console.log(`  Total Functions: ${actionNames.length}`);
  } else {
    console.log("  Action index not available");
  }

  console.log("\n✅ Action execution examples completed!");

  // Usage pattern summary
  console.log("\n💡 Usage Patterns:");
  console.log("1. Define action with run function:");
  console.log(
    "   defineAction('my-action').withRun(async ({ data }) => { ... }).deploy()"
  );
  console.log("\n2. Execute action:");
  console.log(
    "   await handleRun({ actionName: 'my-action', runId: 'run-123', data: {...} })"
  );
  console.log("\n3. Handle execution results:");
  console.log(
    "   if (result.success) { /* success */ } else { /* handle error */ }"
  );
}

// Run the examples
runActionExamples().catch(console.error);
