export interface Base {
  /**
   * Base ID, a unique identifier for a base.
   */
  id: string;
  /**
   * Base name.
   */
  name: string;
  /**
   * Permission level for the current user.
   */
  permissionLevel: "none" | "read" | "comment" | "edit" | "create";
}
