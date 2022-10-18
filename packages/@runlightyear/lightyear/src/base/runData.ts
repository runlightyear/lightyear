export interface PollingData {
  triggeredAt: string;
  lastTriggeredAt: string | null;
}

export interface WebhookDeliveryData {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  headers: {
    [key: string]: string;
  };
  params: object;
  body: object;
}
