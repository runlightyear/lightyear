import { LinearID } from "../types/LinearID";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Linear } from "../Linear";
import { IssueResponse, issueResponseFields } from "./IssueResponse";

export interface GetIssueProps {
  id: LinearID;
}

const query = `
query GetIssue($id: String!) {
  issue(id: $id) {
    ${issueResponseFields}
  }
}
`;

export interface GetIssueResponse extends HttpProxyResponse {
  data: IssueResponse;
}

export const getIssue =
  (self: Linear) =>
  async (props: GetIssueProps): Promise<GetIssueResponse> => {
    const { id } = props;

    const response = await self.execute({ query, variables: { id } });

    return {
      ...response,
      data: response.data.data.issue,
    };
  };
