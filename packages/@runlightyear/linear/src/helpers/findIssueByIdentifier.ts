import { Linear } from "../Linear";
import { IssueResponse } from "../issues/IssueResponse";

export interface FindIssueByIdentifierProps {
  /**
   * Linear issue identifier. For example: "ENG-102"
   */
  identifier: string;
}

export const findIssueByIdentifier =
  (self: Linear) =>
  async (props: FindIssueByIdentifierProps): Promise<IssueResponse> => {
    const { identifier } = props;

    const [teamKey, number] = identifier.split("-");

    const linearResponse = await self.listIssues({
      filter: {
        team: { key: { eq: teamKey } },
        number: { eq: parseInt(number) },
      },
    });

    return linearResponse.data.issues[0];
  };
