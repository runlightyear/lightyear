/**
 * Skip to content
 *
 * English
 * Log in Create a developer account
 * HubSpot Developers
 * Documentation
 * Resources
 * Marketplace
 * HubSpot Integration Guides
 * Discover APIs, integration guides, and other documentation
 *
 *
 * HubSpot Developer Docs
 * Find any doc, guide, or tutorial...
 *
 * Overview
 * API developer guides & resources
 * Usage guidelines & rate limits
 * Breaking change guidelines
 * Account Types
 * Building apps
 * Authentication
 * Auth methods on HubSpot
 * OAuth
 * Working with OAuth
 * OAuth 2.0 quickstart
 * Managing tokens
 * Guides & examples
 * Tutorials
 * App Marketplace
 * Listing your app
 * App listing requirements
 * App certification requirements
 * Applying for app certification
 * Measuring app performance
 * Other resources
 * API reference docs
 * FAQ
 * Developer Slack
 * Developer community forums
 * Developer Certifications
 * CMS developer docs
 * Legal
 * Developer Policy
 * Developer Terms
 * Acceptable Use Policy
 * Home
 *  Authentication
 *  OAuth
 *  Working with OAuth
 * Working with OAuth
 * OAuth is a secure means of authentication that uses authorization tokens rather than a password to connect your app to a user account. Initiating OAuth access is the first step towards allowing users to install your app in their HubSpot accounts.
 *
 * Please note:
 *
 * any app designed for installation by multiple HubSpot accounts or listing on the App Marketplace must use OAuth.
 * users installing apps in their HubSpot account must either be a super admin or have App Marketplace Access permissions.
 * Recommended resources
 * The OAuth Quickstart Guide will get you up and running with a working example app.
 * This HubSpot Academy tutorial provides a quick introduction on using OAuth with HubSpot, including a breakdown of the HubSpot-OAuth flow and how to refresh an access token.
 * Initiating an integration with OAuth 2.0
 * To initiate an integration with OAuth 2.0:
 *
 * First, create an app in a HubSpot developer account. After creating the app, you'll be able to find  the app's client ID and client secret on the Auth page of your app settings.
 * MyHubSpotApp
 *
 * Use the client ID and client secret, along with the query parameters and scopes outlined below, to build your authorization URL.
 * Send users installing your app to the authorization URL, where they'll be presented with a screen that allows them to select their account and grant access to your integration. After granting access, they'll be redirected back to your application via a redirect_url, which will have a code query parameter appended to it. You'll use that code and the client secret to get an access_token and refresh_token from HubSpot.
 * Example authorization URL: https://app.hubspot.com/oauth/authorize?client_id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&scope=contacts%20automation&redirect_uri=https://www.example.com/
 * Example redirect URL:https://www.example.com/?code=xxxx
 * Example error: https://www.example.com/?error=error_code&error_description=Human%20readable%20description%20of%20the%20error
 * Use the access_token to authenticate any API calls made for that HubSpot account.
 * Once the access_token expires, use the refresh_token to generate a new access_token.
 * Please note:
 *
 * your app will not appear as a Connected App in a user's account unless you generate the refresh token and initial access token.
 * access tokens reflect the scopes requested from the app and do not reflect the permissions or limitations of what a user can do in their HubSpot account. For example, if a user has permissions to view only owned contacts but authorizes a request for the  crm.objects.contacts.read scope, the resulting access token can view all contacts in the account and not only those owned by the authorizing user.
 * Query parameters
 * The following parameters are required when building an authorization URL for your app:
 *
 * Required parameters
 * PARAMETER	DESCRIPTION	HOW TO USE
 * Client ID	client_id=x
 * Used in the URL	Get this from your app's Auth settings page (as described above).
 * Redirect URL	redirect_uri=x
 * The URL visitors will be redirected to after granting access to your app.
 * You'll also designate this on your app's Auth settings page.
 *
 * Note: For security reasons, this URL must use https in production. (When testing using localhost, http can be used.) You also must use a domain, as IP addresses are not supported.
 *
 * Scope	scope=x%20x
 * A space-separated set of permissions that your app needs access to. Any scopes that you've checked off in your app's Auth settings will be treated as required, and you'll need to include them in this parameter or the authorization page will display an error.
 *
 * Additionally, users will get an error if they try to install your app on an account that doesn't have access to an included scope.
 * See the Scopes table below for more details about which endpoints can be accessed by specific scopes.
 *
 *
 * The following parameters are optional:
 *
 * Optional parameters
 * PARAMETER	HOW TO USE	DESCRIPTION
 * Optional scopes	&optional_scope=x%20x	A space-separated set of optional permissions for your app. Optional scopes will be automatically dropped from the authorization request if the user selects a HubSpot account that does not have access to that tool (such as requesting the social scope on a CRM only portal). If you're using optional scopes, you will need to check the access token or refresh token to see which ones were granted. See the table below for more details about scopes.
 * State	&state=y
 * If this parameter is included in the authorization URL, the value will be included in a state query parameter when the user is directed to the redirect_url.	A string value that can be used to maintain the user's state when they're redirected back to your app.
 * Scopes
 * OAuth requires you to set scopes, or permissions, for your app. Each scope provides access to a set of HubSpot API endpoints and allows users to grant your app access to specific tools in their HubSpot account.
 *
 * granular-scopes-selection
 *
 * Access to specific APIs or endpoints depends on HubSpot account tier. You can find a full list of available scopes and accessible endpoints in the table below. If your app can work with multiple types of HubSpot accounts, you can use the optional_scope parameter to include any tiered scopes you work. This way, customers using CRM-only accounts can still authorize your app, even if they can't access all of its scopes. Your app must check for and handle any scopes that it doesn't get authorized for.
 *
 *
 * SCOPE	DESCRIPTION	PROVIDES ACCESS TO	REQUIRED ACCOUNT TIER
 * cms.domains.read	Integrators can list CMS domains in a customer's account. 	CMS API	Any account
 * cms.domains.write	Integrators can create, update, and delete CMS custom domains. 	CMS API	Any account
 * cms.functions.read	Integrators can view all CMS serverless functions, any related secrets, and function execution results. 	CMS API	CMS Hub Enterprise
 * cms.functions.write	Integrators can write CMS serverless functions and secrets.	CMS API	CMS Hub Enterprise
 * cms.knowledge_base.articles.read	View details about knowledge articles.	CMS API	Service Hub Professional or Enterprise
 * cms.knowledge_base.articles.write
 *
 * Grants access to update knowledge articles. 	CMS API	Service Hub Professional or Enterprise
 * cms.knowledge_base.articles.publish	Grants access to update and publish knowledge articles.	CMS API	Service Hub Professional or Enterprise
 * cms.knowledge_base.settings.read	View general and template knowledge base settings, such as the domain or root URL.	CMS API	Service Hub Professional or Enterprise
 * cms.knowledge_base.settings.write	Grants access to update general and template knowledge base settings. This includes write access to knowledge articles.	CMS API	Service Hub Professional or Enterprise
 * cms.performance.read	Integrators can view CMS performance data for all your sites.	CMS API	Any account
 * crm.lists.read	View details about contact lists.	List endpoints	Any account
 * crm.lists.write	Create, delete, or make changes to contact lists	List endpoints	Any account
 * crm.objects.companies.read	View properties and other details about companies.	Companies endpoints	Any account
 * crm.objects.companies.write	View properties and create, delete, or make changes to companies.	Companies endpoints	Any account
 * crm.objects.contacts.read	View properties and other details about contacts.	Contacts endpoints	Any account
 * crm.objects.contacts.write	View properties and create, delete, and make changes to contacts.	Contacts endpoints	Any account
 * crm.objects.custom.read	View details about custom objects in the HubSpot CRM.	Custom objects endpoints	Any Enterprise
 * crm.objects.custom.write	Create, delete, or make changes to custom objects in the HubSpot CRM. 	Custom objects endpoints	Any Enterprise
 * crm.objects.deals.read	View properties and other details about deals.	Deal endpoints	Any account
 * crm.objects.deals.write	View properties and create, delete, or make changes to deals.	Deal endpoints	Any account
 * crm.objects.feedback_submission.read	View details about submissions to any of your feedback surveys.	Feedback survey endpoints	Service Hub Professional or Enterprise
 * crm.objects.goals.read	View all goal types. 	Goals endpoints	Sales Hub Starter, Professional, or Enterprise
 * crm.objects.line_items.read	View properties and other details about line items	Line items endpoints	Any account
 * crm.objects.line_items.write	Create, delete, or make changes to line items. 	Line items endpoints	Any account
 * crm.objects.marketing_events.read	View details about marketing events. 	Marketing events endpoints	Any account
 * crm.objects.marketing_events.write	Create, delete, or make changes to marketing events. 	Marketing events endpoints	Any account
 * crm.objects.owners.read	View details about users assigned to a CRM record.	Owners endpoints	Any account
 * crm.objects.quotes.read	View properties and other details about quotes and quote templates.	Quote endpoints	Any account
 * crm.objects.quotes.write	Create, delete, or make changes to quotes.	Quote endpoints	Any account
 * crm.schemas.companies.read	View details about property settings for companies	Properties endpoints	Any account
 * crm.schemas.companies.write	Create, delete, or make changes to property settings for companies.	Properties endpoints	Any account
 * crm.schemas.contacts.read	View details about property settings for contacts.	Properties endpoints.	Any account
 * crm.schemas.contacts.write	Create, delete, or make changes to property settings for contacts.	Properties endpoints	Any account
 * crm.schemas.custom.read	View details about custom object definitions in the HubSpot CRM.	Custom objects endpoints	Any Enterprise
 * crm.schemas.deals.read	View details about property settings for deals.	Properties endpoints	Any account
 * crm.schemas.deals.write	Create, delete, or make changes to property settings for deals.	Properties endpoints	Any account
 * crm.schemas.line_items.read	View details about line items.	Line items endpoints	Any account
 * crm.schemas.quotes.read	View details about quotes and quotes templates.	Quote endpoints	Any account
 * settings.billing.write	Make changes to your account's billing settings. This includes managing and assigning paid seats for users.	Settings endpoints	Any account
 * settings.currencies.read	Reads existing exchange rates along with the current company currency associated with your portal. 	Account information endpoints	Any account
 * settings.currencies.write	Create, update and delete exchange rates along with updating the company currency associated with your portal. 	Account information endpoints	Any account
 * settings.users.read	View details about account users and their permissions.	User Provisioning endpoints	Any account
 * settings.users.write	Manage users and user permissions on your HubSpot account. This includes creating new users, assigning permissions and roles, and deleting existing users. 	User Provisioning endpoints	Any account
 * settings.users.teams.read	See details about the account's teams. 	User Provisioning endpoints	Any account
 * settings.users.team.write	Assign users to teams on your HubSpot account. 	User Provisioning endpoints	Any account
 * account-info.security.read	Includes access to account activity logs and other account security information. 	Account activity API	Any account
 * accounting	Allows HubSpot and the accounting integration to share invoice, product, and contact details.	Accounting Extension API	Any account
 * actions	Add forms to the contact's pages that do custom actions.	CRM Extensions API	Any account
 * analytics.behavioral_events.send	Includes access to send custom behavioral events. 	Analytics API	Marketing Hub Enterprise
 * automation	This includes workflows.	Automation API (Workflows endpoints)	Marketing Hub Professional or Enterprise
 * behavioral_events.event_definitions.read_write	Create, read, update, or delete behavioral events. This includes behavioral event properties. 	Analytics API	Marketing Hub Enterprise
 * business_units.view.read	View business unit data, including logo information.	Business Units API	Business Units Add-on
 * business-intelligence	This includes endpoints that sit on top of sources and email.	Analytics API	Any account
 * collector.graphql_query.execute	Query data from your HubSpot account using the GraphQL API endpoint	GraphQL API endpoint	CMS Hub Professional or Enterprise
 * collector.graphql_schema.read	Perform introspection queries via GraphQL application clients such as GraphiQL	GraphiQL and other 3rd party GraphQL clients	CMS Hub Professional or Enterprise
 * communication_preferences.read	View details of your contacts' subscription preferences. 	Subscription Preferences API	Any account
 * communication_preferences.read_write	Subscribe/unsubscribe contacts to your subscription types. It won't subscribe contacts who have unsubscribed. 	Subscription Preferences API	Any account
 * communication_preferences.write	Subscribe/unsubscribe contacts to your subscription types. It won't subscribe contacts who have unsubscribed. 	Subscription Preferences API	Any account
 * content	This includes sites, landing pages, email, blog, and campaigns.	CMS API and Calendar, Email and Email Events endpoints	CMS Hub Professional or Enterprise, or Marketing Hub Professional or Enterprise
 * conversations.read	View details about threads in the conversations inbox.	Conversations inbox and messages API	Any account
 * conversations.visitor_identification.tokens.create	Fetch identification tokens for authenticated website visitors interacting with the HubSpot chat widget.	Visitor Identification API	Any Professional or Enterprise
 * conversations.write	Send messages in conversations. Create and update message threads.	Conversations inbox and messages API	Any account
 * crm.export	Export records from your CRM for all CRM data types.	CRM Exports API	 Any account
 * crm.import	Allows you to import records into your CRM. This includes creating new records or modifying any of your existing records for all CRM data types (contacts, companies, deals, tickets, etc). It doesn't include archiving or deleting any data.	CRM Imports API	Any account
 * ctas.read	Allows read access for CTAs.	No publicAPI available	Marketing Hub or CMS Hub Starter, Professional or Enterprise
 * e-commerce	This includes access to e-commerce features.	Products and line items endpoints
 * Any account
 *
 * Note: Only Professional and Enterprise accounts can use this scope for the Products API.
 *
 * external_integrations.forms.access	Includes the ability to rename, delete, and clone existing forms.	Forms endpoints
 * Any account
 *
 * files	This includes access to File Manager.	Files (File Manager) and file mapper (CMS templates, modules, and layout) endpoints	Any account
 * files.ui_hidden.read	View details or download user files, attachments, and system files from all HubSpot tools. 	Files (File Manager) and file mapper (CMS templates, modules, and layout) endpoints	Any account
 * forms	This includes access to the Forms endpoints.	Forms endpoints	Any account
 * forms-uploaded-files	Download files submitted through a form.	Get a file uploaded via form submission endpoint	Any account
 * hubdb	This includes access to HubDB.	HubDB endpoints	CMS Hub Professional or Enterprise, or Marketing Hub Professional or Enterprise with Website Add-on
 * integration-sync	This exposes the sync API, which allows syncing of most CRM objects.	Ecommerce Bridge API	Any account
 * media_bridge.read	Grants access to events and objects from the media bridge.	Media Bridge API	Any account
 * media_bridge.write	Grants access to create and update events and objects from the media bridge.	Media Bridge API	Any account
 * oauth	Basic scope required for OAuth. This scope is added by default to all apps.	 	Any account
 * sales-email-read	Grants access to read all details of one-to-one emails sent to contacts.	Engagements endpoints
 *
 * Note: This scope is required to get the content of email engagements. See the Engagements overview for more details.	Any account
 * social	This includes Social Inbox.	Social Media API	Marketing Hub Professional or Enterprise
 * tickets	This includes access to tickets.	Tickets endpoints	Any accounbt
 * timeline	Grants access to manage custom events on HubSpot CRM records. This includes creating or updating records.	Timeline Events endpoints	Any account
 * transactional-email	This includes transactional emails and the transactional emails endpoints.	Transactional email endpoints	Marketing Hub Professional or Enterprise with Transactional Email Add-on
 * Related docs
 * Auth methods on HubSpot
 *
 * OAuth Quickstart Guide
 *
 * Managing tokens
 *
 * Our Products
 * HubSpot Free CRM
 * HubSpot Marketing Hub
 * HubSpot Sales Hub
 * HubSpot Service Hub
 * HubSpot for WordPress
 * Resources & Tools
 * API Documentation
 * CMS Documentation
 * Changelog
 * App Marketplace
 * CMS Asset Marketplace
 * Learn
 * CMS Blog
 * CMS Open Source Project
 * CMS Code Gallery
 * Free Courses & Certifications
 * Community
 * Development Jobs
 * Developer Forum
 * HubSpot.com
 * Github
 * Slack
 * Twitter
 * HubSpot Developers
 * Copyright © 2024 HubSpot, Inc.
 *
 * Legal Stuff
 *
 * Privacy Policy
 *
 * Manage Cookies
 */

