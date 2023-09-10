import { NotionId } from "../../types/NotionId";
import {
  BaseDatabaseProperty,
  BaseDatabasePropertyInput,
} from "./BaseDatabaseProperty";

export interface RelationDatabaseProperty extends BaseDatabaseProperty {
  type: "relation";
  relation: Relation;
}

export interface Relation {
  databaseId: NotionId;
  syncedPropertyId: string;
  syncedPropertyName: string;
}

export interface RelationDatabasePropertyInput
  extends BaseDatabasePropertyInput {
  relation: RelationInput;
}

export interface RelationInput {
  database_id: NotionId;
  syncedPropertyId: string;
  syncedPropertyName: string;
}
