import { SlackEvent } from "../events/SlackEvent";

export const parseSlackEvent = (data: unknown) => {
  return data as SlackEvent;
};
