import { Github } from "../../Github";

export interface GetRepositoryWebhookProps {
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
 * Get a repository webhook
 *
 * Returns a webhook configured in a repository. To get only the webhook config properties, see "Get a webhook configuration for a repository."
 */

const getRepositoryWebhook =
  (self: Github) => async (props: GetRepositoryWebhookProps) => {
    const { owner, repo, hookId } = props;

    return self.get({
      url: `/repos/${owner}/${repo}/hooks/${hookId}`,
    });
  };

export default getRepositoryWebhook;
