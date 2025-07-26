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
      name: "Deploy (Preview)",
      event: {
        operation: "deploy",
        payload: {
          environment: "development",
          dryRun: true,
        },
      },
    },
    {
      name: "Production Deploy",
      event: {
        operation: "deploy",
        payload: {
          environment: "production",
          dryRun: false,
          region: "us-east-1",
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
      console.log(
        `   Response: ${JSON.stringify(result, null, 2).substring(0, 200)}...`
      );

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

    console.log("   🚀 Deploy handler...");
    const deployResult = await handleDeploy({
      environment: "test",
      components: ["models", "collections"],
    });
    console.log(`   ✅ Deploy: ${deployResult.data?.environment} environment`);
  } catch (error) {
    console.log(`   ❌ Individual handlers error: ${error}`);
  }

  console.log("\n🎯 Handlers Example Complete!");
  console.log("\n💡 Deployment Options:");
  console.log("   🔸 Docker: Import handler and call directly");
  console.log("   🔸 VM: Deploy as a service with HTTP wrapper");
  console.log("   🔸 Kubernetes: Deploy as microservice");
  console.log("   🔸 Edge Functions: Deploy to Vercel, Netlify, etc.");
  console.log("   🔸 AWS Lambda: Deploy with direct invocation");
  console.log("\n🚀 Integration Examples:");
  console.log("   ```typescript");
  console.log('   import { handler } from "@runlightyear/sdk";');
  console.log("   ");
  console.log("   // Direct usage");
  console.log("   const result = await handler(");
  console.log(
    '     { operation: "deploy", payload: { environment: "prod" } },'
  );
  console.log('     { requestId: "req-123", remainingTimeMs: 30000 }');
  console.log("   );");
  console.log("   ```");
  console.log("\n📦 Build Commands:");
  console.log("   1. Run `pnpm build:handlers` to create deployment bundle");
  console.log("   2. Deploy dist/handlers.js to your target environment");
  console.log("   3. Configure your application to call the handler function");
  console.log("   4. Set up monitoring and logging as needed");
}

// Run the example
runHandlersExample().catch(console.error);
