import { defineCustomApp, CustomAppBuilder } from "@runlightyear/sdk";
import { createHubSpotOAuthConnector } from "./oauth";

export function defineHubSpotCustomApp(): CustomAppBuilder {
  const hubspotOAuthConnector = createHubSpotOAuthConnector();

  return defineCustomApp("hubspot", "OAUTH2")
    .withTitle("HubSpot")
    .withOAuthConnector(hubspotOAuthConnector)
    .addVariable("appId");
}
