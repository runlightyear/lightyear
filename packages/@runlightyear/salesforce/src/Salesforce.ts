import {
  AuthType,
  RestConnector,
  RestConnectorProps,
} from "@runlightyear/lightyear";
import { createRecord, CreateRecordProps } from "./records/createRecord";
import { updateRecord, UpdateRecordProps } from "./records/updateRecord";
import { deleteRecord, DeleteRecordProps } from "./records/deleteRecord";
import { getRecord, GetRecordProps } from "./records/getRecord";
import { query, QueryProps } from "./query/query";
import { describeObject, DescribeObjectProps } from "./describe/describeObject";
import { SalesforceOAuth } from "./SalesforceOAuth";
import { queryAll, QueryAllProps } from "./query/queryAll";

/**
 * @alpha
 */
export interface SalesforceProps extends RestConnectorProps {
  domain?: string;
}

/**
 * Salesforce connector
 *
 * @alpha
 *
 * @example Install
 * ```
 * npm install @runlightyear/salesforce
 * ```
 *
 * @example Import
 * ```typescript
 * import { Salesforce } from "@runlightyear/salesforce";
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "salesforce-example",
 *   title: "Salesforce Example",
 *   apps: ["salesforce"],
 *   run: async ({ auths }) => {
 *     const salesforce = new Salesforce({
 *       auth: auths.salesforce,
 *       domain: "https://lightyear2-dev-ed.develop.my.salesforce.com",
 *     });
 * });
 * ```
 *
 * @example Get a list of accounts
 * ```typescript
 * const response = await salesforce.query({
 *   q: `SELECT Name FROM Account`,
 * });
 *
 * const accounts = response.data.records;
 * ```
 *
 * @example Page through a long list of accounts
 * ```typescript
 * let response = await salesforce.query({ q: `SELECT Name from Account` });
 *
 * console.log("First batch of accounts", response.data.records);
 *
 * while (!response.data.done) {
 *   response = await salesforce.query({
 *     nextRecordsUrl: response.data.nextRecordsUrl,
 *   });
 *
 *   console.log("Next batch of accounts", response.data.records);
 * }
 * ```
 *
 * @example Create an account
 * ```typescript
 * const response = await salesforce.createRecord({
 *   objectType: "Account",
 *   fieldValues: { Name: "A New Account" },
 * });
 *
 * console.log("Created new account", response.data.id);
 * ```
 *
 * @example Get the list of field names on Contacts
 * ```typescript
 * const response = await salesforce.describeObject({ objectType: "Contact" });
 *
 * console.log(
 *   "fields:",
 *   response.data.fields.map((field) => field.name)
 * );
 * ```
 *
 * @example Full example: Poll for new leads once a minute
 * ```typescript
 * import { defineAction, setVariable } from "@runlightyear/lightyear";
 * import { Salesforce } from "@runlightyear/salesforce";
 *
 * defineAction({
 *   name: "get-new-leads",
 *   title: "Get New Leads",
 *   apps: ["salesforce"],
 *   variables: ["lastCreatedDate"],
 *   trigger: {
 *     pollingFrequency: 1,
 *   },
 *   run: async ({ auths, variables }) => {
 *     const salesforce = new Salesforce({
 *       auth: auths.salesforce,
 *       domain: "<your salesforce domain name>",
 *     });
 *
 *     const response = await salesforce.query({
 *       q: `SELECT Name, CreatedDate from Lead WHERE CreatedDate > ${
 *         variables.lastCreatedDate || "YESTERDAY"
 *       } ORDER BY CreatedDate`,
 *     });
 *
 *     const newLeads = response.data.records;
 *
 *     if (newLeads.length > 0) {
 *       console.log(
 *         "New leads",
 *         newLeads.map((lead) => lead.name)
 *       );
 *
 *       await setVariable(
 *         "lastCreatedDate",
 *         String(newLeads[newLeads.length - 1].createdDate)
 *       );
 *     }
 *   },
 * });
 * ```
 */
export class Salesforce extends RestConnector {
  static authType: AuthType = "OAUTH2";
  static OAuth = SalesforceOAuth;

  domain: string;

  constructor(props: SalesforceProps) {
    const { domain, camelize, ...rest } = props;

    super({ ...rest, camelize: false });

    const extraData = this.getAuthData().extraData;

    if (domain) {
      this.domain = domain;
    } else if (extraData && ("instanceUrl" as string) in extraData) {
      this.domain = extraData["instanceUrl"];
    } else {
      throw new Error("Missing instanceUrl in auth data");
    }
  }

  getBaseUrl(): string {
    return `${this.domain}/services/data/v57.0`;
  }

  /**
   * Create a Record
   *
   * @group Record
   *
   * @example Create an account
   * ```typescript
   * const response = await salesforce.createRecord({
   *   objectType: "Account",
   *   fieldValues: { Name: "A New Account" },
   * });
   *
   * console.log("Created new account", response.data.id);
   * ```
   */
  async createRecord(props: CreateRecordProps) {
    return createRecord(this)(props);
  }

  /**
   * Get a Record
   *
   * @group Record
   *
   * @example Get a lead
   * ```typescript
   * const response = await salesforce.getRecord({
   *   objectType: "Lead",
   *   objectId: "00QDo000005arNKMAY",
   *   fields: ["name", "company"],
   * });
   *
   * console.log(`Got lead: ${response.data.name} at ${response.data.company}`);
   * ```
   */
  async getRecord(props: GetRecordProps) {
    return getRecord(this)(props);
  }

  /**
   * Update a Record
   *
   * @group Record
   *
   * @example Update a lead
   * ```typescript
   * await salesforce.updateRecord({
   *   objectType: "Lead",
   *   objectId: "00QDo000005arNKMAY",
   *   fieldValues: {
   *     status: "Working - Contacted",
   *   },
   * });
   * ```
   */
  async updateRecord(props: UpdateRecordProps) {
    return updateRecord(this)(props);
  }

  /**
   * Delete a Record
   *
   * @group Record
   *
   * @example Delete a lead
   * ```typescript
   * await salesforce.deleteRecord({
   *   objectType: "Lead",
   *   objectId: "00QDo000005arNKMAY",
   * });
   * ```
   *
   * @param props
   */
  async deleteRecord(props: DeleteRecordProps) {
    return deleteRecord(this)(props);
  }

  /**
   * Run a SOQL Query
   *
   * @group Query
   *
   * @example Get a list of accounts
   * ```typescript
   * const response = await salesforce.query({
   *   q: `SELECT name FROM Account`,
   * });
   *
   * const accounts = response.data.records;
   * ```
   *
   * @example Page through a long list of accounts
   * ```typescript
   * let response = await salesforce.query({ q: `SELECT Name from Account` });
   *
   * console.log("First batch of accounts", response.data.records);
   *
   * while (!response.data.done) {
   *   response = await salesforce.query({
   *     nextRecordsUrl: response.data.nextRecordsUrl,
   *   });
   *
   *   console.log("Next batch of accounts", response.data.records);
   * }
   * ```
   */
  async query(props: QueryProps) {
    return query(this)(props);
  }

  async queryAll(props: QueryAllProps) {
    return queryAll(this)(props);
  }

  /**
   * Describe an Object
   *
   * @group Describe
   *
   * @example Get the list of field names on Contacts
   * ```typescript
   * const response = await salesforce.describeObject({ objectType: "Contact" });
   *
   * console.log(
   *   "fields:",
   *   response.data.fields.map((field) => field.name)
   * );
   * ```
   */
  async describeObject(props: DescribeObjectProps) {
    return describeObject(this)(props);
  }
}
