import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";

export interface GetRecordProps {
  baseId: string;
  tableIdOrName: string;
  recordId: string;
  /**
   * The format that should be used for cell values. Supported values are:
   *
   *    json: cells will be formatted as JSON, depending on the field type.
   *    string: cells will be formatted as user-facing strings, regardless of the field type. The timeZone and userLocale parameters are required when using string as the cellFormat.
   *
   * Note: You should not rely on the format of these strings, as it is subject to change.
   *
   * The default is json.
   */
  cellFormat?: "json" | "string";
  /**
   * An optional boolean value that lets you return field objects where the key is the field id.
   *
   * This defaults to false, which returns field objects where the key is the field name.
   */
  returnFieldsByFieldId?: boolean;
}

export interface GetRecordResponseData {
  id: string;
  createdTime: string;
  fields: {
    [key: string]: any;
  };
}

/**
 * @beta
 */
export interface GetRecordResponse extends HttpProxyResponse {
  data: GetRecordResponseData;
}

export const getRecord =
  (self: Airtable) =>
  async (props: GetRecordProps): Promise<GetRecordResponse> => {
    const {
      baseId,
      tableIdOrName,
      recordId,
      cellFormat,
      returnFieldsByFieldId,
    } = props;

    return self.get({
      url: `/${baseId}/${tableIdOrName}/${recordId}`,
      params: {
        cellFormat,
        returnFieldsByFieldId,
      },
    });
  };
