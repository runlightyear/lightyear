import { TableModel } from "../types/TableModel";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";

export interface GetBaseSchemaProps {
  baseId: string;
  /**
   * If specified, additional fields to include in the views object response; currently, this list only allows a single literal value visibleFieldIds (for views of type grid only)
   */
  include?: Array<string>;
}

export interface GetBaseSchemaResponse extends HttpProxyResponse {
  data: Array<TableModel>;
}

export const getBaseSchema =
  (self: Airtable) =>
  async (props: GetBaseSchemaProps): Promise<GetBaseSchemaResponse> => {
    const { baseId, include } = props;

    return self.get({
      url: `/meta/bases/${baseId}/tables`,
      params: {
        include,
      },
    });
  };
