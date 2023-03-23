import { SlackEvent } from "../events/SlackEvent";

export const asSlackEvent = (data: unknown) => {
  return data as SlackEvent;
};
