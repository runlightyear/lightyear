import { DateTime } from "../types/DateTime";
import { LinearID } from "../types/LinearID";

export const commentResponseFields = `
archivedAt
body
bodyData
createdAt
editedAt
externalUser {
  id
  name
}
id
issue {
  id
  title
}
parent {
  id
}
reactionData
updatedAt
url
user {
  id
  name
}
`;

export interface CommentResponse {
  /**
   * The time at which the entity was archived. Null if the entity has not been archived.
   */
  archivedAt: DateTime;

  /**
   * The comment content in markdown format.
   */
  body: string;

  /**
   * The comment content as a Prosemirror document.
   */
  bodyData: string;

  /**
   * The time at which the entity was created.
   */
  createdAt: DateTime;

  /**
   * The time user edited the comment.
   */
  editedAt: DateTime;

  /**
   * [ALPHA] The external user who wrote the comment.
   */
  externalUser: {
    id: LinearID;
    name: string;
  };

  /**
   * The unique identifier of the entity.
   */
  id: LinearID;

  /**
   * The issue that the comment is associated with.
   */
  issue: { id: string; title: string };

  /**
   * The parent comment under which the current comment is nested.
   */
  parent: {
    id: LinearID;
  };

  /**
   * Emoji reaction summary, grouped by emoji type
   */
  reactionData: object;

  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't been updated after creation.
   */
  updatedAt: DateTime;

  /**
   * Comment's URL.
   */
  url: string;

  user: {
    id: LinearID;
    name: string;
  };
}
