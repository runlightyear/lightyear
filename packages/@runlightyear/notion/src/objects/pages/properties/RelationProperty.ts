import { PageRef } from "../PageRef";

export interface RelationProperty {
  id: string;
  type: "relation";
  relation: Array<PageRef>;
}

export interface RelationPropertyInput {
  relation: Array<PageRef>;
}
