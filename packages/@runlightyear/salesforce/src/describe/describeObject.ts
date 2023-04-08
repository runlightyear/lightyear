import { ObjectType } from "../types/ObjectType";
import { Salesforce } from "../Salesforce";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { DescribeSObjectResult } from "../types/DescribeSObjectResult";

export interface DescribeObjectProps {
  objectType: ObjectType;
}

export interface DescribeObjectResponse extends HttpProxyResponse {
  data: DescribeSObjectResult;
}

export const describeObject =
  (self: Salesforce) =>
  async (props: DescribeObjectProps): Promise<DescribeObjectResponse> => {
    const { objectType } = props;

    return await self.get({
      url: `/sobjects/${objectType}/describe/`,
    });
  };
