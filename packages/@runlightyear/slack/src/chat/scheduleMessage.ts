import { deCamelize } from "@runlightyear/lightyear";
import { Slack } from "../Slack";
import { Block, BlockInput } from "../types/blocks/Block";

export interface ScheduleMessageProps {
  /**
   * Channel, private group, or IM channel to send message to. Can be an encoded ID, or a name.
   */
  channel: string;

  /**
   * Unix EPOCH timestamp of time in future to send the message.
   *
   * Example
   * 299876400
   */
  postAt: number;

  /**
   * The formatted text of the message to be published. If blocks are included, this will become the fallback text used in notifications.
   */
  text?: string;

  /**
   * An array of structured blocks
   */
  blocks?: BlockInput[];

  /**
   * An array of attachments.
   */
  attachments?: string;

  /**
   * Set to true to post the message as the authed user, instead of as a bot. Defaults to false. Cannot be used by new Slack apps.
   */
  asUser?: boolean;

  /**
   * Emoji to use as the icon for this message. Overrides iconUrl. Must be used in conjunction with asUser set to false, otherwise ignored.
   *
   * Example
   * :chart_with_upwards_trend:
   */
  // iconEmoji?: string;

  /**
   * URL to an image to use as the icon for this message. Must be used in conjunction with asUser set to false, otherwise ignored.
   */
  // iconUrl?: string;

  /**
   * Find and link user groups. No longer supports linking individual users.
   */
  linkNames?: string;

  /**
   * Metadata you post to Slack is accessible to any app or user who is a member of that workspace.
   */
  metadata?: Event;

  /**
   * Disable Slack markup parsing by setting to false. Enabled by default.
   */
  // mrkdwn?: boolean;

  /**
   * Change how messages are treated.
   *
   * Messages are formatted as described in the formatting spec. The formatting behavior will change depending on the value of parse.
   *
   * By default, URLs will be hyperlinked. Set parse to none to remove the hyperlinks.
   *
   * The behavior of parse is different for text formatted with mrkdwn. By default, or when parse is set to none, mrkdwn formatting is implemented. To ignore mrkdwn formatting, set parse to full.
   */
  parse?: "full" | "none";

  /**
   * Used in conjunction with thread_ts and indicates whether reply should be made visible to everyone in the channel or conversation. Defaults to false.
   */
  replyBroadcast?: boolean;

  /**
   * Provide another message's ts value to make this message a reply. Avoid using a reply's ts value; use its parent instead.
   */
  threadTs?: string;

  /**
   * Pass true to enable unfurling of primarily text-based content.
   */
  unfurlLinks?: boolean;

  /**
   * Pass false to disable unfurling of media content.
   */
  unfurlMedia?: boolean;

  /**
   * Set your bot's user name. Must be used in conjunction with as_user set to false, otherwise ignored.
   */
  // username?: string;
}

export const scheduleMessage =
  (self: Slack) => async (props: ScheduleMessageProps) => {
    const {
      channel,
      postAt,
      text,
      blocks,
      attachments,
      asUser,
      // iconEmoji,
      // iconUrl,
      linkNames,
      metadata,
      // mrkdwn,
      parse,
      replyBroadcast,
      threadTs,
      unfurlLinks,
      unfurlMedia,
      // username,
    } = props;

    return self.post({
      url: "chat.scheduleMessage",
      data: {
        channel,
        post_at: postAt,
        text,
        blocks: blocks && JSON.stringify(deCamelize(blocks as any)),
        attachments: attachments && JSON.stringify(attachments),
        as_user: asUser,
        // iconEmoji,
        // iconUrl,
        link_names: linkNames,
        metadata,
        // mrkdwn,
        parse,
        reply_broadcast: replyBroadcast,
        thread_ts: threadTs,
        unfurl_links: unfurlLinks,
        unfurl_media: unfurlMedia,
        // username,
      },
    });
  };
