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
import {
  defineUpdatedEventsAction,
  DefineUpdatedEventsActionProps,
} from "./events/defineUpdatedEventsAction";
// import { watchEvents, WatchEventsProps } from "./notifications/watchEvents";
// import { stopChannel, StopChannelProps } from "./notifications/stopChannel";
// import {
//   defineEventsWebhook,
//   DefineEventsWebhookProps,
// } from "./events/defineEventsWebhook";

/**
 * @beta
 */
export interface GoogleCalendarProps extends AuthConnectorProps {}

/**
 * Google Calendar connector
 *
 * @beta
 *
 * @example Install
 * ```
 * npm install @runlightyear/gcal
 * ```
 *
 * @example Import
 * ```
 * import { GoogleCalendar } from "@runlightyear/gcal";
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "gcalExample",
 *   title: "Google Calendar Example",
 *   apps: ["gcal"],
 *   run: async ({ auths }) => {
 *     const gcal = new GoogleCalendar({
 *       auth: auths.gcal,
 *     });
 *   },
 * });
 *```
 *
 * @example Poll for newly updated events
 * ```typescript
 * GoogleCalendar.defineUpdatedEventsAction({
 *   name: "pollUpdatedEvents",
 *   title: "Poll Updated Events",
 *   calendarId: "primary",
 *   trigger: {
 *     pollingFrequency: 1,  // Run once a minute
 *   },
 *   run: async ({ data: events }) => {
 *     console.log("Updated events", events);
 *   },
 * });
 * ```
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

  // /**
  //  * Watch for events.
  //  *
  //  * @group Notification
  //  */
  // async watchEvents(props: WatchEventsProps) {
  //   return watchEvents(this)(props);
  // }
  //
  // /**
  //  * Stop notification channel
  //  */
  // async stopChannel(props: StopChannelProps) {
  //   return stopChannel(this)(props);
  // }
  //
  // static defineEventsWebhook(props: DefineEventsWebhookProps) {
  //   return defineEventsWebhook(props);
  // }

  /**
   * Define an action that gets events updated since the last run
   *
   * @group Action
   *
   * @example Poll for newly updated events
   * ```typescript
   * GoogleCalendar.defineUpdatedEventsAction({
   *   name: "pollUpdatedEvents",
   *   title: "Poll Updated Events",
   *   calendarId: "primary",
   *   trigger: {
   *     pollingFrequency: 1,  // Run once a minute
   *   },
   *   run: async ({ data: events }) => {
   *     console.log("Updated events", events);
   *   },
   * });
   * ```
   *
   * @param props
   */
  static defineUpdatedEventsAction(props: DefineUpdatedEventsActionProps) {
    return defineUpdatedEventsAction(props);
  }
}
