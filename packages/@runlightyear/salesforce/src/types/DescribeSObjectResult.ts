import { ChildRelationship } from "./ChildRelationship";
import { Field } from "./Field";
import { ActionOverride } from "./ActionOverride";
import { NamedLayoutInfo } from "./NamedLayoutInfo";
import { ScopeInfo } from "./ScopeInfo";
import { RecordTypeInfo } from "./RecordTypeInfo";

export interface DescribeSObjectResult {
  /**
   * An array of action overrides. Action overrides replace the URLs specified in the urlDetail, urlEdit and urlNew fields. This field is available in API version 32.0 and later.
   */
  actionOverrides: Array<ActionOverride>;

  /**
   * Reserved for future use.
   */
  activateable: boolean;

  /**
   * If the object is associated with a parent object, the type of association it has to its parent, such as History. Otherwise, its value is null. Available in API version 50.0 and later.
   */
  associateEntityType: string;

  /**
   * If the object is associated with a parent object, the parent object it’s associated with. Otherwise, its value is null. Available in API version 50.0 and later.
   */
  associateParentEntity: string;

  /**
   * An array of child relationships, which is the name of the sObject that has a foreign key to the sObject being described.
   */
  childRelationships: Array<ChildRelationship>;

  /**
   * Indicates that the object can be used in describeCompactLayouts().
   */
  compactLayoutable: boolean;

  /**
   * Indicates whether the object can be created via the create() call (true) or not (false).
   */
  createable: boolean;

  /**
   * Indicates whether the object is a custom object (true) or not (false).
   */
  custom: boolean;

  /**
   * Indicates whether the object is a custom setting object (true) or not (false).
   */
  customSetting: boolean;

  /**
   * Indicates whether data translation is enabled for the object (true) or not (false). Available in API version 49.0 and later.
   */
  dataTranslationEnabled: boolean;

  /**
   * Reserved for future use.
   */
  deepCloneable: boolean;

  /**
   * Reserved for future use.
   */
  defaultImplementation: string;

  /**
   * Indicates whether the object can be deleted via the delete() call (true) or not (false).
   */
  deletable: boolean;

  /**
   * Reserved for future use.
   */
  deprecatedAndHidden: boolean;

  /**
   * Reserved for future use.
   */
  extendedBy: string;

  /**
   * Reserved for future use.
   */
  extendsInterfaces: string;

  /**
   * Indicates whether Chatter feeds are enabled for the object (true) or not (false). This property is available in API version 19.0 and later.
   */
  feedEnabled: boolean;

  /**
   * Array of fields associated with the object. The mechanism for retrieving information from this list varies among development tools.
   */
  fields: Array<Field>;

  /**
   * Reserved for future use.
   */
  implementedBy: string;

  /**
   * Reserved for future use.
   */
  implementsInterfaces: string;

  /**
   * Reserved for future use.
   */
  isInterface: boolean;

  /**
   * Three-character prefix code in the object ID. Object IDs are prefixed with three-character codes that specify the type of the object. For example, Account objects have a prefix of 001 and Opportunity objects have a prefix of 006. Note that a key prefix can sometimes be shared by multiple objects so it does not always uniquely identify an object.
   *
   * Use the value of this field to determine the object type of a parent in those cases where the child may have more than one object type as parent (polymorphic). For example, you may need to obtain the keyPrefix value for the parent of a Task or Event.
   */
  keyPrefix: string;

  /**
   * Label text for a tab or field renamed in the user interface, if applicable, or the object name, if not. For example, an organization representing a medical vertical might rename Account to Patient. Tabs and fields can be renamed in the Salesforce user interface. See the Salesforce online help for more information.
   */
  label: string;

  /**
   * Label text for an object that represents the plural version of an object name, for example, “Accounts.”
   */
  labelPlural: string;

  /**
   * Indicates whether the object supports the describeLayout() call (true) or not (false).
   */
  layoutable: boolean;

  /**
   * Indicates whether the object can be merged with other objects of its type (true) or not (false). true for leads, contacts, and accounts.
   */
  mergeable: boolean;

  /**
   * Indicates whether Most Recently Used (MRU) list functionality is enabled for the object (true) or not (false).
   */
  mruEnabled: boolean;

  /**
   * Name of the object. This is the same string that was passed in as the sObjectType parameter.
   */
  name: string;

  /**
   * The specific named layouts that are available for the objects other than the default layout.
   */
  namedLayoutInfos: Array<NamedLayoutInfo>;

  /**
   * The API name of the networkScopeField that scopes the entity to an Experience Cloud site. For most entities, the value of this property is null.
   */
  networkScopeFieldName: string;

  /**
   * Indicates whether the object can be queried via the query() call (true) or not (false).
   */
  queryable: boolean;

  /**
   * An array of the record types supported by this object. The user need not have access to all the returned record types to see them here.
   */
  recordTypeInfos: Array<RecordTypeInfo>;

  /**
   * Indicates whether the object can be replicated via the getUpdated() and getDeleted() calls (true) or not (false).
   */
  replicateable: boolean;

  /**
   * Indicates whether the object can be retrieved via the retrieve() call (true) or not (false).
   */
  retrieveable: boolean;

  /**
   * Indicates whether the object can be searched via the search() call (true) or not (false).
   */
  searchable: boolean;

  /**
   * Indicates whether search layout information can be retrieved via the describeSearchLayouts() call (true) or not (false).
   */
  searchLayoutable: boolean;

  /**
   * The list of supported scopes for the object. For example, Account might have supported scopes of “All Accounts”, “My Accounts”, and “My Team’s Accounts”.
   */
  supportedScopes: ScopeInfo;

  /**
   * Indicates whether the object supports Apex triggers.
   */
  triggerable: boolean;

  /**
   * Indicates whether an object can be undeleted using the undelete() call (true) or not (false).
   */
  undeletable: boolean;

  /**
   * Indicates whether the object can be updated via the update() call (true) or not (false).
   */
  updateable: boolean;

  /**
   * URL to the read-only detail page for this object. Compare with urlEdit, which is read-write. Client applications can use this URL to redirect to, or access, the Salesforce user interface for standard and custom objects. To provide flexibility and allow for future enhancements, returned urlDetail values are dynamic. To ensure that client applications are forward compatible, it is recommended that they use this capability where possible. Note that, for objects for which a stable URL is not available, this field is returned empty.
   */
  urlDetail: string;

  /**
   * URL to the edit page for this object. For example, the urlEdit field for the Account object returns https://yourInstance.salesforce.com/{ID}/e. Substituting the {ID} field for the current object ID will return the edit page for that specific account in the Salesforce user interface. Compare with urlDetail, which is read-only. Client applications can use this URL to redirect to, or access, the Salesforce user interface for standard and custom objects. To provide flexibility and allow for future enhancements, returned urlDetail values are dynamic. To ensure that client applications are forward compatible, it is recommended that they use this capability where possible. Note that, for objects for which a stable URL is not available, this field is returned empty.
   */
  urlEdit: string;

  /**
   * URL to the new/create page for this object. Client applications can use this URL to redirect to, or access, the Salesforce user interface for standard and custom objects. To provide flexibility and allow for future enhancements, returned urlNew values are dynamic. To ensure that client applications are forward compatible, it is recommended that they use this capability where possible. Note that, for objects for which a stable URL is not available, this field is returned empty.
   */
  urlNew: string;
}
