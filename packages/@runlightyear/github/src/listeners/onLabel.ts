import { createListener } from "./createListener";
import {
  asLabelPayload,
  LabelPayload,
} from "../webhooks/payloads/asLabelPayload";

export const onLabel = createListener<LabelPayload>({
  event: "label",
  payloadCaster: asLabelPayload,
});
