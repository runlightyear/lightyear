import { WebhookFieldCreated } from "./WebhookFieldCreated";
import { WebhookRecordCreated } from "./WebhookRecordCreated";
import { WebhookTableMetadata } from "./WebhookTableMetadata";

export interface WebhookTableCreated {
  fieldsById?: Record<string, WebhookFieldCreated>;
  recordsById?: Record<string, WebhookRecordCreated>;
  metadata?: WebhookTableMetadata;
}
