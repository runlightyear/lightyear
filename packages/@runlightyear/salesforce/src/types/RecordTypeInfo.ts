export interface RecordTypeInfo {
  /**
   * Indicates whether this record type is available (true) or not (false). Availability is used to display a list of available record types to the user when they are creating a new record.
   */
  available: boolean;

  /**
   * Indicates whether this is the default record type mapping (true) or not (false).
   */
  defaultRecordTypeMapping: boolean;

  /**
   * Developer name of this record type. Available in API versions 43.0 and later.
   */
  developerName: string;

  /**
   * Indicates whether this is the main record type (true) or not (false). The main record type is the default record type that’s used when a record has no custom record type associated with it.
   */
  master: boolean;

  /**
   * Name of this record type.
   */
  name: string;

  /**
   * ID of this record type.
   */
  recordTypeId: string;
}
