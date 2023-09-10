import { NotionId } from "../../types/NotionId";

export interface RelationFilterCondition {
  /**
   * The value to compare the relation property value against.
   *
   * Returns database entries where the relation property value contains the provided string.
   */
  contains?: NotionId;

  /**
   * The value to compare the relation property value against.
   *
   * Returns entries where the relation property value does not contain the provided string.
   */
  doesNotContain?: NotionId;

  /**
   * Whether the relation property value does not contain data.
   *
   * Returns database entries where the relation property value does not contain any data.
   */
  isEmpty?: true;

  /**
   * Whether the relation property value contains data.
   *
   * Returns database entries where the property value is not empty.
   */
  isNotEmpty?: true;
}
