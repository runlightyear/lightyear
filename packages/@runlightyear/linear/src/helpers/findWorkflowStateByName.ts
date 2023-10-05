import { Linear } from "../Linear";
import { WorkflowStateResponse } from "../workflowStates/WorkflowStateResponse";

export interface FindWorkflowStateByNameProps {
  /**
   * Linear team key. For example: "ENG"
   */
  teamKey: string;
  /**
   * Linear workflow state name. For example: "In Review"
   */
  name: string;
}

export const findWorkflowStateByName =
  (self: Linear) =>
  async (
    props: FindWorkflowStateByNameProps
  ): Promise<WorkflowStateResponse> => {
    const { teamKey, name } = props;

    const response = await self.listWorkflowStates({
      filter: { team: { key: { eq: teamKey } }, name: { eq: name } },
    });

    return response.data.workflowStates[0];
  };
