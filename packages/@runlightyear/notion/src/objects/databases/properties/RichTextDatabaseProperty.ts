import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface RichTextDatabaseProperty extends BaseDatabaseProperty {
  type: "rich_text";
  richText: {};
}

export interface RichTextDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  richText: {};
}
