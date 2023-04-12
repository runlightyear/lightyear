import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { listMeetings, ListMeetingsProps } from "./meetings/listMeetings";
import {
  listRecordings,
  ListRecordingsProps,
} from "./cloudRecordings/listRecordings";

/**
 * @beta
 */
export interface ZoomProps extends AuthConnectorProps {}

/**
 * Zoom Connector
 *
 * @beta
 */
export class Zoom extends RestConnector {
  constructor(props: ZoomProps) {
    super({ ...props, baseUrl: "https://api.zoom.us/v2", camelize: true });
  }

  async listRecordings(props: ListRecordingsProps) {
    return listRecordings(this)(props);
  }

  async listMeetings(props: ListMeetingsProps) {
    return listMeetings(this)(props);
  }
}
