export interface ChildRelationship {
  /**
   * Indicates whether the child object is deleted when the parent object is deleted (true) or not (false).
   */
  cascadeDelete: boolean;

  /**
   * The name of the object on which there is a foreign key back to the parent sObject.
   */
  childSObject: string;

  /**
   * Reserved for future use.
   */
  deprecatedAndHidden: boolean;

  /**
   * The name of the field that has a foreign key back to the parent sObject.
   */
  field: string;

  /**
   * The names of the lists of junction IDs associated with an object. Each ID represents an object that has a relationship with the associated object.
   *
   * For more information on JunctionIdList fields, see Field Types.
   */
  junctionIdListNames: Array<string>;

  /**
   * A collection of object names that the polymorphic keys in the junctionIdListNames property can reference.
   *
   * You can query these object names.
   */
  junctionReferenceTo: Array<string>;

  /**
   * The name of the relationship, usually the plural of the value in childSObject.
   */
  relationshipName: string;

  /**
   * Indicates whether the parent object can’t be deleted because it is referenced by a child object (true) or not (false).
   */
  restrictedDelete: boolean;
}
