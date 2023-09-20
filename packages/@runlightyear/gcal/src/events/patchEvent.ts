import {
  EventResource,
  EventResourceInput,
  EventResourcePatchInput,
} from "../types/EventResource";
import { GoogleCalendar } from "../GoogleCalendar";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface PatchEventProps {
  /**
   * Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  calendarId: "primary" | string;
  /**
   * Event identifier.
   */
  eventId: string;
  /**
   * Version number of conference data supported by the API client. Version 0 assumes no conference data support and ignores conference data in the event's body. Version 1 enables support for copying of ConferenceData as well as for creating new conferences using the createRequest field of conferenceData. The default is 0. Acceptable values are 0 to 1, inclusive.
   */
  conferenceDataVersion?: number;
  /**
   * The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned.
   */
  maxAttendees?: number;
  /**
   * Guests who should receive notifications about the event update (for example, title changes, etc.).
   *
   * Acceptable values are:
   *   "all": Notifications are sent to all guests.
   *   "externalOnly": Notifications are sent to non-Google Calendar guests only.
   *   "none": No notifications are sent. For calendar migration tasks, consider using the Events.import method instead.
   */
  sendUpdates?: "all" | "externalOnly" | "none";
  /**
   * Whether API client performing operation supports event attachments. Optional. The default is False.
   */
  supportsAttachments?: boolean;

  /**
   * The new event data
   */
  event: EventResourcePatchInput;
}

export interface PatchEventResponse extends HttpProxyResponse {
  data: EventResource;
}

export const patchEvent =
  (self: GoogleCalendar) =>
  async (props: PatchEventProps): Promise<PatchEventResponse> => {
    const {
      calendarId,
      eventId,
      conferenceDataVersion,
      maxAttendees,
      sendUpdates,
      supportsAttachments,
      event,
    } = props;

    return await self.patch({
      url: `/calendars/${calendarId}/events/${eventId}`,
      params: {
        conferenceDataVersion,
        maxAttendees,
        sendUpdates,
        supportsAttachments,
      },
      data: event,
    });
  };
