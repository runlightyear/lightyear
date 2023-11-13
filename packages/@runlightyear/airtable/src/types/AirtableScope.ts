export type AirtableScope =
  /**
   * See the data in records
   *
   * List records
   * Get record
   */
  | "data.records:read"

  /**
   * Create, edit, and delete records
   *
   * Delete multiple records
   * Update multiple records
   * Create records
   * Sync CSV data
   * Delete record
   * Update record
   */
  | "data.records:write"

  /**
   * See comments in records
   *
   * List comments
   */
  | "data.recordComments:read"

  /**
   * Create, edit, and delete record comments
   *
   * Create comment
   * Delete comment
   * Update comment
   */
  | "data.recordComments:write"

  /**
   * See the structure of a base, like table names or field types
   *
   * List bases
   * Get base schema
   */
  | "schema.bases:read"

  /**
   * Edit the structure of a base, like adding new fields or tables
   *
   * Create base
   * Create table
   * Update table
   * Create field
   * Update field
   * Sync CSV data
   */
  | "schema.bases:write"

  /**
   * View, create, delete webhooks for a base, as well as fetch webhook payloads.
   *
   * List webhooks
   * Create a webhook
   * Delete a webhook
   * Enable/disable webhook notifications
   * Refresh a webhook
   */
  | "webhook:manage";
