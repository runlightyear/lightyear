import { IDComparator } from "./IDComparator";
import { BooleanComparator } from "./BooleanComparator";
import { DateComparator } from "./DateComparator";
import { UserFilter } from "./UserFilter";
import { NumberComparator } from "./NumberComparator";
import { StringComparator } from "./StringComparator";
import { IssueCollectionFilter } from "./IssueCollectionFilter";

export interface UserCollectionFilter {
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
  and?: Array<UserCollectionFilter>;

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
   * Filters that needs to be matched by all users.
   */
  every?: UserFilter;

  /**
   * Comparator for the identifier.
   */
  id?: IDComparator;

  /**
   * Filter based on the currently authenticated user. Set to true to filter for the authenticated user, false for any other user.
   */
  isMe?: BooleanComparator;

  /**
   * Comparator for the collection length.
   */
  length?: NumberComparator;

  /**
   * Comparator for the user's name.
   */
  name?: StringComparator;

  /**
   * Compound filters, one of which need to be matched by the user.
   */
  or?: Array<UserCollectionFilter>;

  /**
   * Filters that needs to be matched by some users.
   */
  some?: UserFilter;

  /**
   * Comparator for the updated at date.
   */
  updatedAt?: DateComparator;
}
