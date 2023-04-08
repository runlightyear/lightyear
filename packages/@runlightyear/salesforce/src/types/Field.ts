import { FilteredLookupInfo } from "./FilteredLookupInfo";
import { PicklistEntry } from "./PicklistEntry";
import { SOAPType } from "./SOAPType";
import { FieldType } from "./FieldType";

export interface Field {
  /**
   * Indicates whether this field is an autonumber field (true) or not (false). Analogous to a SQL IDENTITY type, autonumber fields are read only, non-createable text fields with a maximum length of 30 characters. Autonumber fields are read-only fields used to provide a unique ID that is independent of the internal object ID (such as a purchase order number or invoice number). Autonumber fields are configured entirely in the Salesforce user interface. The API provides access to this attribute so that client applications can determine whether a given field is an autonumber field.
   */
  autonumber: boolean;

  /**
   * For variable-length fields (including binary fields), the maximum size of the field, in bytes.
   */
  byteLength: number;

  /**
   * Indicates whether the field is a custom formula field (true) or not (false). Note that custom formula fields are always read-only.
   */
  calculated: boolean;

  /**
   * Indicates whether the field is case sensitive (true) or not (false).
   */
  caseSensitive: boolean;

  /**
   * The name of the field that controls the values of this picklist. It only applies if type is picklist or multipicklist and dependentPicklist is true. The mapping of controlling field to dependent field is stored in the validFor attribute of each PicklistEntry for this picklist.
   */
  controllerName: string;

  /**
   * Indicates whether the field can be created (true) or not (false). If true, then this field value can be set in a create() call.
   */
  createable: boolean;

  /**
   * Indicates whether the field is a custom field (true) or not (false).
   */
  custom: boolean;

  /**
   * Indicates whether data translation is enabled for the field (true) or not (false). Available in API version 49.0 and later.
   */
  dataTranslationEnabled: boolean;

  /**
   * Indicates whether this field is defaulted when created (true) or not (false). If true, then Salesforce implicitly assigns a value for this field when the object is created, even if a value for this field is not passed in on the create() call. For example, in the Opportunity object, the Probability field has this attribute because its value is derived from the Stage field. Similarly, the Owner has this attribute on most objects because its value is derived from the current user (if the Owner field is not specified).
   */
  defaultedOnCreate: boolean;

  /**
   * The default value specified for this field if the formula is not used. If no value has been specified, this field is not returned.
   */
  defaultValueFormula: string;

  /**
   * Indicates whether a picklist is a dependent picklist (true) where available values depend on the chosen values from a controlling field, or not (false). See About Dependent Picklists.
   */
  dependentPicklist: boolean;

  /**
   * Reserved for future use.
   */
  deprecatedAndHidden: boolean;

  /**
   * For fields of type integer. Maximum number of digits. The API returns an error if an integer value exceeds the number of digits.
   */
  digits: number;

  /**
   * Indicates how the geolocation values of a Location custom field appears in the user interface. If true, the geolocation values appear in decimal notation. If false, the geolocation values appear as degrees, minutes, and seconds.
   */
  displayLocationInDecimal: boolean;

  /**
   * Note
   *
   * This page is about Shield Platform Encryption, not Classic Encryption. What's the difference?
   *
   * Indicates whether this field is encrypted. This value only appears in the results of a describeSObjects() call when it is true; otherwise, it is omitted from the results. This field is available in API version 31.0 and later.
   */
  encrypted: boolean;

  /**
   * If the field is a textarea field type, indicates if the text area is plain text (plaintextarea) or rich text (richtextarea).
   *
   * If the field is a url field type, if this value is imageurl, the URL references an image file. Available on standard fields on standard objects only, for example, Account.photoUrl, Contact.photoUrl, and so on.
   *
   * If the field is a reference field type, indicates the type of external object relationship. Available on external objects only.
   *   null — lookup relationship
   *   externallookup — external lookup relationship
   *   indirectlookup — indirect lookup relationship
   */
  extraTypeInfo: string;

  /**
   * Indicates whether the field is filterable (true) or not (false). If true, then this field can be specified in the WHERE clause of a query string in a query() call.
   */
  filterable: boolean;

  /**
   * If the field is a reference field type with a lookup filter, filteredLookupInfo contains the lookup filter information for the field. If there is no lookup filter, or the filter is inactive, this field is null.
   *
   * This field is available in API version 31.0 and later.
   */
  filteredLookupInfo: FilteredLookupInfo;

  /**
   * The formula specified for this field. If no formula is specified for this field, it is not returned.
   */
  formula: string;

  /**
   * Indicates whether the field can be included in the GROUP BY clause of a SOQL query (true) or not (false). See GROUP BY in the Salesforce SOQL and SOSL Reference Guide. Available in API version 18.0 and later.
   */
  groupable: boolean;

  /**
   * Indicates whether the field stores numbers to 8 decimal places regardless of what’s specified in the field details (true) or not (false). Used to handle currencies for products that cost fractions of a cent, in large quantities. If high-scale unit pricing isn’t enabled in your organization, this field isn’t returned. Available in API version 33.0 and later.
   */
  highScaleNumber: boolean;

