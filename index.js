// Minimal deployment using @runlightyear/sdk
// This allows deploying "nothing" - an empty but valid deployment

// Import the handler from the SDK package
const { handler } = require("@runlightyear/sdk");

// Export the handler for the deployment system to use
exports.handler = handler;

// The SDK has been updated to allow empty deployments
// You can add collections, models, integrations, etc. here later if needed
