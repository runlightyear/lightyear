import { PaginationOrderBy } from "../types/PaginationOrderBy";
import { UserFilter } from "../types/UserFilter";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { PageInfo } from "../types/PageInfo";
import { ID } from "../types/ID";
import { DateTime } from "../types/DateTime";
import { Linear } from "../Linear";

export interface ListUsersProps {
  /**
   * Filter returned users.
   */
  filter: UserFilter;

  /**
   * A cursor to be used with last for backward pagination.
   */
  before: string;

  /**
   * A cursor to be used with first for forward pagination
   */
  after: string;

  /**
   * The number of items to forward paginate (used with after). Defaults to 50.
   */
  first: number;

  /**
   * The number of items to backward paginate (used with before). Defaults to 50.
   */
  last: number;

  /**
   * Should archived resources be included (default: false)
   */
  includeArchived: boolean;

  /**
   * By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
   */
  orderBy: PaginationOrderBy;
}

const query = `
query ListComments($filter: CommentFilter, $before: String, $after: String, $first: Int, $last: Int, $includeArchived: Boolean, $orderBy: PaginationOrderBy) {
  comments(filter: $filter, before: $before, after: $after, first: $first, last: $last, includeArchived: $includeArchived, orderBy: $orderBy) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
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
    }
  }
}
`;

export interface ListUsersResponse extends HttpProxyResponse {
  data: {
    pageInfo: PageInfo;
    users: Array<{
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
    }>;
  };
}

export const listUsers =
  (self: Linear) =>
  async (props: ListUsersProps): Promise<ListUsersResponse> => {
    const { filter, before, after, first, last, includeArchived, orderBy } =
      props || {};

    const response = await self.execute({
      query,
      variables: {
        filter,
        before,
        after,
        first,
        last,
        includeArchived,
        orderBy,
      },
    });

    return {
      ...response,
      data: {
        pageInfo: response.data.data.pageInfo,
        users: response.data.data.users.nodes,
      },
    };
  };
