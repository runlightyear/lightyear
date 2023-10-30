import { RestConnector, RestConnectorProps } from "@runlightyear/lightyear";

/**
 * @alpha
 */
export interface GmailProps extends RestConnectorProps {}

/**
 * @alpha
 */
export class Gmail extends RestConnector {
  constructor(props: GmailProps) {
    super(props);
  }

  getBaseUrl() {
    return "https://gmail.googleapis.com";
  }
}
