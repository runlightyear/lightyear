export interface ReminderOverride {
  /**
   * The method used by this reminder.
   */
  method: "email" | "popup";

  /**
   * Number of minutes before the start of the event when the reminder should trigger. Valid values are between 0 and 40320 (4 weeks in minutes).
   */
  minutes: number;
}
