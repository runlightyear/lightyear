import { NotionID } from "./NotionID";

export interface PeopleFilterCondition {
  /**
   * The value to compare the people property value against.
   *
   * Returns database entries where the people property value contains the provided string.
   */
  contains?: NotionID;

  /**
   * The value to compare the people property value against.
   *
   * Returns database entries where the people property value does not contain the provided string.
   */
  doesNotContain?: NotionID;

  /**
   * Whether the people property value does not contain any data.
   *
   * Returns database entries where the people property value does not contain any data.
   */
  isEmpty?: true;

  /**
   * Whether the people property value contains data.
   *
   * Returns database entries where the people property value is not empty.
   */
  isNotEmpty?: true;
}
