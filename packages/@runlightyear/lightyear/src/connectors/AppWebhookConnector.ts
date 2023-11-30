import { WebhookDelivery, AppWebhookDeliveryResponse } from "../base/delivery";

export interface AppWebhookConnectorProps {}

export abstract class AppWebhookConnector {
  abstract camelize: boolean;

  protected constructor(props: AppWebhookConnectorProps) {}

  getRedactHeaders() {
    return ["cookie", "authorization"];
  }

  getRedactKeys() {
    return [];
  }

  async validateDelivery(delivery: WebhookDelivery) {
    return true;
  }

  async receiveDelivery(
    delivery: WebhookDelivery
  ): Promise<AppWebhookDeliveryResponse> {
    console.debug("XXX Received delivery", delivery);

    const validated = await this.validateDelivery(delivery);
    if (!validated) {
      return {
        response: {
          statusCode: 401,
        },
      };
    }

    return {
      response: {
        statusCode: 200,
      },
    };
  }
}
