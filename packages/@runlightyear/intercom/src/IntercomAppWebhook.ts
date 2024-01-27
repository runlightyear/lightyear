import {
  AppWebhookConnector,
  AppWebhookDeliveryResponse,
  WebhookDelivery,
} from "@runlightyear/lightyear";
import { Intercom } from "./Intercom";
import { Topic } from "./types/Topic";

/**
 * @alpha
 */
export class IntercomAppWebhook extends AppWebhookConnector {
  async getIdentifier() {
    const auth = this.getAuthData();
    const intercom = new Intercom({ auth });
    const response = await intercom.get({ url: "/me" });
    console.debug("response", response);
    const workspaceId = response.data.app.idCode;
    console.log("workspaceId", workspaceId);
    return workspaceId;
  }

  async subscribe(topic: Topic) {
    return this._subscribe({ filter: topic });
  }

  async receiveDelivery(
    delivery: WebhookDelivery
  ): Promise<AppWebhookDeliveryResponse> {
    const { body } = delivery;
    if (!body) {
      throw new Error("Body missing");
    }
    const json = JSON.parse(body);
    // console.log("json", json);

    if (json.type === "notification_event") {
      return {
        response: {
          statusCode: 200,
          body: JSON.stringify({
            message: "Accepted",
          }),
        },
        forward: {
          identifier: json.app_id,
          data: json.data,
        },
      };
    }

    return super.receiveDelivery(delivery);
  }
}
