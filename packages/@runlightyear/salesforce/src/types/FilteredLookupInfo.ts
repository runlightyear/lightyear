export interface FilteredLookupInfo {
  /**
   * Array of the field’s controlling fields when the lookup filter is dependent on the source object.
   */
  controllingFields: Array<string>;

  /**
   * Indicates whether the lookup filter is dependent upon the source object (true) or not (false).
   */
  dependent: boolean;

  /**
   * Indicates whether the lookup filter is optional (true) or not (false).
   */
  optionalFilter: boolean;
}
