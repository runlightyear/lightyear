export interface ListMetadata {
  /**
   * Use the next page token to paginate through large result sets. A next page token will be returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes.
   */
  nextPageToken: string;

  /**
   * The number of pages returned for the request made.
   */
  pageCount: number;

  /**
   * The page number of the current results.
   */
  pageNumber: number;

  /**
   * The number of records returned with a single API call.
   */
  pageSize: number;

  /**
   * The total number of all the records available across pages.
   */
  totalRecords: number;
}
