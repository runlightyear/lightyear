import { SlackMessageEvent } from "../events/SlackMessageEvent";

export const asSlackMessageEvent = (data: unknown) => {
  return data as SlackMessageEvent;
};
