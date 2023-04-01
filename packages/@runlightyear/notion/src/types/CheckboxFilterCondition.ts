export interface CheckboxFilterCondition {
  /**
   * Whether a checkbox property value matches the provided value exactly.
   *
   * Returns or excludes all database entries with an exact value match.  false
   */
  equals?: boolean;

  /**
   * Whether a checkbox property value differs from the provided value.
   *
   * Returns or excludes all database entries with a difference in values.
   */
  doesNotEqual?: boolean;
}
