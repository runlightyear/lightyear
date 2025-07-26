import { handler, type HandlerEvent } from "../src/handlers";
import {
  defineModel,
  defineCollection,
  defineOAuth2CustomApp,
  defineApiKeyCustomApp,
} from "../src";

// Mock handler context for local testing (works for VM, Docker, serverless, etc.)
const mockContext = {
  remainingTimeMs: 25000, // 25 seconds remaining
  memoryLimitMB: "512",
  functionName: "lightyear-sdk-example",
  requestId: `example-${Date.now()}`,
};

async function runHandlersExample() {
  console.log("=== Handlers Example ===\n");

  // First, let's create some SDK elements to work with
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

  const crmCollection = defineCollection("crm")
    .withTitle("CRM Data")
    .addModel("contact", {
      title: "Contact Record",
      schema: {
        type: "object",
        properties: {
          id: { type: "string" },
          company: { type: "string" },
        },
      },
    })
    .build();

  const githubApp = defineOAuth2CustomApp("github")
    .withTitle("GitHub Integration")
    .addSecret("client_id", { required: true })
    .addSecret("client_secret", { required: true })
    .addVariable("base_url", { defaultValue: "https://api.github.com" })
    .build();

  const apiKeyApp = defineApiKeyCustomApp("sendgrid")
    .withTitle("SendGrid Email Service")
    .addSecret("api_key", { required: true, title: "SendGrid API Key" })
    .build();

  console.log("✅ Created 2 models, 1 collection, and 2 custom apps\n");

  // Test different handler operations
  const operations: { name: string; event: HandlerEvent }[] = [
    {
      name: "Health Check",
      event: { operation: "health" },
    },
    {
      name: "Registry Stats",
      event: { operation: "registry-stats" },
    },
    {
      name: "Registry Export",
      event: { operation: "registry-export" },
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
    {
      name: "Production Deploy (Simulated)",
      event: {
        operation: "deploy",
        payload: {
          environment: "production",
          dryRun: true, // Keep as dry run for safety in example
          baseUrl: "https://api.lightyear.dev",
          version: "1.0.0",
        },
      },
    },
  ];

  for (const { name, event } of operations) {
    console.log(`🚀 Testing: ${name}`);
    console.log(`   Event: ${JSON.stringify(event)}`);

    try {
      const startTime = Date.now();
      const result = await handler(event, mockContext);
      const duration = Date.now() - startTime;

      console.log(`   ✅ Success (${duration}ms)`);

      if (event.operation === "deploy") {
        console.log(`   🚀 Deployment Details:`);
        console.log(`     Environment: ${result.data?.environment}`);
        console.log(`     Items Deployed: ${result.stats?.deployedItems}`);
        console.log(`     Collections: ${result.stats?.collections}`);
        console.log(`     Custom Apps: ${result.stats?.customApps}`);
        if (result.data?.deployment?.url) {
          console.log(`     URL: ${result.data.deployment.url}`);
        }
      } else {
        console.log(
          `   Response: ${JSON.stringify(result, null, 2).substring(0, 200)}...`
        );
      }

      if ("stats" in result && result.stats) {
        console.log(`   📊 Stats: ${JSON.stringify(result.stats)}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
    }

    console.log();
  }

  // Test individual handler imports
  console.log("🔧 Testing Individual Handler Imports...");

  try {
    const { handleHealth, handleRegistryStats, handleDeploy } = await import(
      "../src/handlers"
    );

    console.log("   🏥 Health handler...");
    const healthResult = await handleHealth(mockContext);
    console.log(`   ✅ Health: ${healthResult.data?.status}`);

    console.log("   📊 Registry stats handler...");
    const statsResult = await handleRegistryStats();
    console.log(`   ✅ Stats: ${statsResult.data?.totalItems} items`);

    console.log("   🚀 Deploy handler (with schema transformation)...");
    const deployResult = await handleDeploy({
      environment: "test",
      dryRun: true,
      baseUrl: "https://api.lightyear.dev",
    });
    console.log(`   ✅ Deploy: ${deployResult.data?.environment} environment`);
    console.log(`   📦 Deployed: ${deployResult.stats?.deployedItems} items`);
  } catch (error) {
    console.log(`   ❌ Individual handlers error: ${error}`);
  }

  console.log("\n🎛️ Testing Optional Parameters...");

  try {
    const { handleHealth, handleDeploy } = await import("../src/handlers");

    console.log("   🏥 Health handler without context...");
    const healthNoContext = await handleHealth();
    console.log(
      `   ✅ Health (no context): ${healthNoContext.data?.status}, requestId: ${healthNoContext.data?.requestId}`
    );

    console.log("   🏥 Health handler with partial context...");
    const healthPartial = await handleHealth({ requestId: "example-partial" });
    console.log(
      `   ✅ Health (partial): ${healthPartial.data?.status}, requestId: ${healthPartial.data?.requestId}`
    );

    console.log("   🚀 Deploy handler without payload...");
    const deployNoPayload = await handleDeploy();
    console.log(
      `   ✅ Deploy (no payload): environment=${deployNoPayload.data?.environment}`
    );

    console.log("   🚀 Deploy handler with minimal payload...");
    const deployMinimal = await handleDeploy({ dryRun: true });
    console.log(`   ✅ Deploy (minimal): dryRun=${deployMinimal.data?.dryRun}`);
  } catch (error) {
    console.log(`   ❌ Optional parameters test error: ${error}`);
  }

  console.log("\n🎯 Handlers Example Complete!");
  console.log("\n💡 Deployment Schema Information:");
  console.log("   🔸 Collections → collectionProps with embedded models");
  console.log(
    "   🔸 Custom Apps → customAppProps with authType, variables, secrets"
  );
  console.log("   🔸 Models → embedded within collections as ModelSchema");
  console.log("   🔸 POST to: BASE_URL/api/v1/envs/[envName]/deploy");
  console.log("\n🚀 Integration Examples:");
  console.log("   ```typescript");
  console.log('   import { handler } from "@runlightyear/sdk";');
  console.log("   ");
  console.log("   // Deploy with environment configuration");
  console.log("   const result = await handler({");
  console.log('     operation: "deploy",');
  console.log("     payload: {");
  console.log('       environment: "production",');
  console.log('       baseUrl: "https://api.lightyear.dev",');
  console.log("       dryRun: false");
  console.log("     }");
  console.log("   }, context);");
  console.log("   ```");
  console.log("\n📦 Environment Variables:");
  console.log("   - BASE_URL: API base URL (can be overridden in payload)");
  console.log(
    "   - ENV_NAME: Environment name (defaults to payload.environment)"
  );
}

// Run the example
runHandlersExample().catch(console.error);
