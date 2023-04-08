import { Salesforce } from "../Salesforce";
import { ObjectType } from "../types/ObjectType";
import { FieldValues } from "../types/FieldValues";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface UpdateRecordProps {
  objectType: ObjectType;
  objectId: string;
  fieldValues: FieldValues;
}

export interface UpdateRecordResponse extends HttpProxyResponse {
  data: {};
}

export const updateRecord =
  (self: Salesforce) =>
  async (props: UpdateRecordProps): Promise<UpdateRecordResponse> => {
    const { objectType, objectId, fieldValues } = props;

    return await self.patch({
      url: `/sobjects/${objectType}/${objectId}/`,
      data: fieldValues,
    });
  };
