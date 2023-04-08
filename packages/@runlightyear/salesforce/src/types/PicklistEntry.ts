export interface PicklistEntry {
  /**
   * Indicates whether this item must be displayed (true) or not (false) in the drop-down list for the picklist field in the user interface.
   */
  active: boolean;

  /**
   * A set of bits where each bit indicates a controlling value for which this PicklistEntry is valid. See About Dependent Picklists.
   */
  validFor: Array<number>;

  /**
   * Indicates whether this item is the default item (true) in the picklist or not (false). Only one item in a picklist can be designated as the default.
   */
  defaultValue: boolean;

  /**
   * Display name of this item in the picklist.
   */
  label: string;

  /**
   * Value of this item in the picklist.
   */
  value: string;
}
