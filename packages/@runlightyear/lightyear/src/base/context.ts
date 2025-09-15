export interface Context {
  operation?: string;
  actionName?: string;
  webhookName?: string;
  runId?: string;
  syncId?: string;
  // The integration we are executing within
  integrationName?: string;
  // Managed user we are running on behalf of
  managedUserId?: string;
  managedUserExternalId?: string;
  managedUserDisplayName?: string | null;
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
