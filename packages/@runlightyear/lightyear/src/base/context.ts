export interface Context {
  operation?: string;
  actionName?: string;
  webhookName?: string;
}

export let context: Context = {};

export function setContext(ctx: Context) {
  context = ctx;
}

export function getContext() {
  return context;
}
