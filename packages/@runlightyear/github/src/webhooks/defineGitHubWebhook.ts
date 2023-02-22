import WebhookEvent from "../types/WebhookEvent";
import { defineWebhook } from "@runlightyear/lightyear";
import type { SubscribePropsFuncProps } from "@runlightyear/lightyear";
import { GitHub } from "../GitHub";

export type GitHubWebhookSubscribeProps = {
  /**
   * The account owner of the repository. The name is not case sensitive.
   */
  owner: string;
  /**
   * The name of the repository. The name is not case sensitive.
   */
  repo: string;
  /**
   * Determines what events the hook is triggered for. Default: push
   */
  events?: Array<WebhookEvent>;
};

export type GitHubWebhookSubscribePropsFunc = (
  props: SubscribePropsFuncProps
) => GitHubWebhookSubscribeProps;

export interface DefineGitHubWebhookProps {
  name: string;
  title: string;
  variables?: Array<string>;
  secrets?: Array<string>;
  subscribeProps: GitHubWebhookSubscribePropsFunc;
}

const defineGitHubWebhook = (props: DefineGitHubWebhookProps) => {
  const { name, title, variables, secrets, subscribeProps } = props;

  return defineWebhook({
    name,
    title,
    apps: ["github"],
    variables,
    secrets,
    subscribeProps,
    subscribe: async ({ auths, endpoint, subscribeProps }) => {
      console.debug("Subscribing to GitHub webhook");
      console.debug("subscribeProps", subscribeProps);

      const github = new GitHub({ auth: auths.github });

      const response = await github.createRepositoryWebhook({
        owner: subscribeProps.owner,
        repo: subscribeProps.repo,
        events: subscribeProps.events,
        config: {
          url: endpoint,
        },
      });

      console.info("Subscribed to GitHub webhook");

      const unsubscribeProps = {
        hookId: response.data.id,
        owner: subscribeProps.owner,
        repo: subscribeProps.repo,
      };

      console.debug("Unsubscribe props", unsubscribeProps);

      return unsubscribeProps;
    },
    unsubscribe: async ({ auths, unsubscribeProps }) => {
      console.debug("Unsubscribing from GitHub webhook");
      console.debug("unsubscribeProps", unsubscribeProps);

      const github = new GitHub({ auth: auths.github });

      await github.deleteRepositoryWebhook({
        owner: unsubscribeProps.owner,
        repo: unsubscribeProps.repo,
        hookId: unsubscribeProps.hookId,
      });

      console.info("Unsubscribed from GitHub webhook");
    },
  });
};

export default defineGitHubWebhook;
