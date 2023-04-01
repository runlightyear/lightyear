import { NotionDate } from "./NotionDate";

export interface DateFilterCondition {
  /**
   * The value to compare the date property value against.
   *
   * Returns database entries where the date property value is after the provided date.
   */
  after?: NotionDate;

  /**
   * The value to compare the date property value against.
   *
   * Returns database entries where the date property value is before the provided date.
   */
  before?: NotionDate;

  /**
   * The value to compare the date property value against.
   *
   * Returns database entries where the date property value is the provided date.
   */
  equals?: NotionDate;

  /**
   * The value to compare the date property value against.
   *
   * Returns database entries where the date property value contains no data.
   */
  isEmpty?: true;

  /**
   * The value to compare the date property value against.
   *
   * Returns database entries where the date property value is not empty.
   */
  isNotEmpty?: true;

  /**
   * A filter that limits the results to database entries where the date property value is within the next month.
   */
  nextMonth?: {};

  /**
   * A filter that limits the results to database entries where the date property value is within the next week.
   */
  nextWeek?: {};

  /**
   * A filter that limits the results to database entries where the date property value is within the next year.
   */
  nextYear?: {};

  /**
   * The value to compare the date property value against.
   *
   * Returns database entries where the date property value is on or after the provided date.
   */
  onOrAfter?: NotionDate;

  /**
   * The value to compare the date property value against.
   *
   * Returns database entries where the date property value is on or before the provided date.
   */
  onOrBefore?: NotionDate;

  /**
   * A filter that limits the results to database entries where the date property value is within the past month.
   */
  pastMonth?: {};

  /**
   * A filter that limits the results to database entries where the date property value is within the past week.
   */
  pastWeek?: {};

  /**
   * A filter that limits the results to database entries where the date property value is within the past year.
   */
  pastYear?: {};

  /**
   * A filter that limits the results to database entries where the date property value is this week.
   */
  thisWeek?: {};
}
