export interface Context {
  operation?: string;
  actionName?: string;
  webhookName?: string;
}

export let context: Context = {};

export function setContext(ctx: Context) {
  console.debug("Setting context", ctx);
  context = ctx;
}

export function getContext() {
  console.debug("Getting context", context);
  return context;
}
