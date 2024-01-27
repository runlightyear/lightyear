export interface WebhookDelivery {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  headers: {
    [key: string]: string;
  };
  body?: string;
}

export interface AppWebhookDeliveryResponse {
  response: {
    statusCode: number;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  };
  forward: {
    identifier: string;
    filter?: string;
    data: any;
  } | null;
}

export interface WebhookDeliveryResponse {
  response: {
    status: number;
    headers?: {
      [key: string]: string;
    };
    body?: string;
  };
  triggerActions: boolean;
}
