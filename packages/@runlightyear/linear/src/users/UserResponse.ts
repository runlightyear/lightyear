import { DateTime } from "../types/DateTime";
import { ID } from "../types/ID";

export const userResponseFields = `
active
admin
archivedAt
avatarUrl
calendarHash
createdAt
createdIssueCount
description
disableReason
displayName
email
guest
id
inviteHash
isMe
lastSeen
name
organization {
  id
  name
}
statusEmoji
statusLabel
statusUntilAt
timezone
updatedAt
url
`;

export interface UserResponse {
  /**
   * Whether the user account is active or disabled (suspended).
   **/
  active: boolean;

  /**
   * Whether the user is an organization administrator.
   */
  admin: boolean;

  /**
   * The time at which the entity was archived. Null if the entity has not been archived.
   */
  archivedAt: DateTime;

  /**
   * An URL to the user's avatar image.
   */
  avatarUrl: string;

  /**
   * Hash for the user to be used in calendar URLs.
   */
  calendarHash: string;

  /**
   * The time at which the entity was created.
   */
  createdAt: DateTime;

  /**
   * Number of issues created.
   */
  createdIssueCount: number;

  /**
   * A short description of the user, either its title or bio.
   */
  description: string;

  /**
   * Reason why is the account disabled.
   */
  disableReason: string;

  /**
   * The user's display (nick) name. Unique within each organization.
   */
  displayName: string;

  /**
   * The user's email address.
   */
  email: string;

  /**
   * Whether the user is a guest in the workspace and limited to accessing a subset of teams.
   */
  guest: boolean;

  /**
   * The unique identifier of the entity.
   */
  id: ID;

  /**
   * Unique hash for the user to be used in invite URLs.
   */
  inviteHash: String;

  /**
   * Whether the user is the currently authenticated user.
   */
  isMe: Boolean;

  /**
   * The last time the user was seen online. If null, the user is currently online.
   */
  lastSeen: DateTime;

  /**
   * The user's full name.
   */
  name: String;

  /**
   * Organization the user belongs to.
   */
  organization: {
    id: ID;
    name: string;
  };

  /**
   * The emoji to represent the user current status.
   */
  statusEmoji: string;

  /**
   * The label of the user current status.
   */
  statusLabel: string;

  /**
   * A date at which the user current status should be cleared.
   */
  statusUntilAt: DateTime;

  /**
   * The local timezone of the user.
   */
  timezone: string;

  /**
   * The last time at which the entity was meaningfully updated, i.e. for all changes of syncable properties except those for which updates should not produce an update to updatedAt (see skipUpdatedAtKeys). This is the same as the creation time if the entity hasn't been updated after creation.
   */
  updatedAt: DateTime;

  /**
   * User's profile URL.
   */
  url: string;
}
