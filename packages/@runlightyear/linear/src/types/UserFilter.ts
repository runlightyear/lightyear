import { IDComparator } from "./IDComparator";
import { BooleanComparator } from "./BooleanComparator";
import { DateComparator } from "./DateComparator";
import { StringComparator } from "./StringComparator";
import { IssueCollectionFilter } from "./IssueCollectionFilter";

export interface UserFilter {
  /**
   * Comparator for the user's activity status.
   */
  active?: BooleanComparator;

  /**
   * Comparator for the user's admin status.
   */
  admin?: BooleanComparator;

  /**
   * Compound filters, all of which need to be matched by the user.
   */
  and?: Array<UserFilter>;

  /**
   * Filters that the users assigned issues must satisfy.
   */
  assignedIssues?: IssueCollectionFilter;

  /**
   * Comparator for the created at date.
   */
  createdAt?: DateComparator;

  /**
   * Comparator for the user's display name.
   */
  displayName?: StringComparator;

  /**
   * Comparator for the user's email.
   */
  email?: StringComparator;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user.
   */
  isMe?: BooleanComparator;

  /**
   * Comparator for the user's name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the user.
   */
  or?: Array<UserFilter>;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
