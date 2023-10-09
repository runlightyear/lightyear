import { GoogleCalendar } from "../GoogleCalendar";
import {
  HttpProxyResponse,
  HttpProxyResponseError,
} from "@runlightyear/lightyear";

export interface WatchEventsProps {
  /**
   * Calendar identifier. To retrieve calendar IDs call the calendarList.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.
   */
  calendarId: "primary" | string;

  /**
   * A UUID or similar unique string that identifies this channel.
   */
  id: string;

  /**
   * An arbitrary string delivered to the target address with each notification delivered over this channel.
   */
  token?: string;

  /**
   * The type of delivery mechanism used for this channel. Valid values are "web_hook" (or "webhook"). Both values refer to a channel where Http requests are used to deliver messages.
   */
  type: "web_hook" | "webhook";

  /**
   * The address where notifications are delivered for this channel.
   */
  address: string;

  /**
   * Additional parameters controlling delivery channel behavior.
   */
  params?: {
    /**
     * The time-to-live in seconds for the notification channel. Default is 604800 seconds.
     */
    ttl: string;
  };
}

export interface WatchEventsResponseData {
  kind: "api#channel";
  id: string;
  resourceId: string;
  resourceUri: string;
  token: string;
  expiration: string;
}

export interface WatchEventsResponse extends HttpProxyResponse {
  data: WatchEventsResponseData;
}

export const watchEvents =
  (self: GoogleCalendar) =>
  async (props: WatchEventsProps): Promise<WatchEventsResponse> => {
    const { calendarId, id, token, type, address, params } = props;

    return await self.post({
      url: `/calendars/${calendarId}/events/watch`,
      data: {
        id,
        token,
        type,
        address,
        params: params && {
          ttl: params.ttl,
        },
      },
    });
  };
