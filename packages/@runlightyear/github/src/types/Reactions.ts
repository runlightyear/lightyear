/**
 * Documentation: Several places, including https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#issues
 */

export type Reactions = {
  "+1": number;
  "-1": number;
  confused: number;
  eyes: number;
  heart: number;
  hooray: number;
  laugh: number;
  rocket: number;
  totalCount: number;
  url: string;
};
