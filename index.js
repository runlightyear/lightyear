// Minimal deployment using @runlightyear/sdk
// This allows deploying "nothing" - an empty but valid deployment

// Import the handler and deploy list helper from the SDK package
const { handler, getDeployList } = require("@runlightyear/sdk");

// Load your integration code (adjust the path if your app lives elsewhere)
require("./src");

// Export the handler for the deployment system to use
exports.handler = handler;
exports.getDeployList = getDeployList;

// Keep global assignment for compatibility
global.handler = handler;
global.getDeployList = getDeployList;

// The SDK has been updated to allow empty deployments
// You can add collections, models, integrations, etc. here later if needed
