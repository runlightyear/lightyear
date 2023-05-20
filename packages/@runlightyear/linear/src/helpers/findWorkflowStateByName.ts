import { Linear } from "../Linear";
import { WorkflowStateResponse } from "../workflowStates/WorkflowStateResponse";

export interface FindWorkflowStateByNameProps {
  name: string;
}

export const findWorkflowStateByName =
  (self: Linear) =>
  async (
    props: FindWorkflowStateByNameProps
  ): Promise<WorkflowStateResponse> => {
    const { name } = props;

    const response = await self.listWorkflowStates({
      filter: { name: { eq: name } },
    });

    return response.data.workflowStates[0];
  };
