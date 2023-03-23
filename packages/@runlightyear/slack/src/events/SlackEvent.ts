import { SlackMessageEvent } from "./SlackMessageEvent";
import { ChannelJoinEvent } from "./ChannelJoinEvent";
import { ChannelLeaveEvent } from "./ChannelLeaveEvent";
import { ChannelTopicEvent } from "./ChannelTopicEvent";

export type SlackEvent =
  | SlackMessageEvent
  | ChannelJoinEvent
  | ChannelLeaveEvent
  | ChannelTopicEvent;
