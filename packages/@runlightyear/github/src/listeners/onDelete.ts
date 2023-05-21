import { createListener } from "./createListener";
import {
  asDeletePayload,
  DeletePayload,
} from "../webhooks/payloads/asDeletePayload";

export const onDelete = createListener<DeletePayload>({
  event: "delete",
  payloadCaster: asDeletePayload,
});
