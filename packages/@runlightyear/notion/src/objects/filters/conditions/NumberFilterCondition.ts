export interface NumberFilterCondition {
  /**
   * The number to compare the number property value against.
   *
   * Returns database entries where the number property value differs from the provided number.
   */
  doesNotEqual?: number;

  /**
   * The number to compare the number property value against.
   *
   * Returns database entries where the number property value is the same as the provided number.
   */
  equals?: number;

  /**
   * The number to compare the number property value against.
   *
   * Returns database entries where the number property value exceeds the provided number.
   */
  greaterThan?: number;

  /**
   * The number to compare the number property value against.
   *
   * Returns database entries where the number property value is equal to or exceeds the provided number.
   */
  greaterThanOrEqualTo?: number;

  /**
   * Whether the number property value is empty.
   *
   * Returns database entries where the number property value does not contain any data.
   */
  isEmpty?: true;

  /**
   * Whether the number property value is not empty.
   *
   * Returns database entries where the number property value contains data.
   */
  isNotEmpty?: true;

  /**
   * The number to compare the number property value against.
   *
   * Returns database entries where the page property value is less than the provided number.
   */
  lessThan?: number;

  /**
   * The number to compare the number property value against.
   *
   * Returns database entries where the page property value is equal to or is less than the provided number.
   */
  lessThanOrEqualTo?: number;
}
