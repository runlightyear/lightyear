export interface Attachment {
  /**
   * URL link to the attachment.
   *
   * For adding Google Drive file attachments use the same format as in alternateLink property of the Files resource in the Drive API.
   *
   * Required when adding an attachment.
   */
  fileUrl: string;
}
