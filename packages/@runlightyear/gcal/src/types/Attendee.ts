export interface Attendee {
  /**
   * Number of additional guests.
   *
   * The default is 0.
   */
  additionalGuests: number;

  /**
   * The attendee's response comment.
   */
  comment: string;

  /**
   * The attendee's name, if available.
   */
  displayName: string;

  /**
   * The attendee's email address, if available. This field must be present when adding an attendee. It must be a valid email address as per RFC5322.
   *
   * Required when adding an attendee.
   */
  email: string;

  /**
   * Whether this is an optional attendee.
   *
   * The default is False.
   */
  optional?: boolean;

  /**
   * Whether the attendee is a resource. Can only be set when the attendee is added to the event for the first time. Subsequent modifications are ignored.
   *
   * The default is False.
   */
  resource: boolean;

  /**
   * The attendee's response status.
   */
  responseStatus: "needsAction" | "declined" | "tentative" | "accepted";
}
