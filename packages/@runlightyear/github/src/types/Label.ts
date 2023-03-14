/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#label
 */
export type Label = {
  /**
   * 6-character hex code, without the leading #, identifying the color
   */
  color: string;

  default: boolean;

  description: string | null;

  id: number;

  /**
   * The name of the label.
   */
  name: string;

  nodeId: string;

  /**
   * URL for the label
   */
  url: string;
};
