import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import {
  sendSingleEmail,
  SendSingleEmailProps,
} from "./sending/sendSingleEmail";
import invariant from "tiny-invariant";

/**
 * @alpha
 */
export interface PostmarkProps extends AuthConnectorProps {}

/**
 * @alpha
 */
export class Postmark extends RestConnector {
  constructor(props: PostmarkProps) {
    super({
      ...props,
      baseUrl: "https://api.postmarkapp.com",
      camelize: false,
    });
  }

  authorizationHeaders(): { [p: string]: string } {
    const { apiKey } = this.getAuthData();

    invariant(apiKey, "Missing API Key");

    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Postmark-Server-Token": apiKey,
    };
  }

  async sendSingleEmail(props: SendSingleEmailProps) {
    return sendSingleEmail(this)(props);
  }
}
