import { HttpProxyResponse } from "@runlightyear/lightyear";
import { EventResource } from "../types/EventResource";
import { GoogleCalendar } from "../GoogleCalendar";

/**
 * Parameters
 * Parameter name	Value	Description
 * Path parameters
 * calendarId	string	Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
 * eventId	string	Event identifier.
 * Optional query parameters
 * alwaysIncludeEmail	boolean	Deprecated and ignored. A value will always be returned in the email field for the organizer, creator and attendees, even if no real email address is available (i.e. a generated, non-working value will be provided).
 * maxAttendees	integer	The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participant is returned. Optional.
 * timeZone	string	Time zone used in the response. Optional. The default is the time zone of the calendar.
 */
export interface GetEventProps {
  calendarId: "primary" | string;
  eventId: string;
  alwaysIncludeEmail?: boolean;
  maxAttendees?: number;
  timeZone?: string;
}

export interface GetEventResponse extends HttpProxyResponse {
  data: EventResource;
}

export const getEvent =
  (self: GoogleCalendar) =>
  async (props: GetEventProps): Promise<GetEventResponse> => {
    const { calendarId, eventId, alwaysIncludeEmail, maxAttendees, timeZone } =
      props;

    return await self.get({
      url: `/calendars/${calendarId}/events/${eventId}`,
      params: {
        alwaysIncludeEmail,
        maxAttendees,
        timeZone,
      },
    });
  };
