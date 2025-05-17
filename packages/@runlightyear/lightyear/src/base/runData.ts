/**
 * @internal
 */
export interface PollingData {
  triggeredAt: string;
  lastTriggeredAt: string | null;
}

export interface WebhookDeliveryHeaders {
  [key: string]: string;
}

export interface WebhookDeliveryData {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  headers: WebhookDeliveryHeaders;
  params: object;
  body: object;
}
