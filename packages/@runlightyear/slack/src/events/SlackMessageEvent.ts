export interface SlackMessageEvent {
  type: "message";
  subtype: never;
  user: string;
  ts: string;
  text: string;
  blocks: Array<object>;
  team: string;
  channel: string;
  eventTs: string;
  channelType: string;
}
