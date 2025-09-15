import { defineCustomApp, CustomAppBuilder } from "@runlightyear/sdk";
import { createSalesforceOAuthConnector } from "./oauth";

export function defineSalesforceCustomApp(): CustomAppBuilder {
  const salesforceOAuthConnector = createSalesforceOAuthConnector();

  return defineCustomApp("salesforce", "OAUTH2")
    .withTitle("Salesforce")
    .withOAuthConnector(salesforceOAuthConnector);
}
