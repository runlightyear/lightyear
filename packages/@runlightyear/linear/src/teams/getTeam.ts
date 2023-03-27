import { ID } from "../types/ID";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Linear } from "../Linear";

export interface GetTeamProps {
  id: ID;
}

const query = `
query GetTeam($id: ID) {
  team(id: $id) {
    id: ID;
    name: string;
  }
}
`;

export interface GetTeamResponse extends HttpProxyResponse {
  data: {
    id: ID;
    name: string;
  };
}

export const getTeam =
  (self: Linear) =>
  async (props: GetTeamProps): Promise<GetTeamResponse> => {
    const { id } = props;

    const response = await self.execute({ query, variables: { id } });

    return {
      ...response,
      data: response.data.team,
    };
  };
