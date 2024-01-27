/**
 *
 * Search
 * Docs
 * Tutorials
 * Your apps
 * Start here: platform overview
 * Next generation Slack platform
 * Getting started
 * Automation
 *
 * Slack CLI
 *
 * Deno & TypeScript
 *
 * Slack apps
 * Getting started
 * Developing Slack apps
 *
 * App Directory
 *
 * Authentication
 *
 * Messaging
 *
 * Surfaces
 *
 * Block Kit
 *
 * Interactivity
 *
 * APIs
 *
 * Legacy
 *
 * Workflow Builder
 * Getting started
 * Workflows for users
 *
 * Workflows for developers
 *
 * Reference
 *
 * Administration
 * Enterprise
 *
 * Apps for Admins
 *
 * Legal Holds API
 *
 * Audit Logs API
 *
 * SCIM API
 *
 * Reference
 * Translated content
 * 🇯🇵 日本語版ページ
 * Gov Slack
 * Stay updated
 *
 * Tools and resources
 *
 * Community
 *
 * View all API methods
 * team.info
 * View another method
 * Gets information about the current team.
 *
 * Reference docs
 * Tester
 * Facts
 * Method access
 * HTTP
 * JavaScript
 * Python
 * Java
 * GET
 * https://slack.com/api/team.info
 * Required scopes
 * Bot tokens
 * team:read
 * User tokens
 * team:read
 * Legacy bot tokens
 * bot
 * Content types
 * application/x-www-form-urlencoded
 * Rate limits
 * Tier 3
 * Arguments
 * Required arguments
 * token
 * token
 * ·Required
 * Authentication token bearing required scopes. Tokens should be passed as an HTTP Authorization header or alternatively, as a POST parameter.
 *
 * Example
 * xxxx-xxxxxxxxx-xxxx
 * Optional arguments
 * domain
 * string
 * ·Optional
 * Query by domain instead of team (only when team is null). This only works for domains in the same enterprise as the querying team token. This also expects the domain to belong to a team and not the enterprise itself. This is the value set up for the 'Joining This Workspace' workspace setting. If it contains more than one domain, the field will contain multiple comma-separated domain values. If no domain is set, the field is empty.
 *
 * team
 * string
 * ·Optional
 * Team to get info about; if omitted, will return information about the current team.
 *
 * Example
 * T1234567890
 * Usage info
 * This method provides information about your team.
 *
 * Team Icon
 * If a team has not yet set a custom icon, the value of team.icon.image_default will be true.
 *
 * If the team belongs to an Enterprise Grid, the enterprise_id and enterprise_name fields will indicate the owning enterprise organization.
 *
 * Example responses
 * Common successful response
 * Typical success response
 *
 * {
 *     "ok": true,
 *     "team": {
 *         "id": "T12345",
 *         "name": "My Team",
 *         "domain": "example",
 *         "email_domain": "example.com",
 *         "icon": {
 *             "image_34": "https://...",
 *             "image_44": "https://...",
 *             "image_68": "https://...",
 *             "image_88": "https://...",
 *             "image_102": "https://...",
 *             "image_132": "https://...",
 *             "image_default": true
 *         },
 *         "enterprise_id": "E1234A12AB",
 *         "enterprise_name": "Umbrella Corporation"
 *     }
 * }
 * Common error response
 * Typical error response
 *
 * {
 *     "ok": false,
 *     "error": "invalid_auth"
 * }
 * Errors
 * This table lists the expected errors that this method could return. However, other errors can be returned in the case where the service is down or other unexpected factors affect processing. Callers should always check the value of the ok params in the response.
 *
 * Error	Description
 * enterprise_not_found
 * The enterprise was not found.
 *
 * fail_to_get_teams_for_restricted_user
 * Failed to get teams for restricted user.
 *
 * missing_user
 * The user was not found.
 *
 * org_not_found
 * The org was not found.
 *
 * team_not_found
 * The team was not found.
 *
 * team_not_on_enterprise
 * Cannot query team by domain because team is not on an enterprise.
 *
 * user_not_found
 * The user was not found.
 *
 * access_denied
 * Access to a resource specified in the request is denied.
 *
 * account_inactive
 * Authentication token is for a deleted user or workspace when using a bot token.
 *
 * deprecated_endpoint
 * The endpoint has been deprecated.
 *
 * ekm_access_denied
 * Administrators have suspended the ability to post a message.
 *
 * enterprise_is_restricted
 * The method cannot be called from an Enterprise.
 *
 * invalid_auth
 * Some aspect of authentication cannot be validated. Either the provided token is invalid or the request originates from an IP address disallowed from making the request.
 *
 * method_deprecated
 * The method has been deprecated.
 *
 * missing_scope
 * The token used is not granted the specific scope permissions required to complete this request.
 *
 * not_allowed_token_type
 * The token type used in this request is not allowed.
 *
 * not_authed
 * No authentication token provided.
 *
 * no_permission
 * The workspace token used in this request does not have the permissions necessary to complete the request. Make sure your app is a member of the conversation it's attempting to post a message to.
 *
 * org_login_required
 * The workspace is undergoing an enterprise migration and will not be available until migration is complete.
 *
 * token_expired
 * Authentication token has expired
 *
 * token_revoked
 * Authentication token is for a deleted user or workspace or the app has been removed when using a user token.
 *
 * two_factor_setup_required
 * Two factor setup is required.
 *
 * accesslimited
 * Access to this method is limited on the current network
 *
 * fatal_error
 * The server could not complete your operation(s) without encountering a catastrophic error. It's possible some aspect of the operation succeeded before the error was raised.
 *
 * internal_error
 * The server could not complete your operation(s) without encountering an error, likely due to a transient issue on our end. It's possible some aspect of the operation succeeded before the error was raised.
 *
 * invalid_arg_name
 * The method was passed an argument whose name falls outside the bounds of accepted or expected values. This includes very long names and names with non-alphanumeric characters other than _. If you get this error, it is typically an indication that you have made a very malformed API call.
 *
 * invalid_arguments
 * The method was either called with invalid arguments or some detail about the arguments passed is invalid, which is more likely when using complex arguments like blocks or attachments.
 *
 * invalid_array_arg
 * The method was passed an array as an argument. Please only input valid strings.
 *
 * invalid_charset
 * The method was called via a POST request, but the charset specified in the Content-Type header was invalid. Valid charset names are: utf-8 iso-8859-1.
 *
 * invalid_form_data
 * The method was called via a POST request with Content-Type application/x-www-form-urlencoded or multipart/form-data, but the form data was either missing or syntactically invalid.
 *
 * invalid_post_type
 * The method was called via a POST request, but the specified Content-Type was invalid. Valid types are: application/json application/x-www-form-urlencoded multipart/form-data text/plain.
 *
 * missing_post_type
 * The method was called via a POST request and included a data payload, but the request did not include a Content-Type header.
 *
 * ratelimited
 * The request has been ratelimited. Refer to the Retry-After header for when to retry the request.
 *
 * request_timeout
 * The method was called via a POST request, but the POST data was either missing or truncated.
 *
 * service_unavailable
 * The service is temporarily unavailable
 *
 * team_added_to_org
 * The workspace associated with your request is currently undergoing migration to an Enterprise Organization. Web API and other platform operations will be intermittently unavailable until the transition is complete.
 *
 * Warnings
 * This table lists the expected warnings that this method will return. However, other warnings can be returned in the case where the service is experiencing unexpected trouble.
 *
 * Warning	Description
 * missing_charset
 * The method was called via a POST request, and recommended practice for the specified Content-Type is to include a charset parameter. However, no charset was present. Specifically, non-form-data content types (e.g. text/plain) are the ones for which charset is recommended.
 *
 * superfluous_charset
 * The method was called via a POST request, and the specified Content-Type is not defined to understand the charset parameter. However, charset was in fact present. Specifically, form-data content types (e.g. multipart/form-data) are the ones for which charset is superfluous.
 *
 * On this page
 * Notices
 * Facts
 * Arguments
 * Usage info
 * Example responses
 * Errors
 * Warnings
 * Status
 * Policy
 * Terms
 * How would you rate this page?
 *
 * 😍
 * 😕
 * 😡
 * Subscribe to our developer changelog
 *
 * Connect with our platform community
 *
 * Need help? Contact developer support
 */
import { Slack } from "../Slack";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Team } from "../types/Team";

export interface GetTeamInfoProps {
  /**
   * Query by domain instead of team (only when team is null). This only works for domains in the same enterprise as the querying team token. This also expects the domain to belong to a team and not the enterprise itself. This is the value set up for the 'Joining This Workspace' workspace setting. If it contains more than one domain, the field will contain multiple comma-separated domain values. If no domain is set, the field is empty.
   *
   * Example
   *   example
   */
  domain?: string;

  /**
   * Team to get info about; if omitted, will return information about the current team.
   *
   * Example
   *   T1234567890
   */
  team?: string;
}

export interface GetTeamInfoResponseData {
  ok: true;
  team: Team;
}

export interface GetTeamInfoResponse extends HttpProxyResponse {
  data: GetTeamInfoResponseData;
}

export const getTeamInfo =
  (self: Slack) =>
  async (props?: GetTeamInfoProps): Promise<GetTeamInfoResponse> => {
    const { domain, team } = props || {};

    return self.post({
      url: "team.info",
      data: {
        domain,
        team,
      },
    });
  };
