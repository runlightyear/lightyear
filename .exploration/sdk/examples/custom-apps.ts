import { defineCustomApp, defineOAuth2App, defineApiKeyApp, defineBasicAuthApp } from '../app-builder';

/**
 * Examples of defining custom apps
 */

// Basic examples with different auth types
export const salesforceApp = defineCustomApp('salesforce', 'OAUTH2')
  .withTitle('Salesforce CRM')
  .withVariables('clientId', 'authorizationUrl', 'tokenUrl', 'scopes')
  .withSecrets('clientSecret')
  .build();

export const stripeApp = defineCustomApp('stripe', 'APIKEY')
  .withTitle('Stripe Payments')
  .withVariables('headerName')
  .withSecrets('apiKey')
  .build();

export const jiraApp = defineCustomApp('jira', 'BASIC')
  .withTitle('Jira')
  .withVariables('username', 'domain')
  .withSecrets('password')
  .build();

// Using preset builders for common patterns
export const hubspotApp = defineOAuth2App('hubspot')
  .withTitle('HubSpot')
  .build();
// Automatically includes standard OAuth2 variables and secrets

export const sendgridApp = defineApiKeyApp('sendgrid')
  .withTitle('SendGrid Email')
  .build();
// Automatically includes API key configuration

export const twilioApp = defineBasicAuthApp('twilio')
  .withTitle('Twilio SMS')
  .withVariables('accountSid') // Add extra variable beyond the defaults
  .build();
// Includes basic auth plus custom accountSid variable

// Custom app with non-standard auth configuration
export const customApiApp = defineCustomApp('custom_api', 'APIKEY')
  .withVariables('apiEndpoint', 'apiVersion', 'region')
  .withSecrets('apiKey', 'apiSecret') // Multiple secrets
  .build();
// Title will auto-generate as "Custom Api"

// Minimal app definition - relies on defaults
export const simpleApp = defineCustomApp('myapp', 'OAUTH2').build();
// No title (will be "Myapp"), no custom variables/secrets