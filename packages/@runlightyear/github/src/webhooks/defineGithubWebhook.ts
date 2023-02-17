import WebhookEvent from "../types/WebhookEvent";
import { defineWebhook } from "@runlightyear/lightyear";
import type { SubscribePropsFuncProps } from "@runlightyear/lightyear";
import { Github } from "../Github";

export type GithubWebhookSubscribeProps = {
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

export type GithubWebhookSubscribePropsFunc = (
  props: SubscribePropsFuncProps
) => GithubWebhookSubscribeProps;

export interface DefineGithubWebhookProps {
  name: string;
  title: string;
  variables?: Array<string>;
  secrets?: Array<string>;
  subscribeProps: GithubWebhookSubscribePropsFunc;
}

const defineGithubWebhook = (props: DefineGithubWebhookProps) => {
  const { name, title, variables, secrets, subscribeProps } = props;

  return defineWebhook({
    name,
    title,
    apps: ["github"],
    variables,
    secrets,
    subscribeProps,
    subscribe: async ({ auths, endpoint, subscribeProps }) => {
      console.debug("Subscribing to Github webhook");
      console.debug("subscribeProps", subscribeProps);

      const github = new Github({ auth: auths.github });

      const response = await github.createRepositoryWebhook({
        owner: subscribeProps.owner,
        repo: subscribeProps.repo,
        events: subscribeProps.events,
        config: {
          url: endpoint,
        },
      });

      console.info("Subscribed to Github webhook");

      const unsubscribeProps = {
        hookId: response.data.id,
        owner: subscribeProps.owner,
        repo: subscribeProps.repo,
      };

      console.debug("Unsubscribe props", unsubscribeProps);

      return unsubscribeProps;
    },
    unsubscribe: async ({ auths, unsubscribeProps }) => {
      console.debug("Unsubscribing from Github webhook");
      console.debug("unsubscribeProps", unsubscribeProps);

      const github = new Github({ auth: auths.github });

      await github.deleteRepositoryWebhook({
        owner: unsubscribeProps.owner,
        repo: unsubscribeProps.repo,
        hookId: unsubscribeProps.hookId,
      });

      console.info("Unsubscribed from Github webhook");
    },
  });
};

export default defineGithubWebhook;
