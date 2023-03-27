import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Linear } from "../Linear";

export interface ListIssuesProps {
  /**
   * A cursor to be used with last for backward pagination.
   */
  before?: string;

  /**
   * A cursor to be used with first for forward pagination
   */
  after?: string;

  /**
   * The number of items to forward paginate (used with after). Defaults to 50.
   */
  first?: number;

  /**
   * The number of items to backward paginate (used with before). Defaults to 50.
   */
  last?: number;

  /**
   * Should archived resources be included (default: false)
   */
  includeArchived?: boolean;

  /**
   * By which field should the pagination order by. Available options are createdAt (default) and updatedAt.
   */
  orderBy?: "createdAt" | "updatedAt";
}

const query = `
query ListIssues {
  issues {
    nodes {
      archivedAt
      assignee {
        id
      }
      completedAt
      createdAt
      creator {
        id
      }
      customerTicketCount
      cycle {
        id
      }
      description
      descriptionData
      dueDate
      estimate
      id
      identifier
      number
      parent {
        id
      }
      priority
      priorityLabel
      project {
        id 
      }
      projectMilestone {
        id
      }
      title
      updatedAt
      url
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

export interface ListIssuesResponse extends HttpProxyResponse {
  data: Array<{
    archivedAt: string;
    assignee: {
      id: string;
    };
    completedAt: string;
    createdAt: string;
    creator: {
      id: string;
    };
    customerTicketCount: number;
    cycle: {
      id: string;
    };
    description: string;
    descriptionData: object;
    dueDate: string;
    estimate: number;
    id: string;
    identifier: string;
    number: number;
    parent: {
      id: string;
    };
    priority: number;
    priorityLabel: string;
    project: {
      id: string;
    };
    projectMilestone: {
      id: string;
    };
    title: string;
    updatedAt: string;
    url: string;
  }>;
}

export const listIssues =
  (self: Linear) =>
  async (props?: ListIssuesProps): Promise<ListIssuesResponse> => {
    const { before, after, first, last, includeArchived, orderBy } =
      props || {};

    const response = await self.execute({
      query,
      variables: {
        before,
        after,
        first,
        last,
        includeArchived,
        orderBy,
      },
    });

    return { ...response, data: response.data.data.issues.nodes };
  };
