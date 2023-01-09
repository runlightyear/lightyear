import { Auths } from "../run";
import {
  SubscribeFuncProps,
  subscribeIndex,
  UnsubscribeFuncProps,
  unsubscribeIndex,
} from "../base/webhook";

export async function subscribe(
  webhookName: string,
  subscribeFuncProps: SubscribeFuncProps
) {
  const fn = subscribeIndex[webhookName];
  if (!fn) {
    console.error(`Unknown subscription: ${webhookName}`);
  }

  return await fn(subscribeFuncProps);
}

interface UnsubscribeProps {
  name: string;
  unsubscribeArgs: object;
  auths: Auths;
}

export async function unsubscribe(
  webhookName: string,
  unsubscribeFuncProps: UnsubscribeFuncProps
) {
  const fn = unsubscribeIndex[webhookName];
  if (!fn) {
    console.error(`Unknown webhook: ${webhookName}`);
  }

  await fn(unsubscribeFuncProps);
}
