export interface ActionOverride {
  /**
   * Represents the environment to which the action override applies. For example, a Large value in this field represents the Lightning Experience desktop environment, and is valid for Lightning pages and Lightning components. A Small value represents the Salesforce mobile app on a phone or tablet.
   *
   * This field is available in API version 37.0 and later.
   */
  formFactor: string;

  /**
   * Indicates whether the action override is available in the Salesforce mobile app (true) or not (false).
   */
  isAvailableInTouch: boolean;

  /**
   * The name of the action that overrides the default action. For example, if the new/create page was overridden with a custom action, the name might be “New”.
   */
  name: string;

  /**
   * The ID of the page for the action override.
   *
   */
  pageId: string;

  /**
   * The URL of the item being used for the action override, such as a Visualforce page. Returns as null for Lightning page overrides.
   */
  url: string;
}
