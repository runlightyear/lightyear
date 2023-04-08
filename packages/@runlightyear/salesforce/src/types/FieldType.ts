export type FieldType =
  /**
   * String values.
   */
  | "string"
  /**
   * Boolean (true / false) values.
   */
  | "boolean"
  /**
   * Integer values.
   */
  | "int"
  /**
   * Double values.
   */
  | "double"
  /**
   * Date values.
   */
  | "date"
  /**
   * Date and time values.
   */
  | "datetime"
  /**
   * Base64-encoded arbitrary binary data (of type base64Binary). Used for Attachment, Document, and Scontrol objects.
   */
  | "base64"
  /**
   * Primary key field for the object. For information on IDs, see Field Types.
   */
  | "ID"
  /**
   *  Cross-references to a different object. Analogous to a foreign key field in SQL.
   */
  | "reference"
  /**
   * Currency values.
   */
  | "currency"
  /**
   * String that is displayed as a multiline text field.
   */
  | "textarea"
  /**
   * Percentage values.
   */
  | "percent"
  /**
   * Phone numbers. Values can include alphabetic characters. Client applications are responsible for phone number formatting.
   */
  | "phone"
  /**
   * URL values. Client applications should commonly display these as hyperlinks. If Field.extraTypeInfo is imageurl, the URL references an image, and can be displayed as an image instead.
   */
  | "url"

  /**
   * Email addresses.
   */
  | "email"
  /**
   * Comboboxes, which provide a set of enumerated values and allow the user to specify a value not in the list.
   */
  | "combobox"
  /**
   * Single-select picklists, which provide a set of enumerated values from which only one value can be selected.
   */
  | "picklist"
  /**
   * Multi-select picklists, which provide a set of enumerated values from which multiple values can be selected.
   */
  | "multipicklist"
  /**
   * Values can be any of these types: string, picklist, boolean, int, double, percent, ID, date, dateTime, url, or email.
   */
  | "anyType"
  /**
   * Geolocation values, including latitude and longitude, for custom geolocation fields on custom objects.
   */
  | "location";
