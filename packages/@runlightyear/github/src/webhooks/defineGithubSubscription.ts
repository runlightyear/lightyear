import {
  defineSubscription,
  SubscribeArgsProps,
} from "@runlightyear/lightyear";
import { Github } from "../Github";
import { CreateRepositoryWebhookOptions } from "./repositoryWebhooks/createRepositoryWebhook";

export interface DefineSubscriptionOptions {
  name: string;
  auth: string;
  variables?: {
    [name: string]: string;
  };
  secrets?: {
    [name: string]: string;
  };
  webhook: string;
  subscribeArgs: (
    args: SubscribeArgsProps
  ) => Promise<CreateRepositoryWebhookOptions>;
}

const defineGithubSubscription = (
  options: DefineSubscriptionOptions
): string => {
  const { name, auth, variables, secrets, webhook, subscribeArgs } = options;

  return defineSubscription({
    name,
    auths: { github: auth },
    variables,
    secrets,
    webhook,
    subscribeArgs,
    subscribe: async ({ subscribeArgs, auths }) => {
      const github = new Github({ auth: auths.github });

      const { data } = await github.createRepositoryWebhook(
        subscribeArgs as CreateRepositoryWebhookOptions
      );

      const { repo, owner } = subscribeArgs as CreateRepositoryWebhookOptions;
      return { repo, owner, hookId: data.id };
    },
    unsubscribe: async ({ unsubscribeArgs, auths }) => {
      const { repo, owner, hookId } = unsubscribeArgs as any;
      const github = new Github({ auth: auths.github });

      await github.deleteRepositoryWebhook({ repo, owner, hookId });
    },
  });
};

export default defineGithubSubscription;
