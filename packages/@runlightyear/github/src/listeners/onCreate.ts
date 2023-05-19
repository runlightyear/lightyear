import { createListener } from "./createListener";
import {
  asCreatePayload,
  CreatePayload,
} from "../webhooks/payloads/asCreatePayload";

export const onCreate = createListener<CreatePayload>({
  event: "create",
  payloadCaster: asCreatePayload,
});
