import WebhookEvent from "./WebhookEvent";
import { defineWebhook } from "@runlightyear/lightyear";
import { SubscribePropsFuncProps } from "@runlightyear/lightyear/src";
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
      console.info("Subscribing to Github webhook");

      const github = new Github({ auth: auths.github });

      const response = await github.createRepositoryWebhook({
        owner: subscribeProps.owner,
        repo: subscribeProps.repo,
        events: subscribeProps.events,
        config: {
          url: endpoint,
        },
      });

      return {
        hookId: response.data.id,
        owner: subscribeProps.owner,
        repo: subscribeProps.repo,
      };
    },
    unsubscribe: async ({ auths, unsubscribeProps }) => {
      console.info("Unsubscribing from Github webhook");

      const github = new Github({ auth: auths.github });

      await github.deleteRepositoryWebhook({
        owner: unsubscribeProps.owner,
        repo: unsubscribeProps.repo,
        hookId: unsubscribeProps.hookId,
      });
    },
  });
};

export default defineGithubWebhook;
