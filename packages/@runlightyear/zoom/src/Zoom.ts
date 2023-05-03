import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { listMeetings, ListMeetingsProps } from "./meetings/listMeetings";
import {
  listRecordings,
  ListRecordingsProps,
} from "./cloudRecordings/listRecordings";
import {
  onNewRecordings,
  OnNewRecordingsProps,
} from "./listeners/onNewRecordings";

/**
 * @beta
 */
export interface ZoomProps extends AuthConnectorProps {}

/**
 * Zoom Connector
 *
 * @beta
 *
 * @example Install
 * ```
 * npm install @runlightyear/zoom
 * ```
 *
 * @example Import
 * ```typescript
 * import { Zoom } from "@runlightyear/zoom";
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "zoom-example",
 *   title: "Zoom Example",
 *   apps: ["zoom"],
 *   run: async ({ auths }) => {
 *     const zoom = new Zoom({ auth: auths.zoom });
 *   },
 * });
 * ```
 *
 * @example Get a list of meetings
 * ```typescript
 * const response = await zoom.listMeetings();
 *
 * const meetings = response.data.meetings;
 * ```
 *
 * @example Get a list of recordings
 * ```typescript
 * const response = await zoom.listRecordings();
 *
 * const recordings = response.data.meetings;  // Not a typo...
 * ```
 *
 * @example Poll for completed cloud recordings every minute
 * ```typescript
 * Zoom.onNewRecordings({
 *   name: "poll-for-recordings",
 *   title: "Poll for Recordings",
 *   pollingFrequency: 1,
 *   run: async ({ data }) => {
 *     console.log("recordings", data);
 *   }
 * })
 * ```
 */
export class Zoom extends RestConnector {
  constructor(props: ZoomProps) {
    super({ ...props, baseUrl: "https://api.zoom.us/v2", camelize: true });
  }

  /**
   * List all recordings
   *
   * @group Cloud Recording
   *
   * Use this API to list all cloud recordings of a user. For user-level apps, pass the me value instead of the userId parameter.
   *
   * To access a user's password protected cloud recording, send the user's OAuth access token as a Bearer token in the Authorization header. For example,
   *
   * curl -H "Authorization: Bearer <ACCESS_TOKEN>" https://{{base-domain}}/rec/archive/download/xyz
   *
   * When a user records a meeting or a webinar by choosing the Record to the Cloud option, the video, audio, and chat text are recorded in the Zoom cloud.
   *
   * @example Get a list of recordings
   * ```typescript
   * const response = await zoom.listRecordings();
   *
   * const recordings = response.data.meetings;  // Not a typo...
   * ```
   *
   * @param props
   */
  async listRecordings(props?: ListRecordingsProps) {
    return listRecordings(this)(props);
  }

  /**
   * List a user's (meeting host) scheduled meetings.
   *
   * @group Meeting
   *
   * This API only supports scheduled meetings. This API does not return information about instant meetings.
   *
   * This API only returns a user's unexpired meetings.
   *
   * @example Get a list of meetings
   * ```typescript
   * const response = await zoom.listMeetings();
   *
   * const meetings = response.data.meetings;
   * ```
   *
   * @param props
   */
  async listMeetings(props?: ListMeetingsProps) {
    return listMeetings(this)(props);
  }

  /**
   * Poll for new cloud recordings
   *
   * @group Listener
   *
   * @example Poll for completed cloud recordings every minute
   * ```typescript
   * Zoom.onNewRecordings({
   *   name: "poll-for-recordings",
   *   title: "Poll for Recordings",
   *   pollingFrequency: 1,
   *   run: async ({ data }) => {
   *     console.log("recordings", data);
   *   }
   * })
   * ```
   *
   * @example Full example: Poll for completed cloud recordings every 15 minutes and post to Slack
   * ```typescript
   * import { Zoom } from "@runlightyear/zoom";
   * import { Slack } from "@runlightyear/slack";
   *
   * Zoom.onNewRecordings({
   *   name: "post-new-recordings-to-slack",
   *   title: "Post New Zoom Recordings to Slack",
   *   pollingFrequency: 15,
   *   apps: ["slack"],
   *   run: async ({ auths, data }) => {
   *     const slack = new Slack({ auth: auths.slack });
   *
   *     for (const recording of data) {
   *       await slack.postMessage({
   *         channel: "#general",
   *         text: `New recording: ${recording.shareUrl}`,
   *       });
   *     }
   *   },
   * });
   * ```
   *
   * @param props
   */
  static onNewRecordings(props: OnNewRecordingsProps) {
    return onNewRecordings(props);
  }
}
