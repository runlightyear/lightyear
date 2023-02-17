import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Github } from "../../Github";
import WebhookConfig from "../WebhookConfig";
import WebhookEvent from "../WebhookEvent";

export interface UpdateRepositoryWebhookProps {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  /**
   * The unique identifier of the hook.
   */
  hookId: number;
  /**
   * Key/value pairs to provide settings for this webhook.
   */
  config?: WebhookConfig;
  /**
   * Determines what events the hook is triggered for. This replaces the entire array of events.
   *
   * Default: push
   */
  events?: Array<string>;
  /**
   * Determines a list of events to be added to the list of events that the Hook triggers for.
   */
  addEvents?: Array<string>;
  /**
   * Determines a list of events to be removed from the list of events that the Hook triggers for.
   */
  removeEvents?: Array<string>;
  /**
   * Determines if notifications are sent when the webhook is triggered. Set to true to send notifications.
   *
   * Default: true
   */
  active?: boolean;
}

export interface UpdateRepositoryWebhookResponse extends HttpProxyResponse {
  data: {
    type: string;
    /**
     * Unique identifier of the webhook.
     */
    id: number;
    /**
     * The name of a valid service, use 'web' for a webhook.
     */
    name: string;
    /**
     * Determines whether the hook is actually triggered on pushes.
     */
    active: boolean;
    /**
     * Determines what events the hook is triggered for. Default: ['push'].
     */
    events: WebhookEvent[];
    config: object;
    updatedAt: string;
    createdAt: string;
    url: string;
    testUrl: string;
    pingUrl: string;
    deliveriesUrl: string;
    lastResponse: object;
  };
}

/**
 * Update a repository webhook
 *
 * Updates a webhook configured in a repository. If you previously had a secret set, you must provide the same secret or set a new secret or the secret will be removed. If you are only updating individual webhook config properties, use "Update a webhook configuration for a repository."
 */
const updateRepositoryWebhook =
  (self: Github) =>
  async (
    props: UpdateRepositoryWebhookProps
  ): Promise<UpdateRepositoryWebhookResponse> => {
    const {
      owner,
      repo,
      hookId,
      config,
      events,
      addEvents,
      removeEvents,
      active,
    } = props;

    return self.patch({
      url: `/repos/${owner}/${repo}/hooks/${hookId}`,
      data: {
        config: config && {
          url: config.url,
          content_type: "json",
          secret: config.secret,
          insecure_ssl: config.insecureSSL,
          // address: config.address,
          // room: config.room,
        },
        events,
        add_events: addEvents,
        remove_events: removeEvents,
        active,
      },
    });
  };

export default updateRepositoryWebhook;
