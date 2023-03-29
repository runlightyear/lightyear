import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface GoogleSheetsProps extends AuthConnectorProps {}

/**
 * @beta
 */
export class GoogleSheets extends RestConnector {
  constructor(props: GoogleSheetsProps) {
    super({ ...props, baseUrl: "https://sheets.googleapis.com/v4" });
  }
}
