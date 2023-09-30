import { LinearID } from "../types/LinearID";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Linear } from "../Linear";
import { TeamResponse, teamResponseFields } from "./TeamResponse";

export interface GetTeamProps {
  id: LinearID;
}

const query = `
query GetTeam($id: String!) {
  team(id: $id) {
    ${teamResponseFields}
  }
}
`;

export interface GetTeamResponse extends HttpProxyResponse {
  data: TeamResponse;
}

export const getTeam =
  (self: Linear) =>
  async (props: GetTeamProps): Promise<GetTeamResponse> => {
    const { id } = props;

    const response = await self.execute({ query, variables: { id } });

    return {
      ...response,
      data: response.data.data.team,
    };
  };
