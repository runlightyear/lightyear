import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";

/**
 * @alpha
 */
export interface GmailProps extends AuthConnectorProps {}

/**
 * @alpha
 */
export class Gmail extends RestConnector {
  constructor(props: GmailProps) {
    super({ ...props, baseUrl: "https://gmail.googleapis.com" });
  }
}
