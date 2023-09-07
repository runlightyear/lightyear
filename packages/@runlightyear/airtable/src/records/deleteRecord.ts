import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Airtable } from "../Airtable";

export interface DeleteRecordProps {
  baseId: string;
  tableIdOrName: string;
  recordId: string;
}

export interface DeleteRecordResponseData {
  id: string;
  deleted: true;
}

export interface DeleteRecordResponse extends HttpProxyResponse {
  data: DeleteRecordResponseData;
}

export const deleteRecord =
  (self: Airtable) =>
  async (props: DeleteRecordProps): Promise<DeleteRecordResponse> => {
    const { baseId, tableIdOrName, recordId } = props;

    return await self.delete({
      url: `/${baseId}/${tableIdOrName}/${recordId}`,
    });
  };
