import { HttpProxyResponse } from "@runlightyear/lightyear";
import { GoogleCalendar } from "../GoogleCalendar";
import { EventResource, EventResourceInput } from "../types/EventResource";

export interface CreateEventProps {
  /**
   * Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  calendarId: "primary" | string;

  /**
   * Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. Acceptable values are 0 to 1, inclusive.
   */
  conferenceDataVersion?: number;

  /**
   * The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned.
   */
  maxAttendees?: number;

  /**
   * Whether to send notifications about the creation of the new event. Note that some emails might still be sent. The default is false.
   *
   *   Acceptable values are:
   *     "all": Notifications are sent to all guests.
   *   "externalOnly": Notifications are sent to non-Google Calendar guests only.
   *   "none": No notifications are sent.
   *   Warning: Using the value none can have significant adverse effects, including events not syncing to external calendars or events being lost altogether for some users. For calendar migration tasks, consider using the events.import method instead.
   */
  sendUpdates?: "all" | "externalOnly" | "none";

  /**
   * Whether API client performing operation supports event attachments. Optional. The default is false.
   */
  supportsAttachments?: boolean;

  /**
   * The event to create
   */
  event: EventResourceInput;
}

export interface CreateEventResponse extends HttpProxyResponse {
  data: EventResource;
}

export const createEvent =
  (self: GoogleCalendar) =>
  async (props: CreateEventProps): Promise<CreateEventResponse> => {
    const {
      calendarId,
      conferenceDataVersion,
      maxAttendees,
      sendUpdates,
      supportsAttachments,
      event,
    } = props;

    return await self.post({
      url: `/calendars/${calendarId}/events`,
      params: {
        conferenceDataVersion,
        maxAttendees,
        sendUpdates,
        supportsAttachments,
      },
      data: event,
    });
  };
