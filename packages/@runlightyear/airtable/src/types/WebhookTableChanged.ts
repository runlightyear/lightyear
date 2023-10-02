import { WebhookRecordChanged } from "./WebhookRecordChanged";
import { WebhookRecordCreated } from "./WebhookRecordCreated";
import { WebhookFieldCreated } from "./WebhookFieldCreated";
import { WebhookFieldChanged } from "./WebhookFieldChanged";
import { WebhookTableMetadataChanged } from "./WebhookTableMetadataChanged";
import { WebhookViewChanged } from "./WebhookViewChanged";

export interface WebhookTableChanged {
  changedViewsById?: Record<string, WebhookViewChanged>;
  changedFieldsById?: Record<string, WebhookFieldChanged>;
  changedRecordsById?: Record<string, WebhookRecordChanged>;
  createdFieldsById?: Record<string, WebhookFieldCreated>;
  createdRecordsById?: Record<string, WebhookRecordCreated>;
  changedMetadata?: WebhookTableMetadataChanged;
  destroyedFieldIds?: string[];
  destroyedRecordIds?: string[];
}
