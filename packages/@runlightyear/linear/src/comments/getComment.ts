import { LinearID } from "../types/LinearID";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Linear } from "../Linear";
import { CommentResponse, commentResponseFields } from "./CommentResponse";

export interface GetCommentProps {
  id: LinearID;
}

const query = `
query GetComment($id: String!) {
  comment(id: $id) {
    ${commentResponseFields}
  }
}
`;

export interface GetCommentResponse extends HttpProxyResponse {
  data: CommentResponse;
}

export const getComment =
  (self: Linear) =>
  async (props: GetCommentProps): Promise<GetCommentResponse> => {
    const { id } = props;

    const response = await self.execute({ query, variables: { id } });

    return {
      ...response,
      data: response.data.data.comment,
    };
  };
