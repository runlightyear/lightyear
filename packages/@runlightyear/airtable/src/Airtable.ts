import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { listRecords, ListRecordsProps } from "./records/listRecords";
import { whoami } from "./meta/whoami";
import { createRecords, CreateRecordsProps } from "./records/createRecords";
import { getRecord, GetRecordProps } from "./records/getRecord";
import { updateRecord, UpdateRecordProps } from "./records/updateRecord";
import { deleteRecord, DeleteRecordProps } from "./records/deleteRecord";

/**
 * @beta
 */
export interface AirtableProps extends AuthConnectorProps {}

/**
 * @beta
 *
 * Connector to the Airtable API
 *
 * @example Import
 * ```typescript
 * import { Airtable } from "@runlightyear/airtable"
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "airtableExample",
 *   title: "Airtable Example"
 *   apps: ["airtable"],
 *   run: async ({ auths }) => {
 *     const airtable = new Airtable({ auth: auths.airtable });
 *   }
 * }
 * ```
 *
 * @example Create a single record
 * ```typescript
 * const result = await airtable.createRecords({
 *   baseId: "baseId",
 *   tableIdOrName: "tableIdOrName",
 *   fields: {
 *     Name: "North Beach",
 *   },
 * });
 *
 * if ("id" in result.data) {
 *   console.log("Created record", result.data.id);
 * }
 * ```
 *
 * @example Create multiple records
 * ```typescript
 * const result = await airtable.createRecords({
 *   baseId: "baseId",
 *   tableIdOrName: "tableIdOrName",
 *   records: [
 *     {
 *       fields: {
 *         Name: "Union Square",
 *       },
 *     },
 *     {
 *       fields: {
 *         Name: "Ferry Building",
 *       },
 *     },
 *   ],
 * });
 *
 * if ("records" in result.data) {
 *   console.log(
 *     "Created records",
 *     result.data.records.map((record) => record.id)
 *   );
 * }
 * ```
 *
 * @example Get a record
 * ```typescript
 * const result = await airtable.getRecord({
 *   baseId: "baseId",
 *   tableIdOrName: "tableIdOrName",
 *   recordId: "recordId",
 * });
 * console.log("Record: ", result.data);
 * ```
 *
 * @example Update a record
 * ```typescript
 * const result = await airtable.updateRecord({
 *   baseId: "baseId",
 *   tableIdOrName: "tableIdOrName",
 *   recordId: "recordId",
 *   fields: {
 *     Name: "Russian Hill",
 *   },
 * });
 * console.log("New record: ", result.data);
 * ```
 *
 * @example Delete a record
 * ```typescript
 * const result = await airtable.deleteRecord({
 *   baseId: "baseId",
 *   tableIdOrName: "tableIdOrName",
 *   recordId: "recordId",
 * });
 * if (result.data.deleted) {
 *   console.log("Deleted record", result.data.id);
 * }
 * ```
 *
 * @example List records
 * ```typescript
 * const result = await airtable.listRecords({
 *   baseId: "baseId",
 *   tableIdOrName: "tableIdOrName",
 * });
 * const records = result.data.records;
 * console.log(
 *   "Names: ",
 *   records.map((record) => record.fields["Name"])
 * );
 * ```
 */
export class Airtable extends RestConnector {
  /**
   * @example Use in an action
   * ```typescript
   * defineAction({
   *   name: "airtableExample",
   *   title: "Airtable Example"
   *   apps: ["airtable"],
   *   run: async ({ auths }) => {
   *     const airtable = new Airtable({ auth: auths.airtable });
   *   }
   * }
   * ```
   *
   * @param props
   */
  constructor(props: AirtableProps) {
    super({
      ...props,
      baseUrl: "https://api.airtable.com/v0",
      camelize: false,
    });
  }

  /**
   * Retrieve the user ID and, for OAuth access tokens, the scopes associated with the token used.
   *
   * @group Meta
   *
   * @example Who am I?
   * ```typescript
   * const result = await airtable.whoami();
   * console.log("User: ", result.data);
   * ```
   *
   */
  async whoami() {
    return whoami(this)();
  }

