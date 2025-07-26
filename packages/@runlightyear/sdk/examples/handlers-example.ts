import {
  handler,
  type HandlerEvent,
  type HandlerResponse,
  type InternalResponse,
  handleHealth,
  handleDeploy,
} from "../src/handlers";
import {
  defineModel,
  defineCollection,
  defineOAuth2CustomApp,
  defineApiKeyCustomApp,
} from "../src";

// Mock handler context for local testing
const mockContext = {
  remainingTimeMs: 25000,
  memoryLimitMB: "512",
  functionName: "lightyear-sdk-example",
  requestId: `example-${Date.now()}`,
};

async function runHandlersExample() {
  console.log("=== Lambda Handler Example ===\n");

  // Create some SDK elements to work with
  console.log("🏗️  Creating SDK elements...");

  const userModel = defineModel("user")
    .withTitle("User Account")
    .withSchema({
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string" },
        name: { type: "string" },
      },
    })
    .build();

  const githubApp = defineOAuth2CustomApp("github")
    .withTitle("GitHub Integration")
    .addSecret("client_id", { required: true })
    .addSecret("client_secret", { required: true })
    .addVariable("base_url", { defaultValue: "https://api.github.com" })
    .build();

  console.log("✅ Created models and custom apps\n");

  // Test different operations with Lambda format
  console.log("🔧 Testing Lambda Handler (statusCode + JSON body)...\n");

  const operations: { name: string; event: HandlerEvent }[] = [
    {
      name: "Health Check",
      event: { operation: "health" },
    },
    {
      name: "Deploy (Dry Run)",
      event: {
        operation: "deploy",
        payload: {
          environment: "development",
          dryRun: true,
          baseUrl: "https://api.lightyear.dev",
        },
      },
    },
  ];

  for (const { name, event } of operations) {
    console.log(`⚡ ${name}`);

    try {
      const result = (await handler(event, mockContext)) as HandlerResponse;
      const body = JSON.parse(result.body) as InternalResponse;

      console.log(`   ✅ Status Code: ${result.statusCode}`);
      console.log(`   📊 Success: ${body.success}`);

      if (event.operation === "deploy") {
        console.log(`   📦 Environment: ${body.data?.environment}`);
        console.log(`   🔄 Dry Run: ${body.data?.dryRun}`);
        console.log(`   📝 Logs: ${JSON.stringify(body.logs)}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
    }
    console.log();
  }

  console.log("🎛️ Testing Individual Handlers...");

  try {
    console.log("   🏥 Health handler without context...");
    const healthNoContext = await handleHealth();
    console.log(
      `   ✅ Health: ${healthNoContext.data?.status}, logs: ${JSON.stringify(
        healthNoContext.logs || []
      )}`
    );

    console.log("   🚀 Deploy handler...");
    const deployResult = await handleDeploy({
      dryRun: true,
      baseUrl: "https://api.lightyear.dev",
    });
    console.log(
      `   ✅ Deploy: environment=${
        deployResult.data?.environment
      }, logs: ${JSON.stringify(deployResult.logs)}`
    );
  } catch (error) {
    console.log(`   ❌ Individual handlers test error: ${error}`);
  }

  console.log("\n🎯 Lambda Handler Example Complete!");
  console.log("\n💡 Response Format:");
  console.log("   ```typescript");
  console.log("   interface HandlerResponse {");
  console.log(
    "     statusCode: number;  // 200 for success, 400/500 for errors"
  );
  console.log("     body: string;        // JSON.stringify(InternalResponse)");
  console.log("   }");
  console.log("   ");
  console.log("   interface InternalResponse {");
  console.log("     success: boolean;");
  console.log("     data?: any;");
  console.log("     error?: string;");
  console.log("     stats?: any;");
  console.log(
    "     logs?: string[];     // Always empty array for deploy operations"
  );
  console.log("   }");
  console.log("   ```");
  console.log("\n🚀 Usage:");
  console.log("   ```typescript");
  console.log(
    '   const result = await handler({ operation: "deploy" }, context);'
  );
  console.log("   console.log(result.statusCode); // 200");
  console.log("   const body = JSON.parse(result.body);");
  console.log("   console.log(body.success);     // true");
  console.log("   console.log(body.logs);        // []");
  console.log("   ```");
}

// Run the example
runHandlersExample().catch(console.error);
