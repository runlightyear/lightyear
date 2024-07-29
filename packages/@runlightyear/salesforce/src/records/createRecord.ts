import { Salesforce } from "../Salesforce";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { ObjectType } from "../types/ObjectType";
import { FieldValues } from "../types/FieldValues";

export interface CreateRecordProps {
  objectType: ObjectType;
  fieldValues: FieldValues;
}

export interface CreateRecordResponseData {
  id: string;
  errors: Array<unknown>;
  success: boolean;
}

export interface CreateRecordResponse extends HttpProxyResponse {
  data: CreateRecordResponseData;
}

export const createRecord =
  (self: Salesforce) =>
  async (props: CreateRecordProps): Promise<CreateRecordResponse> => {
    const { objectType, fieldValues } = props;

    console.log("in Salesforce.createRecord", objectType, fieldValues);

    return await self.post({
      url: `/sobjects/${objectType}/`,
      data: fieldValues,
    });
  };
