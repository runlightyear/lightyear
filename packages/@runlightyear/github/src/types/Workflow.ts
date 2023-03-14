/**
 * Documentation: Several places including https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#workflow_run
 */
export type Workflow = {
  badgeUrl: string;
  createdAt: string;
  htmlUrl: string;
  id: number;
  name: string;
  nodeId: string;
  path: string;
  state: string;
  updatedAt: string;
  url: string;
};
