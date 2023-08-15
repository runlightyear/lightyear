import { createListener } from "./createListener";
import { asPushPayload, PushPayload } from "../webhooks/payloads/asPushPayload";

export const onPush = createListener<PushPayload>({
  event: "push",
  payloadCaster: asPushPayload,
});
