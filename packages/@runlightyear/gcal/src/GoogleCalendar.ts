import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { listCalendars, ListCalendarsProps } from "./calendars/listCalendars";
import { listEvents, ListEventsProps } from "./events/listEvents";
import { createEvent, CreateEventProps } from "./events/createEvent";
import {
  createCalendar,
  CreateCalendarProps,
} from "./calendars/createCalendar";
import { deleteEvent, DeleteEventProps } from "./events/deleteEvent";
import { updateEvent, UpdateEventProps } from "./events/updateEvent";

/**
 * @beta
 */
export interface GoogleCalendarProps extends AuthConnectorProps {}

/**
 * @beta
 */
export class GoogleCalendar extends RestConnector {
  constructor(props: GoogleCalendarProps) {
    super({ ...props, baseUrl: "https://www.googleapis.com/calendar/v3" });
  }

  /**
   * Returns the calendars on the user's calendar list.
   *
   * @group Calendar
   *
   * @param props
   */
  async listCalendars(props?: ListCalendarsProps) {
    return listCalendars(this)(props);
  }

  /**
   * Creates a secondary calendar.
   *
   * @group Calendar
   *
   * @param props
   */
  async createCalendar(props: CreateCalendarProps) {
    return createCalendar(this)(props);
  }

  /**
   * Returns events on the specified calendar.
   *
   * @group Event
   *
   * @param props
   */
  async listEvents(props: ListEventsProps) {
    return listEvents(this)(props);
  }

  /**
   * Creates an event.
   *
   * @group Event
   *
   * @param props
   */
  async createEvent(props: CreateEventProps) {
    return createEvent(this)(props);
  }

  /**
   * Updates an event. This method does not support patch semantics and always updates the entire event resource. To do a partial update, perform a get followed by an update using etags to ensure atomicity.
   *
   * @group Event
   *
   * @param props
   */
  async updateEvent(props: UpdateEventProps) {
    return updateEvent(this)(props);
  }

  /**
   * Deletes an event.
   *
   * @group Event
   *
   * @param props
   */
  async deleteEvent(props: DeleteEventProps) {
    return deleteEvent(this)(props);
  }
}
