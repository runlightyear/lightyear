export interface RichTextFilterCondition {
  /**
   * The string to compare the text property value against.
   *
   * Returns database entries with a text property value that includes the provided string.
   */
  contains?: string;

  /**
   * The string to compare the text property value against.
   *
   * Returns database entries with a text property value that does not include the provided string.
   */
  doesNotContain?: string;

  /**
   * The string to compare the text property value against.
   *
   * Returns database entries with a text property value that does not match the provided string.
   */
  doesNotEqual?: string;

  /**
   * The string to compare the text property value against.
   *
   * Returns database entries with a text property value that ends with the provided string.
   */
  endsWith?: string;

  /**
   * The string to compare the text property value against.
   *
   * Returns database entries with a text property value that matches the provided string.
   */
  equals?: string;

  /**
   * Whether the text property value does not contain any data.
   *
   * Returns database entries with a text property value that is empty.
   */
  isEmpty?: true;

  /**
   * Whether the text property value contains any data.
   *
   * Returns database entries with a text property value that contains data.
   */
  isNotEmpty?: true;

  /**
   * The string to compare the text property value against.
   *
   * Returns database entries with a text property value that starts with the provided string.
   */
  startsWith?: string;
}
