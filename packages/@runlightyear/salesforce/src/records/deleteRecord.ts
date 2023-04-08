import { ObjectType } from "../types/ObjectType";
import { Salesforce } from "../Salesforce";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface DeleteRecordProps {
  objectType: ObjectType;
  objectId: string;
}

export interface DeleteRecordResponse extends HttpProxyResponse {
  data: {};
}

export const deleteRecord =
  (self: Salesforce) =>
  async (props: DeleteRecordProps): Promise<DeleteRecordResponse> => {
    const { objectType, objectId } = props;

    return await self.delete({
      url: `/sobjects/${objectType}/${objectId}/`,
    });
  };
