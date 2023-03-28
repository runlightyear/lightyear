import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { StringComparator } from "./StringComparator";
import { IssueFilter } from "./IssueFilter";
import { UserFilter } from "./UserFilter";

export interface CommentFilter {
  /**
   * Compound filters, all of which need to be matched by the comment.
   */
  and?: Array<CommentFilter>;

  /**
   * Comparator for the comments body.
   */
  body?: StringComparator;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filters that the comments issue must satisfy.
   */
  issue?: IssueFilter;

  /**
   * Compound filters, one of which need to be matched by the comment.
   */
  or?: Array<CommentFilter>;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;

  /**
   *   Filters that the comments creator must satisfy.
   */
  user?: UserFilter;
}
