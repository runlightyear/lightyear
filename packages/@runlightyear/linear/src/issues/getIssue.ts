import { ID } from "../types/ID";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Linear } from "../Linear";
import { IssueResponse, issueResponseFields } from "./IssueResponse";

export interface GetIssueProps {
  id: ID;
}

const query = `
query GetIssue($id: ID) {
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
      data: response.data.issue,
    };
  };
