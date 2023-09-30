export interface WebhookRecordChanged {
  current: {
    cellValuesByFieldId: Record<string, any>;
  };
  previous: {
    cellValuesByFieldId: Record<string, any>;
  };
  unchanged: {
    cellValuesByFieldId: Record<string, any>;
  };
}
