export interface StatusFilterCondition {
  /**
   * The string to compare the status property value against.
   *
   * Returns database entries where the status property value matches the provided string.
   */
  equals?: string;

  /**
   * The string to compare the status property value against.
   *
   * Returns database entries where the status property value does not match the provided string.
   */
  doesNotEqual?: string;

  /**
   * Whether the status property value does not contain data.
   *
   * Returns database entries where the status property value is empty.
   */
  isEmpty?: true;

  /**
   * Whether the status property value contains data.
   *
   * Returns database entries where the status property value is not empty.
   */
  isNotEmpty?: true;
}
