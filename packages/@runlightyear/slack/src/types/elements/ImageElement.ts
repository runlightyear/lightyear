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
