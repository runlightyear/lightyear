import { PlainTextObject } from "../objects/PlainTextObject";

export interface VideoBlock {
  type: "video";
  /**
   * A tooltip for the video. Required for accessibility.
   */
  altText: string;
  /**
   * Author name to be displayed. Must be less than 50 characters.
   */
  authorName?: string;
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. You can use this block_id when you receive an interaction payload to identify the source of the action. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
  /**
   * Description for video in the form of a text object that must have type of plain_text.
   */
  description?: PlainTextObject;
  /**
   * Icon for the video provider, e.g. YouTube icon.
   */
  providerIconUrl?: string;
  /**
   * The originating application or domain of the video, e.g. YouTube.
   */
  providerName?: string;
  /**
   * Video title in the form of a text object that must have type of plain_text. text within must be less than 200 characters.
   */
  title: PlainTextObject;
  /**
   * Hyperlink for the title text. Must correspond to the non-embeddable URL for the video. Must go to an HTTPS URL.
   */
  titleUrl?: string;
  /**
   * The thumbnail image URL
   */
  thumbnailUrl: string;
  /**
   * The URL to be embedded. Must match any existing unfurl domains within the app and point to a HTTPS URL.
   */
  videoUrl: string;
}
