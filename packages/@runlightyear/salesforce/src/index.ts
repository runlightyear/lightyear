/**
 * Salesforce Connectors for Lightyear
 *
 * @alpha
 *
 * @packageDocumentation
 */

export { Salesforce } from "./Salesforce";
export type { SalesforceProps } from "./Salesforce";

export { SalesforceOAuth } from "./SalesforceOAuth";
export type { SalesforceOAuthProps } from "./SalesforceOAuth";

export { createSalesforceOAuthConnector } from "./connectors/oauth";
export { createSalesforceRestConnector } from "./connectors/rest";
export { defineSalesforceCustomApp } from "./connectors/app";
export { createSalesforceSyncConnector } from "./connectors/sync";

/* Describe */
export type {
  DescribeObjectProps,
  DescribeObjectResponse,
} from "./describe/describeObject";

/* Query */
export type {
  QueryProps,
  QueryResponse,
  QueryResponseData,
} from "./query/query";

/* Records */
export type {
  CreateRecordProps,
  CreateRecordResponse,
  CreateRecordResponseData,
} from "./records/createRecord";
export type {
  DeleteRecordProps,
  DeleteRecordResponse,
} from "./records/deleteRecord";
export type { GetRecordProps, GetRecordResponse } from "./records/getRecord";
export type {
  UpdateRecordProps,
  UpdateRecordResponse,
} from "./records/updateRecord";

/* Types */
export type { ActionOverride } from "./types/ActionOverride";
export type { Attributes } from "./types/Attributes";
export type { ChildRelationship } from "./types/ChildRelationship";
export type { DescribeSObjectResult } from "./types/DescribeSObjectResult";
export type { Field } from "./types/Field";
export type { FieldType } from "./types/FieldType";
export type { FieldValues } from "./types/FieldValues";
export type { FilteredLookupInfo } from "./types/FilteredLookupInfo";
export type { NamedLayoutInfo } from "./types/NamedLayoutInfo";
export type { ObjectType } from "./types/ObjectType";
export type { PicklistEntry } from "./types/PicklistEntry";
export type { RecordTypeInfo } from "./types/RecordTypeInfo";
export type { ScopeInfo } from "./types/ScopeInfo";
export type { SOAPType } from "./types/SOAPType";
export type { SRecord } from "./types/SRecord";
