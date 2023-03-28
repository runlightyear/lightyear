import { ID } from "../types/ID";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { DateTime } from "../types/DateTime";
import { Linear } from "../Linear";
import { CommentResponse, commentResponseFields } from "./CommentResponse";

export interface GetCommentProps {
  id: ID;
}

const query = `
query GetComment($id: ID) {
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
      data: response.data.comment,
    };
  };
