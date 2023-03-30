import { HttpProxyResponse } from "@runlightyear/lightyear";
import { GoogleCalendar } from "../GoogleCalendar";

export interface DeleteEventProps {
  /**
   * Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  calendarId: "primary" | string;

  /**
   * Event identifier.
   */
  eventId: string;

  /**
   * Deprecated. Please use sendUpdates instead.
   *
   * Whether to send notifications about the deletion of the event. Note that some emails might still be sent even if you set the value to false. The default is false.
   *
   * @deprecated
   */
  sendNotifications?: boolean;

  /**
   * Guests who should receive notifications about the deletion of the event.
   *
   * Acceptable values are:
   *   "all": Notifications are sent to all guests.
   *   "externalOnly": Notifications are sent to non-Google Calendar guests only.
   *   "none": No notifications are sent. For calendar migration tasks, consider using the Events.import method instead.
   */
  sendUpdates?: "all" | "externalOnly" | "none";
}

export interface DeleteEventResponse extends HttpProxyResponse {
  data: undefined;
}

export const deleteEvent =
  (self: GoogleCalendar) =>
  async (props: DeleteEventProps): Promise<DeleteEventResponse> => {
    const { calendarId, eventId, sendNotifications, sendUpdates } = props;

    return await self.delete({
      url: `/calendars/${calendarId}/events/${eventId}`,
      params: {
        sendNotifications,
        sendUpdates,
      },
    });
  };
