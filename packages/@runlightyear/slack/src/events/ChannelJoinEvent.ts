export interface ChannelJoinEvent {
  type: "message";
  subtype: "channel_join";
  ts: string;
  user: string;
  text: string;
  inviter: string;
}
