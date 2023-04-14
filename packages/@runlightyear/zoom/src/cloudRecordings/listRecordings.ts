import { HttpProxyResponse } from "@runlightyear/lightyear";
import { Zoom } from "../Zoom";
import { ListMetadata } from "../types/ListMetadata";
import { RecordingMeeting } from "../types/RecordingMeeting";

export interface ListRecordingsProps {
  /**
   * Default: me
   *
   * The user ID or email address of the user. For user-level apps, pass the me value.
   */
  userId?: string;

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
   * Default: false
   *
   * Query metadata of recording if an On-Premise Meeting Connector was used for the meeting.
   */

  mc?: string;

  /**
   * Default: false
   * Query trash. true: List recordings from trash.
   *   false: Do not list recordings from the trash.
   *   The default value is false. If you set it to true, you can use the trash_type property to indicate the type of Cloud recording that you need to retrieve.
   */
  trash?: boolean;

  /**
   * The start date in 'yyyy-mm-dd' UTC format for the date range for which you would like to retrieve recordings. The maximum range can be a month. If no value is provided for this field, the default will be current date. For example, if you make the API request on June 30, 2020, without providing the “from” and “to” parameters, by default the value of 'from' field will be “2020-06-30” and the value of the 'to' field will be “2020-07-01”.
   *
   * Note: The "trash" files cannot be filtered by date range and thus, the "from" and "to" fields should not be used for trash files.
   */
  from?: string;

  /**
   * End date in 'yyyy-mm-dd' 'yyyy-mm-dd' UTC format.
   */
  to?: string;

  /**
   * Default: meeting_recordings
   * The type of cloud recording that you would like to retrieve from the trash. The value can be one of the following:
   *   meeting_recordings: List all meeting recordings from the trash.
   *   recording_file: List all individual recording files from the trash.
   */
  trashType?: "meeting_recordings" | "recording_file";

  /**
   * The meeting ID.
   */
  meetingId?: number;
}

export interface ListRecordingsResponseData extends ListMetadata {
  /**
   * Recording list
   */
  meetings: Array<RecordingMeeting>;
}

export interface ListRecordingsResponse extends HttpProxyResponse {
  data: ListRecordingsResponseData;
}

export const listRecordings =
  (self: Zoom) =>
  async (props?: ListRecordingsProps): Promise<ListRecordingsResponse> => {
    const {
      userId = "me",
      pageSize,
      nextPageToken,
      mc,
      trash,
      from,
      to,
      trashType,
      meetingId,
    } = props || {};

    return await self.get({
      url: `/users/${userId}/recordings`,
      params: {
        page_size: pageSize,
        next_page_token: nextPageToken,
        mc,
        trash,
        from,
        to,
        trash_type: trashType,
        meeting_id: meetingId,
      },
    });
  };
