import { Airtable } from "../Airtable";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface CreateRecordsProps {
  baseId: string;
  tableIdOrName: string;
  /**
   * Create a single record
   */
  fields?: {
    [key: string]: unknown;
  };
  /**
   * Create multiple records
   *
   * Pass in multiple records to create multiple in one request
   */
  records?: Array<{
    fields: {
      [key: string]: unknown;
    };
  }>;
  /**
   * An optional boolean value that lets you return field objects keyed by the field id.
   *
   * This defaults to false, which returns field objects where the key is the field name.
   */
  returnFieldsByFieldId?: boolean;
  /**
   * The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.
   */
  typecast?: boolean;
}

export interface SingleRecordResponseData {
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
   * See Cell Values for more information on cell value response types.
   */
  fields: {
    [key: string]: unknown;
  };
  /**
   * The number of comments (if there are any) on the record.
   *
   * The recordMetadata query parameter must include "commentCount" in order to receive this.
   */
  commentCount?: number;
}

export interface MultipleRecordsResponseData {
  offset?: string;
  records: Array<SingleRecordResponseData>;
}

export interface CreateRecordsResponse extends HttpProxyResponse {
  data: SingleRecordResponseData | MultipleRecordsResponseData;
}

export const createRecords =
  (self: Airtable) =>
  async (props: CreateRecordsProps): Promise<CreateRecordsResponse> => {
    const {
      baseId,
      tableIdOrName,
      fields,
      records,
      returnFieldsByFieldId,
      typecast,
    } = props;

    return await self.post({
      url: `/${baseId}/${tableIdOrName}`,
      data: {
        fields,
        records,
        returnFieldsByFieldId,
        typecast,
      },
    });
  };
