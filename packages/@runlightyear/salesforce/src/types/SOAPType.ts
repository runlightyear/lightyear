export type SOAPType =
  /**
   * Unique ID associated with an sObject. For information on IDs, see Field Types.
   */
  | "tns:ID"
  /**
   * Can be ID, Boolean, double, integer, string, date, or dateTime.
   */
  | "xsd:anyType"
  /**
   * Base 64-encoded binary data.
   */
  | "xsd:base64Binary"
  /**
   * Boolean (true / false) values.
   */
  | "xsd:boolean"
  /**
   * Date values.
   */
  | "xsd:date"
  /**
   * Date/time values.
   */
  | "xsd:dateTime"
  /**
   * Double values.
   */
  | "xsd:double"
  /**
   * Integer values.
   */
  | "xsd:int"
  /**
   * Character strings.
   */
  | "xsd:string";
