// Legacy exports (kept for backwards compatibility)
export { HubSpot } from "./HubSpot";
export type { HubSpotProps } from "./HubSpot";

export { HubSpotOAuth } from "./HubSpotOAuth";
export type { HubSpotOAuthProps } from "./HubSpotOAuth";

export { HubSpotAppWebhook } from "./HubSpotAppWebhook";

// New SDK exports
export { createHubSpotOAuthConnector } from "./connectors/oauth";
export { createHubSpotRestConnector } from "./connectors/rest";
export { createHubSpotSyncConnector } from "./connectors/sync";
