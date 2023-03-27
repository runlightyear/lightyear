import { IDComparator } from "./IDComparator";
import { DateComparator } from "./DateComparator";
import { NumberComparator } from "./NumberComparator";
import { StringComparator } from "./StringComparator";
import { IssueFilter } from "./IssueFilter";
import { UserFilter } from "./UserFilter";
import { CommentFilter } from "./CommentFilter";

export interface CommentCollectionFilter {
  /**
   * Compound filters, all of which need to be matched by the comment.
   */
  and?: Array<CommentCollectionFilter>;

  /**
   * Comparator for the comments body.
   */
  body?: StringComparator;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   *  Filters that needs to be matched by all comments.
   */
  every?: CommentFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filters that the comments issue must satisfy.
   */
  issue?: IssueFilter;

  /**
   * Comparator for the collection length.
   */
  length?: NumberComparator;

  /**
   * Compound filters, one of which need to be matched by the comment.
   */
  or?: Array<CommentCollectionFilter>;

  /**
   * Filters that needs to be matched by some comments.
   */
  some?: CommentFilter;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;

  /**
   * Filters that the comments creator must satisfy.
   */
  user?: UserFilter;
}
