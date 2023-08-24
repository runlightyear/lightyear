import Pusher from "pusher-js";
import { PusherCredentials } from "./getPusherCredentials";
import { getApiKey } from "@runlightyear/lightyear";
import crypto from "crypto";

export default async function getPusher(credentials: PusherCredentials) {
  const apiKey = getApiKey();

  return new Pusher(credentials.pusherKey, {
    cluster: credentials.pusherCluster,
    channelAuthorization: {
      endpoint: "http://localhost:3000/api/v1/pusher/auth",
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
