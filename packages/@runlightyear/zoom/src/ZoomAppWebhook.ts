import {
  AppWebhookConnector,
  AppWebhookDeliveryResponse,
  WebhookDelivery,
} from "@runlightyear/lightyear";
import { Zoom } from "./Zoom";
import crypto from "crypto";
import { WebhookEvent } from "./types/WebhookEvent";

/**
 * @alpha
 */
export class ZoomAppWebhook extends AppWebhookConnector {
  getRedactHeaders(): string[] {
    return [...super.getRedactHeaders(), "x-zm-signature"];
  }

  async getIdentifier(): Promise<string> {
    const zoom = new Zoom({ auth: this.getAuthData() });
    const response = await zoom.get({ url: "/users/me" });
    console.debug("response", response);
    const accountId = response.data.accountId;
    console.log("accountId", accountId);
    return accountId;
  }

  async subscribe(event: WebhookEvent) {
    return this._subscribe({ filter: event });
  }

  async receiveDelivery(delivery: WebhookDelivery) {
    console.log("Delivery", delivery);

    if (!delivery.body) {
      throw new Error("Body missing");
    }

    const json = JSON.parse(delivery.body);

    console.log("json", json);

    if (!this.secrets.secretToken) {
      throw new Error("Missing secretToken");
    }

    if (json.event === "endpoint.url_validation") {
      const hashForValidate = crypto
        .createHmac("sha256", this.secrets.secretToken)
        .update(json.payload.plainToken)
        .digest("hex");

      const response: AppWebhookDeliveryResponse = {
        response: {
          statusCode: 200,
          body: JSON.stringify({
            plainToken: json.payload.plainToken,
            encryptedToken: hashForValidate,
          }),
        },
        forward: null,
      };

      console.log("Response", response);

      return response;
    } else {
      const message = `v0:${
        delivery.headers["x-zm-request-timestamp"]
      }:${JSON.stringify(JSON.parse(delivery.body))}`;
      console.log("message", message);

      const hashForVerify = crypto
        .createHmac("sha256", this.secrets.secretToken)
        .update(message)
        .digest("hex");
      console.log("hashForVerify", hashForVerify);

      const signature = `v0=${hashForVerify}`;
      console.log("signature", signature);

      console.log("signature from header", delivery.headers["x-zm-signature"]);

      if (delivery.headers["x-zm-signature"] !== signature) {
        console.error("Signature did not match");
        return {
          response: {
            statusCode: 403,
            body: JSON.stringify({
              message: "Unauthorized",
            }),
          },
          forward: null,
        };
      }

      console.log("Signature matched");
      return {
        response: {
          statusCode: 200,
          body: JSON.stringify({
            message: "Authorized",
          }),
        },
        forward: null,
      };
    }
  }
}
