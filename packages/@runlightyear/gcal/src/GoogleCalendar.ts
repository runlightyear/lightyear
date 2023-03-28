import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface GoogleCalendarProps extends AuthConnectorProps {}

/**
 * @beta
 */
export class GoogleCalendar extends RestConnector {
  constructor(props: GoogleCalendarProps) {
    super({ ...props, baseUrl: "https://www.googleapis.com/calendar/v3" });
  }
}
