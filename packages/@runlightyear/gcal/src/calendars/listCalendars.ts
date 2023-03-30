import { AccessRole } from "../types/AccessRole";
import { HttpProxyResponse } from "@runlightyear/lightyear";
import { CalendarList } from "../types/CalendarList";
import { GoogleCalendar } from "../GoogleCalendar";

export interface ListCalendarsProps {
  /**
   * Maximum number of entries returned on one result page. By default the value is 100 entries. The page size can never be larger than 250 entries.
   */
  maxResults?: number;

  /**
   * The minimum access role for the user in the returned entries. Optional. The default is no restriction.
   *
   * Acceptable values are:
   * "freeBusyReader": The user can read free/busy information.
   * "owner": The user can read and modify events and access control lists.
   * "reader": The user can read events that are not private.
   * "writer": The user can read and modify events.
   */
  minAccessRole?: AccessRole;

  /**
   * Token specifying which result page to return.
   */
  pageToken?: string;

  /**
   * Whether to include deleted calendar list entries in the result.
   *
   * The default is False.
   */
  showDeleted?: boolean;

  /**
   * Whether to show hidden entries.
   *
   * The default is False.
   */
  showHidden?: boolean;

  /**
   * Token obtained from the nextSyncToken field returned on the last page of results from the previous list request. It makes the result of this list request contain only entries that have changed since then. If only read-only fields such as calendar properties or ACLs have changed, the entry won't be returned. All entries deleted and hidden since the previous list request will always be in the result set and it is not allowed to set showDeleted neither showHidden to False.
   * To ensure client state consistency minAccessRole query parameter cannot be specified together with nextSyncToken.
   * If the syncToken expires, the server will respond with a 410 GONE response code and the client should clear its storage and perform a full synchronization without any syncToken.
   * Learn more about incremental synchronization.
   *
   * The default is to return all entries.
   */
  syncToken?: string;
}

export interface ListCalendarsResponse extends HttpProxyResponse {
  data: CalendarList;
}

export const listCalendars =
  (self: GoogleCalendar) =>
  async (props?: ListCalendarsProps): Promise<ListCalendarsResponse> => {
    const {
      maxResults,
      minAccessRole,
      pageToken,
      showDeleted,
      showHidden,
      syncToken,
    } = props || {};

    return await self.get({
      url: `/users/me/calendarList`,
      params: {
        maxResults,
        minAccessRole,
        pageToken,
        showDeleted,
        showHidden,
        syncToken,
      },
    });
  };
