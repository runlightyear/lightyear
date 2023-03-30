export interface ExtendedProperties {
  /**
   * Properties that are private to the copy of the event that appears on this calendar.
   */
  private: {
    [key: string]: string;
  };

  /**
   * Properties that are shared between copies of the event on other attendees' calendars.
   */
  shared: {
    [key: string]: string;
  };
}
