import Pusher from "pusher-js";
import { PusherCredentials } from "./getPusherCredentials";

export default async function getPusher(credentials: PusherCredentials) {
  return new Pusher(credentials.pusherKey, {
    cluster: credentials.pusherCluster,
  });
}
