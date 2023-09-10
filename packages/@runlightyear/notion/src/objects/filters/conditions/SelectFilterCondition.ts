export interface SelectFilterCondition {
  /**
   * The string to compare the select property value against.
   *
   * Returns database entries where the select property value matches the provided string.
   */
  equals?: string;

  /**
   * The string to compare the select property value against.
   *
   * Returns database entries where the select property value does not match the provided string.
   */
  doesNotEqual?: string;

  /**
   * Whether the select property value does not contain data.
   *
   * Returns database entries where the select property value is empty.
   */
  isEmpty?: true;

  /**
   * Whether the select property value contains data.
   *
   * Returns database entries where the select property value is not empty.
   */
  isNotEmpty?: true;
}
