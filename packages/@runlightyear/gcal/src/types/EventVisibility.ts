export type EventVisibility =
  /**
   * Uses the default visibility for events on the calendar. This is the default value.
   */
  | "default"
  /**
   *  The event is public and event details are visible to all readers of the calendar.
   */
  | "public"
  /**
   * The event is private and only event attendees may view event details.
   */
  | "private"
  /**
   * The event is private. This value is provided for compatibility reasons.
   */
  | "confidential";
