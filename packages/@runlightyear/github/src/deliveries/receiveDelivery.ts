import { GitHub } from "../GitHub";
import { WebhookDeliveryData } from "@runlightyear/lightyear";

export const receiveDelivery =
  (self: GitHub) => async (props: WebhookDeliveryData) => {};
