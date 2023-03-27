import { Linear } from "../Linear";
import { HttpProxyResponse } from "@runlightyear/lightyear";

const query = `
query ListTeams {
  teams {
    nodes {
      id
      name
    }
  }
}
`;

export interface ListTeamsResponse extends HttpProxyResponse {
  data: Array<{
    id: string;
    name: string;
  }>;
}

export const listTeams =
  (self: Linear) => async (): Promise<ListTeamsResponse> => {
    const response = await self.execute({ query });

    return { ...response, data: response.data.data.teams.nodes };
  };
