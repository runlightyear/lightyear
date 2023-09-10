export interface MultiSelectFilterCondition {
  /**
   * The value to compare the multi-select property value against.
   *
   * Returns database entries where the multi-select value contains the provided string.
   */
  contains?: string;

  /**
   * The value to the multi-select property value against.
   *
   * Returns database entries where the multi-select value does not contain the provided string.
   */
  doesNotContain?: string;

  /**
   * Whether the multi-select property value is empty.
   *
   * Returns database entries where the multi-select value does not contain any data.
   */
  isEmpty?: true;

  /**
   * Whether the multi-select property value is not empty.
   *
   * Returns database entries where the multi-select value does contains data.
   */
  isNotEmpty?: true;
}
