import { GitHub } from "../../GitHub";
import WebhookEvent from "../../types/WebhookEvent";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface ListRepositoryWebhooksProps {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  /**
   * The number of results per page (max 100).
   *
   * Default: 30
   */
  perPage?: number;
  /**
   * Page number of the results to fetch.
   *
   * Default: 1
   */
  page?: number;
}

export interface ListRepositoryWebhooksResponse extends HttpProxyResponse {
  data: Array<{
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
    events: Array<WebhookEvent>;
    config: object;
    updatedAt: string;
    createdAt: string;
    url: string;
    testUrl: string;
    pingUrl: string;
    deliveriesUrl: string;
    lastResponse: {
      code?: number;
      status?: string;
      message?: string;
    };
  }>;
}

/**
 * List repository webhooks
 */
const listRepositoryWebhooks =
  (self: GitHub) =>
  async (
    props: ListRepositoryWebhooksProps
  ): Promise<ListRepositoryWebhooksResponse> => {
    const { owner, repo, perPage, page } = props;

    return await self.get({
      url: `/repos/${owner}/${repo}/hooks`,
      params: {
        per_page: perPage,
        page,
      },
    });
  };

export default listRepositoryWebhooks;
