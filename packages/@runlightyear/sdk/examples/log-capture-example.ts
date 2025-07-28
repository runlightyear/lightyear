import {
  defineAction,
  initializeLogCapture,
  setLogContext,
  clearLogContext,
  getLogCapture,
  stopLogCapture,
} from "../src";

/**
 * Example: Using the Log Capture System
 *
 * This example demonstrates how to capture console logs and upload them
 * to the Lightyear API during action execution.
 */

async function runLogCaptureExample() {
  console.log("🚀 Log Capture System Example\n");

  // Example 1: Manual log capture setup
  console.log("📝 Example 1: Manual log capture setup");

  // Initialize log capture with custom configuration
  const logCapture = initializeLogCapture({
    uploadIntervalMs: 2000, // Upload every 2 seconds
    maxLogsPerBatch: 100, // Max 100 logs per batch
    baseUrl: "https://app.runlightyear.com",
    environment: "dev",
    apiKey: process.env.LIGHTYEAR_API_KEY, // Set this in your environment
  });

  console.log("✅ Log capture initialized");
  console.log("📊 Current log count:", logCapture?.getLogCount() || 0);

  // Set context for log uploads
  setLogContext({
    runId: "example-run-12345",
    // Could also include deployId, deliveryId, etc.
  });

  console.log("🔗 Log context set with runId");

  // Generate some sample logs
  console.log("📄 Generating sample logs...");
  console.info("This is an info message");
  console.warn("This is a warning message");
  console.error("This is an error message");
  console.debug("This is a debug message");

  // Log some objects
  console.log("📦 Object logging example:", {
    user: "alice",
    action: "sync",
    timestamp: new Date().toISOString(),
    data: { count: 42, items: ["a", "b", "c"] },
  });

  console.log("📊 Log count after messages:", logCapture?.getLogCount() || 0);

  // Clear context when done
  clearLogContext();
  console.log("🧹 Log context cleared");

  // Example 2: Using with action execution
  console.log("\n📝 Example 2: Automatic log capture during action execution");

  // Create an action that generates logs
  const loggerAction = defineAction("logger-action")
    .withTitle("Action with Logging")
    .withDescription(
      "Demonstrates automatic log capture during action execution"
    )
    .withRun(async ({ data }) => {
      console.log("🎯 Action started with data:", data);

      // Simulate some work with logs
      console.info("📋 Processing items...");

      for (let i = 1; i <= 3; i++) {
        console.log(`📦 Processing item ${i}`);

        if (i === 2) {
          console.warn("⚠️  Item 2 has a warning");
        }

        // Simulate async work
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      console.info("✅ All items processed successfully");
      console.log("🎉 Action completed!");
    })
    .deploy();

  console.log("✅ Logger action created:", loggerAction.name);

  // Example 3: Testing manual flush
  console.log("\n📝 Example 3: Manual log flush");

  // Add some logs
  console.log("🔄 Adding logs before manual flush...");
  console.info("Log 1: Preparing for flush");
  console.warn("Log 2: This will be uploaded immediately");
  console.error("Log 3: Manual flush test");

  // Manually flush logs (useful for testing)
  if (logCapture) {
    console.log("🚀 Flushing logs manually...");
    await logCapture.flush();
    console.log("✅ Manual flush completed");
  }

  // Example 4: Configuration examples
  console.log("\n📝 Example 4: Configuration examples");

  console.log("🔧 Configuration options:");
  console.log("  • uploadIntervalMs: Controls how often logs are uploaded");
  console.log("  • maxLogsPerBatch: Maximum logs per API request");
  console.log("  • baseUrl: Lightyear API base URL");
  console.log("  • environment: Target environment (dev, staging, prod)");
  console.log("  • apiKey: Your Lightyear API key");

  console.log("\n🌍 Environment variables:");
  console.log("  • LIGHTYEAR_BASE_URL: Default base URL");
  console.log("  • LIGHTYEAR_ENV: Default environment");
  console.log("  • LIGHTYEAR_API_KEY: Default API key");

  // Example 5: Context usage
  console.log("\n📝 Example 5: Different context types");

  console.log("🏷️  Setting different context types:");

  // Run context
  setLogContext({ runId: "run-123" });
  console.log("🏃 Set run context - logs will upload with runId");

  clearLogContext();

  // Deploy context
  setLogContext({ deployId: "deploy-456" });
  console.log("🚀 Set deploy context - logs will upload with deployId");

  clearLogContext();

  // Delivery context
  setLogContext({ deliveryId: "delivery-789" });
  console.log("📨 Set delivery context - logs will upload with deliveryId");

  clearLogContext();

  // Multiple context
  setLogContext({
    runId: "run-999",
    subscriptionActivityId: "sub-888",
  });
  console.log("🔗 Set multiple context - logs will upload with both IDs");

  clearLogContext();

  // Example 6: Cleanup
  console.log("\n📝 Example 6: Cleanup");

  // Wait a moment for any pending uploads
  console.log("⏳ Waiting for pending uploads...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Stop log capture and cleanup
  stopLogCapture();
  console.log("🛑 Log capture stopped and cleaned up");

  console.log("\n✅ Log capture examples completed!");

  console.log("\n💡 Usage Tips:");
  console.log("1. Initialize log capture at the start of your application");
  console.log("2. Set context when starting operations (runs, deploys, etc.)");
  console.log("3. Clear context when operations complete");
  console.log("4. Use environment variables for configuration");
  console.log("5. Logs are automatically uploaded every second (configurable)");
  console.log("6. Logs are only uploaded when a context is set");
  console.log("7. Original console output is preserved");
  console.log("8. Memory usage is controlled with batch limits");

  console.log("\n🔗 Integration with Lightyear:");
  console.log("• Logs are sent to: /api/v1/envs/[env]/logs");
  console.log("• Schema matches Lightyear's log API format");
  console.log("• Supports runId, deployId, deliveryId, and more");
  console.log("• Includes timestamp, level, message, and position");
  console.log("• Handles errors gracefully without breaking your app");
}

// Run the example
runLogCaptureExample().catch(console.error);
