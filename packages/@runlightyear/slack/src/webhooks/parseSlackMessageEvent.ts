export const parseSlackMessageEvent = (data: unknown) => {
  return data as MessageEvent;
};
