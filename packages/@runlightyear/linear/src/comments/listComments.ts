import { PaginationOrderBy } from "../types/PaginationOrderBy";
import { CommentFilter } from "../types/CommentFilter";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { DateTime } from "../types/DateTime";
import { ID } from "../types/ID";
import { Linear } from "../Linear";
import { PageInfo } from "../types/PageInfo";

export interface ListCommentsProps {
  /**
   * Filter returned comments.
   */
  filter: CommentFilter;

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
      archivedAt
      body
      bodyData
      children {
        id
      }
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
    }
  }
}
`;

export interface ListCommentsResponse extends HttpProxyResponse {
  data: {
    pageInfo: PageInfo;
    comments: Array<{
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
       * The children of the comment.
       */
      children: {
        id: string;
      };

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
        id: ID;
        name: string;
      };

      /**
       * The unique identifier of the entity.
       */
      id: ID;

      /**
       * The issue that the comment is associated with.
       */
      issue: { id: string; title: string };

      /**
       * The parent comment under which the current comment is nested.
       */
      parent: {
        id: ID;
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
        id: ID;
        name: string;
      };
    }>;
  };
}

export const listComments =
  (self: Linear) =>
  async (props: ListCommentsProps): Promise<ListCommentsResponse> => {
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
        comments: response.data.data.comments.nodes,
      },
    };
  };
