import { RestConnector, RestConnectorProps } from "@runlightyear/lightyear";
import {
  sendSingleEmail,
  SendSingleEmailProps,
} from "./sending/sendSingleEmail";
import invariant from "tiny-invariant";

/**
 * @alpha
 */
export interface PostmarkProps extends RestConnectorProps {}

/**
 * @alpha
 */
export class Postmark extends RestConnector {
  constructor(props: PostmarkProps) {
    super({
      camelize: false,
      ...props,
    });
  }

  getBaseUrl(): string {
    return "https://api.postmarkapp.com";
  }

  getDefaultHeaders() {
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
