import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { listRecords, ListRecordsProps } from "./records/listRecords";
import { whoami } from "./meta/whoami";
import { createRecords, CreateRecordsProps } from "./records/createRecords";

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
 * @example Create an issue
 * ```typescript
 * await airtable.createRecords({
 *   baseId: "<base id>",
 *   tableIdOrName: "<table id or name>",
 *   fields: {
 *     "Column 1": "value1",
 *     "Column 2": "value2",
 *     "Column 3": "value3",
 *   },
 * });
 * ```
 */
export class Airtable extends RestConnector {
  constructor(props: AirtableProps) {
    super({
      ...props,
      baseUrl: "https://api.airtable.com/v0",
      camelize: false,
    });
  }

  /**
   * Retrieve the user ID and, for OAuth access tokens, the scopes associated with the token used.
   */
  async whoami() {
    return whoami(this)();
  }

  /**
   * List records in a table. Note that table names and table ids can be used interchangeably. We recommend using table IDs so you don't need to modify your API request when your table name changes.
   *
   * The server returns one page of records at a time. Each page will contain pageSize records, which is 100 by default. If there are more records, the response will contain an offset. To fetch the next page of records, include offset in the next request's parameters. Pagination will stop when you've reached the end of your table. If the maxRecords parameter is passed, pagination will stop once you've reached this maximum.
   *
   * Returned records do not include any fields with "empty" values, e.g. "", [], or false.
   *
   * You can filter, sort, and format the results with query parameters. Note that these parameters need to be URL encoded. You can use our API URL encoder tool to help with this. If you are using a helper library like Airtable.js, these parameters will be automatically encoded.
   *
   * Note Airtable's API only accepts request with a URL shorter than 16,000 characters. Encoded formulas may cause your requests to exceed this limit. To fix this issue you can instead make a POST request to /v0/\{baseId\}/\{tableIdOrName\}/listRecords while passing the parameters within the body of the request instead of the query parameters.
   *
   * @param props
   */
  async listRecords(props: ListRecordsProps) {
    return listRecords(this)(props);
  }

  /**
   * Creates multiple records. Note that table names and table ids can be used interchangeably. We recommend using table IDs so you don't need to modify your API request when your table name changes.
   *
   * Your request body should include an array of up to 10 record objects. Each of these objects should have one key whose value is an inner object containing your record's cell values, keyed by either field name or field id.
   *
   * Returns a unique array of the newly created record ids if the call succeeds.
   *
   * You can also include a single record object at the top level.
   */
  async createRecords(props: CreateRecordsProps) {
    return createRecords(this)(props);
  }
}
