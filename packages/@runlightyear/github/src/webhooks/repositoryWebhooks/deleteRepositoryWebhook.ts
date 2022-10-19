import { Github } from "../../Github";

export interface DeleteRepositoryWebhookOptions {
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
 * Delete a repository webhook
 */
const deleteRepositoryWebhook =
  (self: Github) => async (options: DeleteRepositoryWebhookOptions) => {
    const { owner, repo, hookId } = options;

    return self.delete({
      url: `/repos/${owner}/${repo}/hooks/${hookId}`,
    });
  };

export default deleteRepositoryWebhook;