  /**
   * List records in a table.
   *
   * @group Records
   *
   * Note that table names and table ids can be used interchangeably. We recommend using table IDs so you don't need to modify your API request when your table name changes.
   *
   * The server returns one page of records at a time. Each page will contain pageSize records, which is 100 by default. If there are more records, the response will contain an offset. To fetch the next page of records, include offset in the next request's parameters. Pagination will stop when you've reached the end of your table. If the maxRecords parameter is passed, pagination will stop once you've reached this maximum.
   *
   * Returned records do not include any fields with "empty" values, e.g. "", [], or false.
   *
   * You can filter, sort, and format the results with query parameters. Note that these parameters need to be URL encoded. You can use our API URL encoder tool to help with this. If you are using a helper library like Airtable.js, these parameters will be automatically encoded.
   *
   * Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/\{baseId\}/\{tableIdOrName\}/listRecords while passing the parameters within the body of the request instead of the query parameters.
   *
   * @example List records
   * ```typescript
   * const result = await airtable.listRecords({
   *   baseId: "baseId",
   *   tableIdOrName: "tableIdOrName",
   * });
   * const records = result.data.records;
   * console.log(
   *   "Names: ",
   *   records.map((record) => record.fields["Name"])
   * );
   * ```
   *
   * @param props
   */
  async listRecords(props: ListRecordsProps) {
    return listRecords(this)(props);
  }

  /**
   * Creates multiple records.
   *
   * @group Records
   *
   * Note that table names and table ids can be used interchangeably. We recommend using table IDs so you don't need to modify your API request when your table name changes.
   *
   * Your request body should include an array of up to 10 record objects. Each of these objects should have one key whose value is an inner object containing your record's cell values, keyed by either field name or field id.
   *
   * Returns a unique array of the newly created record ids if the call succeeds.
   *
   * You can also include a single record object at the top level.
   *
   * @example Create a single record
   * ```typescript
   * const result = await airtable.createRecords({
   *   baseId: "baseId",
   *   tableIdOrName: "tableIdOrName",
   *   fields: {
   *     Name: "North Beach",
   *   },
   * });
   *
   * if ("id" in result.data) {
   *   console.log("Created record", result.data.id);
   * }
   * ```
   *
   * @example Create multiple records
   * ```typescript
   * const result = await airtable.createRecords({
   *   baseId: "baseId",
   *   tableIdOrName: "tableIdOrName",
   *   records: [
   *     {
   *       fields: {
   *         Name: "Union Square",
   *       },
   *     },
   *     {
   *       fields: {
   *         Name: "Ferry Building",
   *       },
   *     },
   *   ],
   * });
   *
   * if ("records" in result.data) {
   *   console.log(
   *     "Created records",
   *     result.data.records.map((record) => record.id)
   *   );
   * }
   * ```
   */
  async createRecords(props: CreateRecordsProps) {
    return createRecords(this)(props);
  }

  /**
   * Get record
   *
   * @group Records
   *
   * Retrieve a single record. Any "empty" fields (e.g. "", [], or false) in the record will not be returned.
   *
   * @example Get a record
   * ```typescript
   * const result = await airtable.getRecord({
   *   baseId: "baseId",
   *   tableIdOrName: "tableIdOrName",
   *   recordId: "recordId",
   * });
   * console.log("Record: ", result.data);
   * ```
   */
  async getRecord(props: GetRecordProps) {
    return getRecord(this)(props);
  }

  /**
   * Update record
   *
   * @group Records
   *
   * Updates a single record. Table names and table ids can be used interchangeably. We recommend using table IDs so you don't need to modify your API request when your table name changes. A PATCH request will only update the fields you specify, leaving the rest as they were. A PUT request will perform a destructive update and clear all unspecified cell values.
   *
   * Your request body should include an array of up to 10 record objects. Each of these objects should have an id property representing the record ID and a fields property which contains all of your record's cell values by field name or field id for all of your record's cell values by field name.
   *
   * Automatic data conversion for update actions can be enabled via typecast parameter. The Airtable API will perform best-effort automatic data conversion from string values if the typecast parameter is passed in. Automatic conversion is disabled by default to ensure data integrity, but it may be helpful for integrating with 3rd party data sources.
   *
   * @example Update a record
   * ```typescript
   * const result = await airtable.updateRecord({
   *   baseId: "baseId",
   *   tableIdOrName: "tableIdOrName",
   *   recordId: "recordId",
   *   fields: {
   *     Name: "Russian Hill",
   *   },
   * });
   * console.log("New record: ", result.data);
   * ```
   */
  async updateRecord(props: UpdateRecordProps) {
    return updateRecord(this)(props);
  }

  /**
   * Delete record
   *
   * @group Records
   *
   * Deletes a single record
   *
   * @example Delete a record
   * ```typescript
   * const result = await airtable.deleteRecord({
   *   baseId: "baseId",
   *   tableIdOrName: "tableIdOrName",
   *   recordId: "recordId",
   * });
   * if (result.data.deleted) {
   *   console.log("Deleted record", result.data.id);
   * }
   * ```
   */
  async deleteRecord(props: DeleteRecordProps) {
    return deleteRecord(this)(props);
  }
}
