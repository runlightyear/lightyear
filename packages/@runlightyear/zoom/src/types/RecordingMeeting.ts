import { ZoomDate } from "./ZoomDate";
import { RecordingFile } from "./RecordingFile";

export interface RecordingMeeting {
  /**
   * Unique Identifier of the user account.
   */
  accountId: string;

  /**
   * Meeting duration.
   */
  duration: number;

  /**
   * ID of the user set as host of meeting.
   */
  hostId: string;

  /**
   * Meeting ID - also known as the meeting number.
   */
  id: number;

  /**
   * Number of recording files returned in the response of this API call. This includes the recording_files and participant_audio_files files.
   */
  recordingCount: number;

  /**
   * The time at which the meeting started.
   */
  startTime: ZoomDate;

  /**
   * Meeting topic.
   */
  topic: string;

  /**
   * The total file size of the recording. This includes the recording_files and participant_audio_files files.
   */
  totalSize: number;

  /**
   *  The recording's associated type of meeting or webinar:
   *
   *   If the recording is of a meeting:
   *
   *   1 — Instant meeting.
   *   2 — Scheduled meeting.
   *   3 — A recurring meeting with no fixed time.
   *   4 — A meeting created via PMI (Personal Meeting ID).
   *   7 — A Personal Audio Conference (PAC).
   *   8 - Recurring meeting with a fixed time.
   *
   *   If the recording is of a webinar:
   *
   *   5 — A webinar.
   *   6 — A recurring webinar without a fixed time
   *   9 — A recurring webinar with a fixed time.
   *
   *   If the recording is not from a meeting or webinar:
   *
   *   99 — A recording uploaded via the Recordings interface on the Zoom Web Portal.
   */

  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 99;

  /**
   * Unique Meeting Identifier. Each instance of the meeting will have its own UUID.
   */
  uuid: string;

  /**
   * The cloud recording's password to be used in the URL. This recording's password can be directly spliced in play_url or share_url with ?pwd= to access and play. For example, 'https://zoom.us/rec/share/**************?pwd=yNYIS408EJygs7rE5vVsJwXIz4-VW7MH'. If you want to use this field, please contact Zoom support.
   */
  recordingPlayPasscode: string;

  /**
   * Recording file list
   */
  recordingFiles: Array<RecordingFile>;

  /**
   * Lightyear note: Not documented in API, but observed in testing
   */
  shareUrl: string;
}
