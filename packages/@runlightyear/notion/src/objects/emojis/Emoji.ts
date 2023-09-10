/**
 * An emoji object contains information about an emoji character. It is most often used to represent an emoji that is rendered as a page icon in the Notion UI.
 */
export interface Emoji {
  type: "emoji";
  emoji: string;
}
