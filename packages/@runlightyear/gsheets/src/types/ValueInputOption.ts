export type ValueInputOption =
  /**
   * The values the user has entered will not be parsed and will be stored as-is.
   */
  | "RAW"

  /**
   * The values will be parsed as if the user typed them into the UI. Numbers will stay as numbers, but strings may be converted to numbers, dates, etc. following the same rules that are applied when entering text into a cell via the Google Sheets UI.
   */
  | "USER_ENTERED";
