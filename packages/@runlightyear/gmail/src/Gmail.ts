import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";

/**
 * @beta
 */
export interface GmailProps extends AuthConnectorProps {}

/**
 * @beta
 */
export class Gmail extends RestConnector {
  constructor(props: GmailProps) {
    super({ ...props, baseUrl: "https://gmail.googleapis.com" });
  }
}
