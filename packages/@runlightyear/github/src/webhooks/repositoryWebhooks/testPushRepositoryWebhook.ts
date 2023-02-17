import { Github } from "../../Github";

export interface TestPushRepositoryWebhookProps {
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
 * Test the push repository webhook
 *
 * This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated.
 */
const testPushRepositoryWebhook =
  (self: Github) => async (props: TestPushRepositoryWebhookProps) => {
    const { owner, repo, hookId } = props;

    return self.post({
      url: `/repos/${owner}/${repo}/hooks/${hookId}/tests`,
    });
  };

export default testPushRepositoryWebhook;
