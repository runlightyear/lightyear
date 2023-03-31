import { LinearID } from "../types/LinearID";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { DateTime } from "../types/DateTime";
import { Linear } from "../Linear";
import { UserResponse, userResponseFields } from "./UserResponse";

export interface GetUserProps {
  id: LinearID;
}

const query = `
query GetUser($id: ID) {
  user(id: $id) {
    ${userResponseFields}
  }
}
`;

export interface GetUserResponse extends HttpProxyResponse {
  data: UserResponse;
}

export const getUser =
  (self: Linear) =>
  async (props: GetUserProps): Promise<GetUserResponse> => {
    const { id } = props;

    const response = await self.execute({ query, variables: { id } });

    return {
      ...response,
      data: response.data.user,
    };
  };
