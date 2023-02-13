export type LinearScope =
  /**
   *  (Default) Read access for the user's account. This scope will always be present.
   */
  | "read"
  /**
   * Write access for the user's account. If your application only needs to create comments, use a more targeted scope
   */
  | "write"
  /**
   * Allows creating new issues and their attachments
   */
  | "issues:create"
  /**
   * Allows creating new issue comments
   */
  | "comments:create"
  /**
   * Full access to admin level endpoints. You should never ask for this permission unless it's absolutely needed
   */
  | "admin";
