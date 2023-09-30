export interface WebhookTableMetadataChanged {
  current: {
    name?: string;
    description?: string | null;
  };
  previous?: {
    name?: string;
    description?: string | null;
  };
}
