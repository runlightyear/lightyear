const {
  defineCustomApp,
  defineOAuthConnector,
  getCustomApps,
} = require("./dist/index.js");

console.log("🔍 OAuth Registry Debug Test");
console.log("============================");

// 1. Create OAuth connector (similar to user's config)
const connector = defineOAuthConnector("hubspot")
  .withAuthUrl("https://app.hubspot.com/oauth/authorize")
  .withTokenUrl("https://api.hubapi.com/oauth/v1/token")
  .withScope(["crm.objects.contacts.read", "crm.objects.contacts.write"])
  .build();

console.log("\n✅ Step 1: OAuth connector created");
console.log("Connector type:", typeof connector);
console.log("Connector is function:", typeof connector === "function");

// 2. Create custom app with OAuth connector
const app = defineCustomApp("hubspot", "OAUTH2")
  .withTitle("Hubspot")
  .withOAuthConnector(connector)
  .deploy();

console.log("\n✅ Step 2: Custom app deployed");
console.log("App name:", app.name);
console.log("App type:", app.type);
console.log("App has OAuth connector:", !!app.oauthConnector);
console.log("App OAuth connector type:", typeof app.oauthConnector);

// 3. Check registry
const customApps = getCustomApps();
console.log("\n🔍 Step 3: Registry check");
console.log("Total apps in registry:", customApps.length);

const hubspotApp = customApps.find(
  (entry) => entry.customApp.name === "hubspot"
);
if (hubspotApp) {
  console.log("✅ Found hubspot app in registry!");
  console.log(
    "Registry app has OAuth connector:",
    !!hubspotApp.customApp.oauthConnector
  );
  console.log(
    "Registry OAuth connector type:",
    typeof hubspotApp.customApp.oauthConnector
  );

  if (hubspotApp.customApp.oauthConnector) {
    console.log(
      "OAuth connector is same as original:",
      hubspotApp.customApp.oauthConnector === connector
    );

    // Try to use the connector
    try {
      const instance = hubspotApp.customApp.oauthConnector({
        oauthConfigData: {},
        authData: {},
        customAppName: "hubspot",
        authName: "hubspot",
      });
      console.log("✅ Successfully created instance from registry connector");
      console.log("Instance type:", typeof instance);
      console.log(
        "Instance has getAuthRequestUrl:",
        typeof instance.getAuthRequestUrl === "function"
      );
    } catch (error) {
      console.log("❌ Failed to create instance:", error.message);
    }
  }
} else {
  console.log("❌ hubspot app NOT found in registry!");
  console.log("Available apps:");
  customApps.forEach((app) => {
    console.log(`  - ${app.customApp.name} (type: ${app.customApp.type})`);
  });
}
