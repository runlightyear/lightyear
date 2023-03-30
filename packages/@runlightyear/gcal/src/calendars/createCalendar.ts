import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Calendar } from "../types/Calendar";
import { GoogleCalendar } from "../GoogleCalendar";

export interface CreateCalendarProps {
  /**
   * Title of the calendar.
   */
  summary: string;
}

export interface CreateCalendarResponse extends HttpProxyResponse {
  data: Calendar;
}

export const createCalendar =
  (self: GoogleCalendar) =>
  async (props: CreateCalendarProps): Promise<CreateCalendarResponse> => {
    const { summary } = props;

    return await self.post({
      url: `/calendars`,
      data: {
        summary,
      },
    });
  };
