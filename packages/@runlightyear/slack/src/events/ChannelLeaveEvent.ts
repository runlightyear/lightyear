export interface ChannelLeaveEvent {
  type: "message";
  subtype: "channel_leave";
  ts: string;
  user: string;
  text: string;
}
