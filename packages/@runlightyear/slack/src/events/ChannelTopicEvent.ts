export interface ChannelTopicEvent {
  type: "message";
  subtype: "channel_topic";
  ts: string;
  user: string;
  topic: string;
  text: string;
}
