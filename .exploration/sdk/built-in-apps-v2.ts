import { BuiltInApp } from './app-types';

/**
 * Built-in app reference system that supports dynamic availability
 */

// Option 1: Simple string reference with runtime validation
export function useBuiltInApp(appName: string): BuiltInApp {
  // Runtime validation will happen on the platform
  return {
    name: appName,
    title: appName, // Platform will provide actual title
    authorizationType: 'OAUTH2' // Platform will provide actual auth type
  };
}

// Option 2: Tagged string type for clarity
export type BuiltInAppRef = `builtin:${string}`;

export function builtInApp(name: string): BuiltInAppRef {
  return `builtin:${name}`;
}

// Option 3: Opaque reference object
export interface AppReference {
  readonly type: 'builtin' | 'custom';
  readonly name: string;
}

export function appRef(name: string): AppReference {
  return {
    type: 'builtin',
    name
  };
}

// Option 4: Just use strings but provide helper for IDE hints
/**
 * Common built-in apps that may be available:
 * - 'salesforce' - Salesforce CRM
 * - 'hubspot' - HubSpot Marketing
 * - 'stripe' - Stripe Payments
 * - 'shopify' - Shopify E-commerce
 * - 'slack' - Slack Messaging
 * - 'github' - GitHub
 * - 'google_sheets' - Google Sheets
 * - 'sendgrid' - SendGrid Email
 * - 'twilio' - Twilio SMS
 * - 'mailchimp' - Mailchimp Marketing
 * 
 * Note: Availability depends on your account settings
 */
export type BuiltInAppName = string;