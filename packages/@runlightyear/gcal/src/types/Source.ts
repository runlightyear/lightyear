export interface Source {
  /**
   * Title of the source; for example a title of a web page or an email subject.
   */
  title: string;

  /**
   * URL of the source pointing to a resource. The URL scheme must be HTTP or HTTPS.
   */
  url: string;
}
