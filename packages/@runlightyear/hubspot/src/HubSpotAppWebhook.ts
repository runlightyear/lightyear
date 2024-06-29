import {
  AppWebhookConnector,
  AppWebhookDeliveryResponse,
  WebhookDelivery,
} from "@runlightyear/lightyear";
import { WebhookSubscriptionType } from "./types/WebhookSubscriptionType";
import { HubSpot } from "./HubSpot";

/**
 * @alpha
 */
export class HubSpotAppWebhook extends AppWebhookConnector {
  async getIdentifier(): Promise<string> {
    const hubspot = new HubSpot({
      auth: this.getAuthData(),
    });
    const accountInfoResponse = await hubspot.get({
      url: "/account-info/v3/details",
    });
    console.debug(accountInfoResponse);
    const portalId = accountInfoResponse.data.portalId;
    console.log("portalId", portalId);
    return String(portalId);
  }

  async subscribe(subscriptionType: WebhookSubscriptionType) {
    return this._subscribe({ filter: subscriptionType });
  }

  receiveDelivery(
    delivery: WebhookDelivery
  ): Promise<AppWebhookDeliveryResponse> {
    console.log("Delivery", delivery);
    if (delivery.body) {
      console.log("json", JSON.parse(delivery.body));
    }

    return super.receiveDelivery(delivery);
  }
}
