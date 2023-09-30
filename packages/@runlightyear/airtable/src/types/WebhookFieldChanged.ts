import { FieldType } from "./Field";

export interface WebhookFieldChanged {
  current: {
    type?: FieldType;
    name?: string;
  };
  previous?: {
    type?: FieldType;
    name?: string;
  };
}
