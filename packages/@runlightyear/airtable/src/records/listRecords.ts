import { Airtable } from "../Airtable";
import { Timezone } from "../types/Timezone";
import { HttpProxyResponse } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface ListRecordsProps {
  baseId: string;
  tableIdOrName: string;
  /**
   * The time zone that should be used to format dates when using string as the cellFormat. This parameter is required when using string as the cellFormat.
   */
  timezone?: Timezone;
  /**
   *   The user locale that should be used to format dates when using string as the cellFormat. This parameter is required when using string as the cellFormat.
   */
  userLocale?: string;
  /**
   * The number of records returned in each request. Must be less than or equal to 100. Default is 100.
   */
  pageSize?: number;

  /**
   * The maximum total number of records that will be returned in your requests. If this value is larger than pageSize (which is 100 by default), you may have to load multiple pages to reach this total.
   */
  maxRecords?: number;
  /**
   * To fetch the next page of records, include offset from the previous request in the next request's parameters.
   */
  offset?: string;
  /**
   * The name or ID of a view in the table. If set, only the records in that view will be returned. The records will be sorted according to the order of the view unless the sort parameter is included, which overrides that order. Fields hidden in this view will be returned in the results. To only return a subset of fields, use the fields parameter.
   */
  view?: string;

  /**
   * A list of sort objects that specifies how the records will be ordered. Each sort object must have a field key specifying the name of the field to sort on, and an optional direction key that is either "asc" or "desc". The default direction is "asc".
   *
   *   The sort parameter overrides the sorting of the view specified in the view parameter. If neither the sort nor the view parameter is included, the order of records is arbitrary.
   */
  sort?: Array<{ field: string; direction: "asc" | "desc" }>;

  /**
   *  A formula used to filter records. The formula will be evaluated for each record, and if the result is not 0, false, "", NaN, [], or #Error! the record will be included in the response. We recommend testing your formula in the Formula field UI before using it in your API request.
   *
   *   If combined with the view parameter, only records in that view which satisfy the formula will be returned.
   *
   *   The formula must be encoded first before passing it as a value. You can use this tool to not only encode the formula but also create the entire url you need.
   *
   *   Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/{baseId}/{tableIdOrName}/listRecords while passing the parameters within the body of the request instead of the query parameters.
   */
  filterByFormula?: string;

  /**
   * The format that should be used for cell values. Supported values are:
   *
   *     json: cells will be formatted as JSON, depending on the field type.
   *   string: cells will be formatted as user-facing strings, regardless of the field type. The timeZone and userLocale parameters are required when using string as the cellFormat.
   *   Note: You should not rely on the format of these strings, as it is subject to change.
   *
   *   The default is json.
   */
  cellFormat?: "json" | "string";

  /**
   * Only data for fields whose names or IDs are in this list will be included in the result. If you don't need every field, you can use this parameter to reduce the amount of data transferred.
   *
   *   Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/{baseId}/{tableIdOrName}/listRecords while passing the parameters within the body of the request instead of the query parameters.
   */
  fields?: Array<string>;

  /**
   *   An optional boolean value that lets you return field objects where the key is the field id.
   *
   *   This defaults to false, which returns field objects where the key is the field name.
   */
  returnFieldsByFieldId?: boolean;

  /**
   *   An optional field that, if specified, includes commentCount on each record returned.
   */
  recordMetadata?: Array<"commentCount">;
}

export interface ListRecordsResponseData {
  offset?: string;
  records: Array<{
    /**
     * Record ID
     */
    id: string;

    /**
     * A date timestamp in the ISO format, eg:"2018-01-01T00:00:00.000Z"
     */
    createdTime: string;

    /**
     * Cell values are keyed by either field name or field ID (conditioned on returnFieldsByFieldId).
     *
     *  See Cell Values for more information on cell value response types.
     */
    fields: {
      [key: string]: any;
    };

    /**
     * The number of comments (if there are any) on the record.
     *
     * The recordMetadata query parameter must include "commentCount" in order to receive this.
     */
    commentCount?: number;
  }>;
}

/**
 * @beta
 */
export interface ListRecordsResponse extends HttpProxyResponse {
  /**
   * If there are more records, the response will contain an offset. Pass this offset into the next request to fetch the next page of records.
   */
  data: ListRecordsResponseData;
}

export const listRecords =
  (self: Airtable) =>
  async (props: ListRecordsProps): Promise<ListRecordsResponse> => {
    const {
      baseId,
      tableIdOrName,
      timezone,
      userLocale,
      pageSize,
      maxRecords,
      offset,
      view,
      sort,
      filterByFormula,
      cellFormat,
      fields,
      returnFieldsByFieldId,
      recordMetadata,
    } = props;

    return await self.get({
      url: `/${baseId}/${tableIdOrName}`,
      params: {
        timezone,
        userLocale,
        pageSize,
        maxRecords,
        offset,
        view,
        sort,
        filterByFormula,
        cellFormat,
        fields,
        returnFieldsByFieldId,
        recordMetadata,
      },
    });
  };
