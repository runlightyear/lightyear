/**
 * OAuth Connector Examples
 *
 * Various examples showing how to create OAuth connectors with different configurations
 */

import { createOAuthConnector } from "../src";

/**
 * Create an OAuth connector with a specific auth URL and token URL
 */

const simpleOAuthConnector = createOAuthConnector()
  .withAuthUrl("https://accounts.google.com/o/oauth2/v2/auth")
  .withTokenUrl("https://oauth2.googleapis.com/token")
  .build();

// Export examples for reference
export {
  simpleOAuthConnector
};