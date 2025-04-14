export interface Context {
  operation?: string;
  actionName?: string;
  webhookName?: string;
  runId?: string;
  syncId?: string;
}

export let context: Context = {};

export function setContext(ctx: Context) {
  console.debug("Setting context", ctx);
  context = { ...context, ...ctx };
}

export function getContext() {
  console.debug("Getting context", context);
  return context;
}
