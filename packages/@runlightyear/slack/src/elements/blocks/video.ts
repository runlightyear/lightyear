import { PlainText } from "../objects/plainText";

export interface VideoOptions {
  /**
   * A tooltip for the video. Required for accessibility
   */
  altText: string;
  /**
   * Author name to be displayed. Must be less than 50 characters.
   */
  authorName?: string;
  /**
   * Description for video in plain text format.
   */
  description?: PlainText;
  /**
   * Icon for the video provider - ex. Youtube icon
   */
  providerIconUrl?: string;
  /**
   * The originating application or domain of the video ex. Youtube
   */
  providerName?: string;
  /**
   * Video title in plain text format. Must be less than 200 characters.
   */
  title: PlainText;
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
  /**
   * A string acting as a unique identifier for a block. If not specified, one will be generated. Maximum length for this field is 255 characters. block_id should be unique for each message and each iteration of a message. If a message is updated, use a new block_id.
   */
  blockId?: string;
}

export interface Video extends VideoOptions {
  type: "video";
}

export default function video(options: VideoOptions) {
  const { videoUrl, altText, title, blockId } = options;

  return {
    type: "video",
    videoUrl,
    altText,
    title,
    blockId,
  };
}
