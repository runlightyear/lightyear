import { HttpProxyResponse } from "@runlightyear/lightyear";
import { EventResource } from "../types/EventResource";
import { GoogleCalendar } from "../GoogleCalendar";

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
