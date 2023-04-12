import { ZoomDate } from "./ZoomDate";

export interface Meeting {
  /**
   * Meeting description. The length of agenda gets truncated to 250 characters when you list all meetings for a user. To view the complete agenda of a meeting, retrieve details for a single meeting, use the Get a meeting API.
   */
  agenda: string;

  /**
   * Time of creation.
   */
  created_at: ZoomDate;

  /**
   * Meeting duration.
   */
  duration: number;

  /**
   * ID of the user who is set as the host of the meeting.
   */
  host_id: string;

  /**
   * Meeting ID - also known as the meeting number in long (int64) format.
   */
  id: number;

  /**
   * URL using which participants can join a meeting.
   */
  join_url: string;

  /**
   * Personal meeting ID. This field is only returned if PMI was used to schedule the meeting.
   */
  pmi: string;

  /**
   * Meeting start time.
   */
  start_time: ZoomDate;

  /**
   * Timezone to format the meeting start time.
   */
  timezone: string;

  /**
   * Meeting topic.
   */
  topic: string;

  /**
   * Meeting Types:
   *   1 - Instant meeting.
   *   2 - Scheduled meeting.
   *   3 - Recurring meeting with no fixed time.
   *   8 - Recurring meeting with fixed time.Allowed: 1┃2┃3┃8
   */
  type: 1 | 2 | 3 | 8;

  /**
   * Unique Meeting ID. Each meeting instance will generate its own Meeting UUID.
   */
  uuid: string;
}
