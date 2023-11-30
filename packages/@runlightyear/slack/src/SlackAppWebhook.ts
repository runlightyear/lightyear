import {
  AppWebhookConnector,
  AppWebhookConnectorProps,
  AppWebhookDeliveryResponse,
  WebhookDelivery,
} from "@runlightyear/lightyear";

export interface SlackAppWebhookProps extends AppWebhookConnectorProps {}

export class SlackAppWebhook extends AppWebhookConnector {
  camelize = true;

  constructor(props: SlackAppWebhookProps) {
    super(props);
  }

  getRedactHeaders() {
    return [...super.getRedactHeaders(), "x-slack-signature"];
  }

  // async validateDelivery(delivery: WebhookDeliveryData) {
  //   const { secrets } = await getAuthData();
  //   const { headers } = delivery;
  //
  //   return headers["slack-token"] === secrets.slackToken;
  // }
  //
  async receiveDelivery(
    delivery: WebhookDelivery
  ): Promise<AppWebhookDeliveryResponse> {
    console.log("in SlackAppWebhook.receiveDelivery", delivery);
    if (delivery.body) {
      console.log("data", JSON.parse(delivery.body));
    }

    const { body } = delivery;

    if (body) {
      const json = JSON.parse(body);

      if (json.type === "url_verification") {
        console.log("got a url_verification challenge");
        return {
          response: {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              challenge: json.challenge,
            }),
          },
          // subscriptionIds: [],
        };
      }
    }

    return super.receiveDelivery(delivery);
  }
}
