import Pusher from "pusher-js";
import { PusherCredentials } from "./getPusherCredentials";
import { getApiKey, getBaseUrl } from "@runlightyear/lightyear";
import crypto from "crypto";

export default async function getPusher(credentials: PusherCredentials) {
  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();

  return new Pusher(credentials.pusherKey, {
    cluster: credentials.pusherCluster,
    channelAuthorization: {
      endpoint: `${baseUrl}/api/v1/pusher/auth`,
      transport: "ajax",
      headers: {
        Authorization: `apiKey ${apiKey}`,
      },
      params: {
        member_id: crypto.randomUUID(),
      },
    },
  });
}
