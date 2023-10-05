import { WebhookRecordChanged } from "./WebhookRecordChanged";
import { WebhookRecordCreated } from "./WebhookRecordCreated";

export interface WebhookViewChanged {
  changedRecordsById: Record<string, WebhookRecordChanged>;
  createdRecordsById?: Record<string, WebhookRecordCreated>;
  destroyedRecordIds?: string[];
}
