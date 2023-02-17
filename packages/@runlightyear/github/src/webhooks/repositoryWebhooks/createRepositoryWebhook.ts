import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Github } from "../../Github";
import WebhookEvent from "../../types/WebhookEvent";
import WebhookConfig from "../../types/WebhookConfig";

export interface CreateRepositoryWebhookProps {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  /**
   * Use web to create a webhook. Default: web. This parameter only accepts the value web.
   */
  name?: "web";
  /**
   * Key/value pairs to provide settings for this webhook.
   */
  config?: WebhookConfig;
  /**
   * Determines what events the hook is triggered for. Default: push
   */
  events?: Array<WebhookEvent>;
  /**
   * Determines if notifications are sent when the webhook is triggered. Set to true to send notifications. Default: true
   */
  active?: boolean;
}

export interface CreateRepositoryWebhookResponse extends HttpProxyResponse {
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
 * Create a repository webhook
 *
 * Repositories can have multiple webhooks installed. Each webhook should have a unique config. Multiple webhooks can share the same config as long as those webhooks do not have any events that overlap.
 */

const createRepositoryWebhook =
  (self: Github) =>
  async (
    props: CreateRepositoryWebhookProps
  ): Promise<CreateRepositoryWebhookResponse> => {
    const { owner, repo, name, config, events, active } = props;

    return self.post({
      url: `/repos/${owner}/${repo}/hooks`,
      data: {
        name,
        config: config && {
          url: config.url,
          content_type: "json",
          secret: config.secret,
          insecure_ssl: config.insecureSSL,
          token: config.token,
          digest: config.digest,
        },
        events,
        active,
      },
    });
  };

export default createRepositoryWebhook;
