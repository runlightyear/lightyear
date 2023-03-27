export interface StringComparator {
  /**
   * Contains constraint. Matches any values that contain the given string.
   */
  contains?: string;

  /**
   * Contains case insensitive constraint. Matches any values that contain the given string case insensitive.
   */
  containsIgnoreCase?: string;

  /**
   * Ends with constraint. Matches any values that end with the given string.
   */
  endsWith?: string;

  /**
   * Equals constraint.
   */
  eq?: string;

  /**
   * Equals case insensitive. Matches any values that matches the given string case insensitive.
   */
  eqIgnoreCase?: string;

  /**
   * In-array constraint.
   */
  in?: Array<string>;

  /**
   * Not-equals constraint.
   */
  neq?: string;

  /**
   * Not-equals case insensitive. Matches any values that don't match the given string case insensitive.
   */
  neqIgnoreCase?: string;

  /**
   * Not-in-array constraint.
   */
  nin?: Array<string>;

  /**
   * Doesn't contain constraint. Matches any values that don't contain the given string.
   */
  notContains?: string;

  /**
   * Doesn't contain case insensitive constraint. Matches any values that don't contain the given string case insensitive.
   */
  notContainsIgnoreCase?: string;

  /**
   * Doesn't end with constraint. Matches any values that don't end with the given string.
   */
  notEndsWith?: string;

  /**
   * Doesn't start with constraint. Matches any values that don't start with the given string.
   */
  notStartsWith?: string;

  /**
   * Starts with constraint. Matches any values that start with the given string.
   */
  startsWith?: string;
}
