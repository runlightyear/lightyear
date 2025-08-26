import { createOAuthConnector } from "@runlightyear/sdk";

export function createHubSpotOAuthConnector() {
  return createOAuthConnector()
    .withAuthUrl("https://app.hubspot.com/oauth/authorize")
    .withTokenUrl("https://api.hubapi.com/oauth/v1/token")
    .withScope([
      "crm.objects.companies.read",
      "crm.objects.companies.write",
      "crm.objects.contacts.read",
      "crm.objects.contacts.write",
      "crm.objects.deals.read",
      "crm.objects.deals.write",
      "crm.objects.line_items.read",
      "crm.objects.line_items.write",
      "crm.objects.owners.read",
      "crm.objects.users.read",
      "oauth",
    ])
    .build();
}