  /**
   * Indicates whether a field such as a hyperlink custom formula field has been formatted for HTML and should be encoded for display in HTML (true) or not (false). Also indicates whether a field is a custom formula field that has an IMAGE text function.
   */
  htmlFormatted: boolean;

  /**
   * Indicates whether the field can be used to specify a record in an upsert() call (true) or not (false).
   */
  idLookup: boolean;

  /**
   * The text that displays in the field-level help hover text for this field.
   *
   * Note
   *
   * This property is not returned unless at least one field on the object contains a value. When at least one field has field-level help, all fields on the object list the property with either the field-level help value or null for fields that have blank field-level help.
   */
  inlineHelpText: string;

  /**
   * Text label that is displayed next to the field in the Salesforce user interface. This label can be localized.
   */
  label: string;

  /**
   * Returns the maximum size of the field in Unicode characters (not bytes) or 255, whichever is less. The maximum value returned by the getLength() property is 255. Available in API version 49.0 and later.
   */
  length: number;

  /**
   * Reserved for future use.
   */
  mask: string;

  /**
   * Reserved for future use.
   */
  maskType: string;

  /**
   * Field name used in API calls, such as create(), delete(), and query().
   */
  name: string;

  /**
   * Indicates whether this field is a name field (true) or not (false). Used to identify the name field for standard objects (such as AccountName for an Account object) and custom objects. Limited to one per object, except where FirstName and LastName fields are used (such as in the Contact object).
   *
   * If a compound name is present, for example the Name field on a person account, nameField is set to true for that record. If no compound name is present, FirstName and LastName have this field set to true.
   */
  nameField: boolean;

  /**
   * Indicates whether the field's value is the Name of the parent of this object (true) or not (false). Used for objects whose parents may be more than one type of object, for example a task may have an account or a contact as a parent.
   */
  namePointing: boolean;

  /**
   * Indicates whether the field is nillable (true) or not (false). A nillable field can have empty content. A non-nillable field must have a value in order for the object to be created or saved.
   */
  nillable: boolean;

  /**
   * Indicates whether FieldPermissions can be specified for the field (true) or not (false).
   */
  permissionable: boolean;

  /**
   * Provides the list of valid values for the picklist. Specified only if restrictedPicklist is true.
   */
  picklistValues: Array<PicklistEntry>;

  /**
   * Indicates whether the foreign key includes multiple entity types (true) or not (false).
   */
  polymorphicForeignKey: boolean;

  /**
   * For fields of type double. Maximum number of digits that can be stored, including all numbers to the left and to the right of the decimal point (but excluding the decimal point character).
   */
  precision: number;

  /**
   * The name of the relationship, if this is a master-detail relationship field.
   */
  relationshipName: string;

  /**
   * The type of relationship for a master-detail relationship field. Valid values are:
   *
   *   0 if the field is the primary relationship
   *   1 if the field is the secondary relationship
   */
  relationshipOrder: number;

  /**
   * Applies only to indirect lookup relationships on external objects. Name of the custom field on the parent standard or custom object whose values are matched against the values of the child external object's indirect lookup relationship field. This matching is done to determine which records are related to each other. This field is available in API version 32.0 and later.
   */
  referenceTargetField: string;

  /**
   * For fields that refer to other objects, this array indicates the object types of the referenced objects.
   */
  referenceTo: Array<string>;

  /**
   * Indicates whether the field is a restricted picklist (true) or not (false).
   */
  restrictedPicklist: boolean;

  /**
   * For fields of type double. Number of digits to the right of the decimal point. The API silently truncates any extra digits to the right of the decimal point, but it returns a fault response if the number has too many digits to the left of the decimal point.
   */
  scale: number;

  /**
   * Indicates whether a foreign key can be included in prefiltering (true) or not (false) when used in a SOSL WHERE clause. Prefiltering means to filter by a specific field value before executing the full search query. Available in API version 40.0 and later.
   */
  searchPrefilterable: boolean;

  /**
   * See SOAPType for a list of allowable values.
   *
   */
  soapType: SOAPType;

  /**
   * Indicates whether a query can sort on this field (true) or not (false).
   */
  sortable: boolean;

  /**
   * See FieldType for a list of allowable values.
   */
  type: FieldType;

  /**
   * Indicates whether the value must be unique true) or not false).
   */
  unique: boolean;

  /**
   * Indicates one of the following:
   *   Whether the field is updateable, (true) or not (false).
   *   If true, then this field value can be set in an update() call.
   *
   *   If the field is in a master-detail relationship on a custom object, indicates whether the child records can be reparented to different parent records (true), false otherwise.
   */
  updateable: boolean;

  /**
   * This field only applies to master-detail relationships. Indicates whether a user requires read sharing access (true) or write sharing access (false) to the parent record to insert, update, and delete a child record. In both cases, a user also needs Create, Edit, and Delete object permissions for the child object.
   */
  writeRequiresMasterRead: boolean;
}
