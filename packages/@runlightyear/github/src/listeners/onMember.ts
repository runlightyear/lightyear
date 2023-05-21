import { createListener } from "./createListener";
import {
  asMemberPayload,
  MemberPayload,
} from "../webhooks/payloads/asMemberPayload";

export const onMember = createListener<MemberPayload>({
  event: "member",
  payloadCaster: asMemberPayload,
});
