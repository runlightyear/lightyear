/**
 * type
 * String
 * The type of element. In this case type is always image.
 * Yes
 * image_url
 * String
 * The URL of the image to be displayed.
 * Yes
 * alt_text
 * String
 * A plain-text summary of the image. This should not contain any markup.
 * Yes
 */

export interface ImageElement {
  type: "image";
  /**
   * The URL of the image to be displayed.
   */
  imageUrl: string;
  /**
   * A plain-text summary of the image. This should not contain any markup.
   */
  altText: string;
}
