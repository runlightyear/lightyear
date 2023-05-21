import { createListener } from "./createListener";
import {
  asStatusPayload,
  StatusPayload,
} from "../webhooks/payloads/asStatusPayload";

export const onStatus = createListener<StatusPayload>({
  event: "status",
  payloadCaster: asStatusPayload,
});
