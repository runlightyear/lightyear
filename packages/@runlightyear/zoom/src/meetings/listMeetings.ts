import { Zoom } from "../Zoom";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { ZoomDate } from "../types/ZoomDate";
import { Meeting } from "../types/Meeting";
import { ListMetadata } from "../types/ListMetadata";

export interface ListMeetingsProps {
  /**
   * The user ID or email address of the user. For user-level apps, pass the me value.
   *
   * Default: "me"
   */
  userId?: string;

  /**
   * Default: scheduled
   *
   * The type of meeting:
   *
   *   scheduled — All valid previous (unexpired) meetings, live meetings, and upcoming scheduled meetings.
   *   live — All the ongoing meetings.
   *   upcoming — All upcoming meetings, including live meetings.
   *   upcoming_meetings — All upcoming meetings, including live meetings.
   *   previous_meetings — All the previous meetings.
   */
  type?:
    | "scheduled"
    | "live"
    | "upcoming"
    | "upcoming_meetings"
    | "previous_meetings";

  /**
   * Default: 30
   * Max: 300
   *
   * The number of records returned within a single API call.
   */
  pageSize?: number;

  /**
   * Use the next page token to paginate through large result sets. A next page token is returned whenever the set of available results exceeds the current page size. This token's expiration period is 15 minutes.
   */
  nextPageToken?: string;

  /**
   * The page number of the current page in the returned records.
   */
  pageNumber?: number;

  /**
   * The start date.
   */
  from?: ZoomDate;

  /**
   * The end date.
   */
  to?: ZoomDate;
}

export interface ListMeetingsResponseData extends ListMetadata {
  /**
   * List of Meeting objects.
   */
  meetings: Array<Meeting>;
}

export interface ListMeetingsResponse extends HttpProxyResponse {
  data: ListMeetingsResponseData;
}

export const listMeetings =
  (self: Zoom) =>
  async (props: ListMeetingsProps): Promise<ListMeetingsResponse> => {
    const {
      userId = "me",
      type,
      pageSize,
      nextPageToken,
      pageNumber,
      from,
      to,
    } = props;

    return await self.get({
      url: `/users/${userId}/meetings`,
      params: {
        type,
        page_size: pageSize,
        next_page_token: nextPageToken,
        page_number: pageNumber,
        from,
        to,
      },
    });
  };
