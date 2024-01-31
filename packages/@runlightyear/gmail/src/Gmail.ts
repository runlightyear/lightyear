import { RestConnector, RestConnectorProps } from "@runlightyear/lightyear";
import { AuthType } from "@runlightyear/lightyear/src";
import { GmailOAuth } from "./GmailOAuth";

/**
 * @alpha
 */
export interface GmailProps extends RestConnectorProps {}

/**
 * @alpha
 */
export class Gmail extends RestConnector {
  static authType: AuthType = "OAUTH2";
  static OAuth = GmailOAuth;

  constructor(props: GmailProps) {
    super(props);
  }

  getAuthType(): AuthType {
    return "OAUTH2";
  }

  getBaseUrl() {
    return "https://gmail.googleapis.com";
  }
}
