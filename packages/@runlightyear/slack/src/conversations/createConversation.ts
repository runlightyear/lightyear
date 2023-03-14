import { Slack } from "../Slack";

export interface CreateConversationProps {
  /**
   * Name of the public or private channel to create
   *
   * Example
   *   mychannel
   */
  name: string;

  /**
   * Create a private channel instead of a public one
   */
  isPrivate?: boolean;

  /**
   * Encoded team id to create the channel in, required if org token is used
   *
   * Example
   *   T1234567890
   */
  teamId?: string;
}

export const createConversation =
  (self: Slack) => async (props: CreateConversationProps) => {
    const { name, isPrivate, teamId } = props;

    return self.post({
      url: "conversations.create",
      data: {
        name,
        is_private: isPrivate,
        team_id: teamId,
      },
    });
  };
