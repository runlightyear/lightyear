import { GoogleCalendar } from "../GoogleCalendar";

export interface StopChannelProps {
  id: string;
  resourceId: string;
}

export const stopChannel =
  (self: GoogleCalendar) => async (props: StopChannelProps) => {
    const { id, resourceId } = props;

    return await self.post({
      url: `/channels/stop`,
      data: {
        id,
        resourceId,
      },
    });
  };
