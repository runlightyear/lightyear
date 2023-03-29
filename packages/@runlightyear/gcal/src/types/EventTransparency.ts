export type EventTransparency =
  /**
   * Default value. The event does block time on the calendar. This is equivalent to setting Show me as to Busy in the Calendar UI.
   */
  | "opaque"
  /**
   * The event does not block time on the calendar. This is equivalent to setting Show me as to Available in the Calendar UI.
   */
  | "transparent";