export type HubSpotScope =
  /**
   * Integrators can list CMS domains in a customer's account.
   */
  | "cms.domains.read"
  /**
   * Integrators can create, update, and delete CMS custom domains.
   */
  | "cms.domains.write"
  /**
   * Integrators can view all CMS serverless functions, any related secrets, and function execution results.
   */
  | "cms.functions.read"
  /**
   * Integrators can write CMS serverless functions and secrets.
   */
  | "cms.functions.write"
  /**
   * View details about knowledge articles.
   */
  | "cms.knowledge_base.articles.read"
  /**
   * Grants access to update knowledge articles.
   */
  | "cms.knowledge_base.articles.write"
  /**
   * Grants access to update and publish knowledge articles.
   */
  | "cms.knowledge_base.articles.publish"
  /**
   * View general and template knowledge base settings, such as the domain or root URL.
   */
  | "cms.knowledge_base.settings.read"
  /**
   * Grants access to update general and template knowledge base settings. This includes write access to knowledge articles.
   */
  | "cms.knowledge_base.settings.write"
  /**
   * Integrators can view CMS performance data for all your sites.
   */
  | "cms.performance.read"
  /**
   * View details about contact lists.
   */
  | "crm.lists.read"
  /**
   * Create, delete, or make changes to contact lists
   */
  | "crm.lists.write"
  /**
   * View properties and other details about companies.
   */
  | "crm.objects.companies.read"
  /**
   * View properties and create, delete, or make changes to companies.
   */
  | "crm.objects.companies.write"
  /**
   * View properties and other details about contacts.
   */
  | "crm.objects.contacts.read"
  /**
   * View properties and create, delete, and make changes to contacts.
   */
  | "crm.objects.contacts.write"
  /**
   * View details about custom objects in the HubSpot CRM.
   */
  | "crm.objects.custom.read"
  /**
   * Create, delete, or make changes to custom objects in the HubSpot CRM.
   */
  | "crm.objects.custom.write"
  /**
   * View properties and other details about deals.
   */
  | "crm.objects.deals.read"
  /**
   * View properties and create, delete, or make changes to deals.
   */
  | "crm.objects.deals.write"
  /**
   * View details about submissions to any of your feedback surveys.
   */
  | "crm.objects.feedback_submission.read"
  /**
   * View all goal types.
   */
  | "crm.objects.goals.read"
  /**
   * View properties and other details about line items
   */
  | "crm.objects.line_items.read"
  /**
   * Create, delete, or make changes to line items.
   */
  | "crm.objects.line_items.write"
  /**
   * View details about marketing events.
   */
  | "crm.objects.marketing_events.read"
  /**
   * Create, delete, or make changes to marketing events.
   */
  | "crm.objects.marketing_events.write"
  /**
   * View details about users assigned to a CRM record.
   */
  | "crm.objects.owners.read"
  /**
   * View properties and other details about quotes and quote templates.
   */
  | "crm.objects.quotes.read"
  /**
   * Create, delete, or make changes to quotes.
   */
  | "crm.objects.quotes.write"
  /**
   * View details about property settings for companies
   */
  | "crm.schemas.companies.read"
  /**
   * Create, delete, or make changes to property settings for companies.
   */
  | "crm.schemas.companies.write"
  /**
   * View details about property settings for contacts.
   */
  | "crm.schemas.contacts.read"
  /**
   * Create, delete, or make changes to property settings for contacts.
   */
  | "crm.schemas.contacts.write"
  /**
   * View details about custom object definitions in the HubSpot CRM.
   */
  | "crm.schemas.custom.read"
  /**
   * View details about property settings for deals.
   */
  | "crm.schemas.deals.read"
  /**
   * Create, delete, or make changes to property settings for deals.
   */
  | "crm.schemas.deals.write"
  /**
   * View details about line items.
   */
  | "crm.schemas.line_items.read"
  /**
   * View details about quotes and quotes templates.
   */
  | "crm.schemas.quotes.read"
  /**
   * Make changes to your account's billing settings. This includes managing and assigning paid seats for users.
   */
  | "settings.billing.write"
  /**
   * Reads existing exchange rates along with the current company currency associated with your portal.
   */
  | "settings.currencies.read"
  /**
   * Create, update and delete exchange rates along with updating the company currency associated with your portal.
   */
  | "settings.currencies.write"
  /**
   * View details about account users and their permissions.
   */
  | "settings.users.read"
  /**
   * Manage users and user permissions on your HubSpot account. This includes creating new users, assigning permissions and roles, and deleting existing users.
   */
  | "settings.users.write"
  /**
   * See details about the account's teams.
   */
  | "settings.users.teams.read"
  /**
   * Assign users to teams on your HubSpot account.
   */
  | "settings.users.team.write"
  /**
   * Includes access to account activity logs and other account security information.
   */
  | "account-info.security.read"
  /**
   * Allows HubSpot and the accounting integration to share invoice, product, and contact details.
   */
  | "accounting"
  /**
   * Add forms to the contact's pages that do custom actions.
   */
  | "actions"
  /**
   * Includes access to send custom behavioral events.
   */
  | "analytics.behavioral_events.send"
  /**
   * This includes workflows.
   */
  | "automation"
  /**
   * Create, read, update, or delete behavioral events. This includes behavioral event properties.
   */
  | "behavioral_events.event_definitions.read_write"
  /**
   * Integrators can view CMS domains in a customer's account.
   */
  | "business_units.view.read"
  /**
   * This includes endpoints that sit on top of sources and email.
   */
  | "business-intelligence"
  /**
   * Query data from your HubSpot account using the GraphQL API endpoint
   */
  | "collector.graphql_query.execute"
  /**
   * Perform introspection queries via GraphQL application clients such as GraphQL
   */
  | "collector.graphql_schema.read"
  /**
   * View details of your contacts' subscription preferences.
   */
  | "communication_preferences.read"
  /**
   * Subscribe/unsubscribe contacts to your subscription types. It won't subscribe contacts who have unsubscribed.
   */
  | "communication_preferences.read_write"
  /**
   * Subscribe/unsubscribe contacts to your subscription types. It won't subscribe contacts who have unsubscribed.
   */
  | "communication_preferences.write"
  /**
   * This includes access to File Manager.
   */
  | "content"
  /**
   * View details about threads in the conversations inbox.
   */
  | "conversations.read"
  /**
   * Fetch identification tokens for authenticated website visitors interacting with the HubSpot chat widget.
   */
  | "conversations.visitor_identification.tokens.create"
  /**
   * Send messages in conversations. Create and update message threads.
   */
  | "conversations.write"
  /**
   * Export records from your CRM for all CRM data types.
   */
  | "crm.export"
  /**
   * Allows you to import records into your CRM. This includes creating new records or modifying any of your existing records for all CRM data types (contacts, companies, deals, tickets, etc). It doesn't include archiving or deleting any data.
   */
  | "crm.import"
  /**
   * Allows read access for CTAs.
   */
  | "ctas.read"
  /**
   * This includes access to e-commerce features.
   */
  | "e-commerce"
  /**
   * Includes the ability to rename, delete, and clone existing forms.
   */
  | "external_integrations.forms.access"
  /**
   * This includes access to File Manager.
   */
  | "files"
  /**
   * View details or download user files, attachments, and system files from all HubSpot tools.
   */
  | "files.ui_hidden.read"
  /**
   * This includes access to the Forms endpoints.
   */
  | "forms"
  /**
   * Download files submitted through a form.
   */
  | "forms-uploaded-files"
  /**
   * This includes access to HubDB.
   */
  | "hubdb"
  /**
   * This exposes the sync API, which allows syncing of most CRM objects.
   */
  | "integration-sync"
  /**
   * Grants access to events and objects from the media bridge.
   */
  | "media_bridge.read"
  /**
   * Grants access to create and update events and objects from the media bridge.
   */
  | "media_bridge.write"
  /**
   * Basic scope required for OAuth. This scope is added by default to all apps.
   */
  | "oauth"
  /**
   * Grants access to read all details of one-to-one emails sent to contacts.
   */
  | "sales-email-read"
  /**
   * This includes Social Inbox.
   */
  | "social"
  /**
   * This includes access to tickets.
   */
  | "tickets"
  /**
   * Grants access to manage custom events on HubSpot CRM records. This includes creating or updating records.
   */
  | "timeline"
  /**
   * This includes transactional emails and the transactional emails endpoints.
   */
  | "transactional-email";
