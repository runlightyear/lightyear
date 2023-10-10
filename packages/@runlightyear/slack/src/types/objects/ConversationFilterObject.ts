/**
 * include
 * String[]
 * Indicates which type of conversations should be included in the list. When this field is provided, any conversations that do not match will be excluded
 *
 * You should provide an array of strings from the following options: im, mpim, private, and public. The array cannot be empty.
 * No
 * exclude_external_shared_channels
 * Boolean
 * Indicates whether to exclude external shared channels from conversation lists. This field will not exclude users from shared channels. Defaults to false.
 * No
 * exclude_bot_users
 * Boolean
 * Indicates whether to exclude bot users from conversation lists. Defaults to false.
 */

export interface ConversationFilterObject {
  /**
   * Indicates which type of conversations should be included in the list. When this field is provided, any conversations that do not match will be excluded
   *
   * You should provide an array of strings from the following options: im, mpim, private, and public. The array cannot be empty.
   */
  include?: Array<"im" | "mpim" | "private" | "public">;
  /**
   * Indicates whether to exclude external shared channels from conversation lists. This field will not exclude users from shared channels. Defaults to false.
   */
  excludeExternalSharedChannels?: boolean;
  /**
   * Indicates whether to exclude bot users from conversation lists. Defaults to false.
   */
  excludeBotUsers?: boolean;
}
