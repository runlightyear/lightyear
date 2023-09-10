export interface FilesFilterCondition {
  /**
   * Whether the files property value does not contain any data.
   *
   * Returns all database entries with an empty files property value.
   */
  isEmpty?: true;

  /**
   * Whether the files property value contains data.
   *
   * Returns all entries with a populated files property value.
   */
  isNotEmpty?: true;
}
