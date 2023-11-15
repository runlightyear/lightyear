import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";

export interface UpdateRecordProps {
  baseId: string;
  tableIdOrName: string;
  recordId: string;
  /**
   * The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.
   */
  typecast?: boolean;
  fields: {
    [key: string]: any;
  };
}

export interface UpdateRecordResponseData {
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
    [key: string]: any;
  };
}

export interface UpdateRecordResponse extends HttpProxyResponse {
  data: UpdateRecordResponseData;
}

export const updateRecord =
  (self: Airtable) =>
  async (props: UpdateRecordProps): Promise<UpdateRecordResponse> => {
    const { baseId, tableIdOrName, recordId, typecast, fields } = props;

    return await self.patch({
      url: `/${baseId}/${tableIdOrName}/${recordId}`,
      params: {
        typecast,
      },
      data: {
        fields,
      },
    });
  };
