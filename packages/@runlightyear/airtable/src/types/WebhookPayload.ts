import { WebhookAction } from "./WebhookAction";
import { WebhookTableChanged } from "./WebhookTableChanged";
import { WebhookTableCreated } from "./WebhookTableCreated";

export type WebhookPayload = WebhookPayloadSuccess | WebhookPayloadError;

export interface WebhookPayloadSuccess {
  actionMetadata: WebhookAction;
  baseTransactionNumber: number;
  payloadFormat: string;
  timestamp: string;
  changedTablesById?: Record<string, WebhookTableChanged>;
  createdTablesById?: Record<string, WebhookTableCreated>;
  destroyedTableIds?: Array<string>;
}

export interface WebhookPayloadError extends WebhookPayloadSuccess {
  error: true;
  code: "INVALID_FILTERS" | "INVALID_HOOK" | "INTERNAL_ERROR";
}
