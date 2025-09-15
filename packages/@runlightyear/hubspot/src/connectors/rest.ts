import { createRestConnector } from "@runlightyear/sdk";

export function createHubSpotRestConnector() {
  return createRestConnector()
    .withBaseUrl("https://api.hubapi.com/crm/v3")
    .addHeader("Authorization", "Bearer {{ auth.accessToken }}")
    .build();
}
