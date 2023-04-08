import { ObjectType } from "../types/ObjectType";
import { Salesforce } from "../Salesforce";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { SRecord } from "../types/SRecord";

export interface GetRecordProps {
  objectType: ObjectType;
  objectId: string;
  fields: Array<string>;
}

export interface GetRecordResponse extends HttpProxyResponse {
  data: SRecord;
}

export const getRecord =
  (self: Salesforce) =>
  async (props: GetRecordProps): Promise<GetRecordResponse> => {
    const { objectType, objectId, fields } = props;

    return await self.get({
      url: `/sobjects/${objectType}/${objectId}/`,
      params: {
        fields: fields.join(","),
      },
    });
  };
