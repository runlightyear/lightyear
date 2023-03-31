import { DateTime } from "../types/DateTime";
import { LinearID } from "../types/LinearID";

export const workflowStateResponseFields = `
archivedAt
color
createdAt
description
id
name
position
team {
  id
  name
}
type
updatedAt
`;

export interface WorkflowStateResponse {
  /**
   * The time at which the entity was archived. Null if the entity has not been archived.
   */
  archivedAt: DateTime;

  /**
   * The state's UI color as a HEX string.
   */
  color: string;

  /**
   * The time at which the entity was created.
   */
  createdAt: DateTime;

  /**
   * Description of the state.
   */
  description: string;

  /**
   * The unique identifier of the entity.
   */
  id: LinearID;

  /**
   * The state's name.
   */
  name: string;

  /**
   * The position of the state in the team flow.
   */
  position: number;

  /**
   * The team to which this state belongs to.
   */
  team: {
    id: string;
    name: string;
  };

  /**
   * The type of the state.
   */
  type: string;

  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't been updated after creation.
   */
  updatedAt: DateTime;
}
