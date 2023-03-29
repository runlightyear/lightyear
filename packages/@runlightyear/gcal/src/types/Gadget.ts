export interface Gadget {
  /**
   * The gadget's display mode. Deprecated. Possible values are:
   *   "icon" - The gadget displays next to the event's title in the calendar view.
   *   "chip" - The gadget displays when the event is clicked.
   */
  display: "icon" | "chip";
  /**
   * The gadget's height in pixels. The height must be an integer greater than 0.
   *
   * @deprecated
   */
  height: number;

  /**
   * The gadget's icon URL. The URL scheme must be HTTPS.
   *
   * @deprecated
   */
  iconLink: "https";

  /**
   * The gadget's URL. The URL scheme must be HTTPS.
   *
   * @deprecated
   */
  link: string;

  /**
   * Preferences.
   */
  preferences: object;

  /**
   * The gadget's title.
   *
   * @deprecated
   */
  title: string;

  /**
   * The gadget's type.
   */
  type: string;

  /**
   * The gadget's width in pixels. The width must be an integer greater than 0.
   *
   * @deprecated
   */
  width: number;
}
