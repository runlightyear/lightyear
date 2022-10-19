import { subscribeIndex, unsubscribeIndex } from "../base/subscription";
import { Auths } from "../run";

interface SubscribeProps {
  name: string;
  subscribeArgs: object;
  auths: Auths;
}

export async function subscribe(props: SubscribeProps) {
  const { name, subscribeArgs, auths } = props;
  const fn = subscribeIndex[name];
  if (!fn) {
    console.error(`Unknown subscription: ${name}`);
  }

  return await fn({ subscribeArgs, auths });
}

interface UnsubscribeProps {
  name: string;
  unsubscribeArgs: object;
  auths: Auths;
}

export async function unsubscribe(props: UnsubscribeProps) {
  const { name, unsubscribeArgs, auths } = props;
  const fn = unsubscribeIndex[name];
  if (!fn) {
    console.error(`Unknown subscription: ${name}`);
  }

  await fn({ unsubscribeArgs, auths });
}
