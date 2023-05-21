import { createListener } from "./createListener";
import {
  asRepositoryPayload,
  RepositoryPayload,
} from "../webhooks/payloads/asRepositoryPayload";

export const onRepository = createListener<RepositoryPayload>({
  event: "repository",
  payloadCaster: asRepositoryPayload,
});
