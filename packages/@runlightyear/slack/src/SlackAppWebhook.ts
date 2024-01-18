import {
  AppWebhookConnector,
  AppWebhookConnectorProps,
  AppWebhookDeliveryResponse,
  WebhookDelivery,
  camelize,
} from "@runlightyear/lightyear";
import { Slack } from "./Slack";
import { EventType } from "./types/EventType";

export interface SlackAppWebhookProps extends AppWebhookConnectorProps {}

export interface SlackAppWebhookSubscribeMessageProps {
  event: "message";
  subtype?: string;
  channelId: string;
}

export interface SlackAppWebhookSubscribeOtherProps {
  event: Omit<EventType, "message">;
}

export type SlackAppWebhookSubscribeProps =
  | SlackAppWebhookSubscribeMessageProps
  | SlackAppWebhookSubscribeOtherProps;

export class SlackAppWebhook extends AppWebhookConnector {
  camelize = true;
  slack: Slack;

  constructor(props: SlackAppWebhookProps) {
    super(props);
    this.slack = new Slack({ auth: this.getAuthData() });
  }

  getRedactHeaders() {
    return [...super.getRedactHeaders(), "x-slack-signature"];
  }

  async getIdentifier() {
    const {
      data: { team },
    } = await this.slack.getTeamInfo();
    return team.id;
  }

  async subscribe(props: SlackAppWebhookSubscribeProps) {
    const { event } = props;

    const filterArgs = [
      event,
      ...("subtype" in props ? [props.subtype] : []),
      ...("channelId" in props ? [props.channelId] : []),
    ];
    const filter = filterArgs.join(":");

    await this._subscribe({ filter });
  }

  async receiveDelivery(
    delivery: WebhookDelivery
  ): Promise<AppWebhookDeliveryResponse> {
    console.debug("in SlackAppWebhook.receiveDelivery", delivery);
    if (delivery.body) {
      console.debug("data", JSON.parse(delivery.body));
    }

    const { body } = delivery;

    if (body) {
      const json = camelize(JSON.parse(body));

      console.debug("json", json);

      if (json.type === "url_verification") {
        console.debug("got a url_verification challenge");
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
          forward: null,
          // subscriptionIds: [],
        };
      } else if (json.type === "event_callback") {
        console.debug("got an event_callback");
        const { event } = json as any;

        const filter = [
          event.type,
          ...("subtype" in event ? [event.subtype] : []),
          ...("channel" in event ? [event.channel] : []),
        ].join(":");

        return {
          response: {
            statusCode: 200,
          },
          forward: {
            identifier: String(json.teamId),
            filter,
            data: event,
          },
        };
      }
    }

    return super.receiveDelivery(delivery);
  }
}
