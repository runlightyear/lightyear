export interface PageInfo {
  /**
   * Cursor representing the last result in the paginated results.
   */
  endCursor: string;

  /**
   * Indicates if there are more results when paginating forward.
   */
  hasNextPage: boolean;

  /**
   * Indicates if there are more results when paginating backward.
   */
  hasPreviousPage: boolean;

  /**
   * Cursor representing the first result in the paginated results.
   */
  startCursor: string;
}
