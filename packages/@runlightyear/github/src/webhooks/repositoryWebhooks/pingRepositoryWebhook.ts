import { Github } from "../../Github";

export interface PingRepositoryWebhookOptions {
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
}

/**
 * Ping a repository webhook
 *
 * This will trigger a ping event to be sent to the hook.
 */
const pingRepositoryWebhook =
  (self: Github) => async (options: PingRepositoryWebhookOptions) => {
    const { owner, repo, hookId } = options;

    return self.post({
      url: `/repos/${owner}/${repo}/hooks/${hookId}/pings`,
    });
  };

export default pingRepositoryWebhook;
