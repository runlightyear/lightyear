import {
  AuthType,
  RestConnector,
  RestConnectorProps,
} from "@runlightyear/lightyear";
import { listRecords, ListRecordsProps } from "./records/listRecords";
import { whoami } from "./meta/whoami";
import { createRecords, CreateRecordsProps } from "./records/createRecords";
import { getRecord, GetRecordProps } from "./records/getRecord";
import { updateRecord, UpdateRecordProps } from "./records/updateRecord";
import { deleteRecord, DeleteRecordProps } from "./records/deleteRecord";
import { createWebhook, CreateWebhookProps } from "./webhooks/createWebhook";
import { deleteWebhook, DeleteWebhookProps } from "./webhooks/deleteWebhook";
import {
  defineAirtableWebhook,
  DefineAirtableWebhookProps,
} from "./webhooks/defineAirtableWebhook";
import { listWebhooks, ListWebhooksProps } from "./webhooks/listWebhooks";
import { listBases, ListBasesProps } from "./bases/listBases";
import { getBaseSchema, GetBaseSchemaProps } from "./bases/getBaseSchema";
import {
  listWebhookPayloads,
  ListWebhookPayloadsProps,
} from "./webhooks/listWebhookPayloads";
import { onChange, OnChangeProps } from "./listeners/onChange";
import { onNewRecords, OnNewRecordsProps } from "./listeners/onNewRecords";
import {
  onNewOrUpdatedRecords,
  OnNewOrUpdatedRecordsProps,
} from "./listeners/onNewOrUpdatedRecords";
import { refreshWebhook, RefreshWebhookProps } from "./webhooks/refreshWebhook";
import { AirtableOAuth } from "./AirtableOAuth";

export interface AirtableProps extends RestConnectorProps {}

/**
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
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Airtable } from "@runlightyear/airtable";
 *
 * defineAction({
 *   name: "createSingleRecord",
 *   title: "Create Single Record",
 *   apps: ["airtable"],
 *   variables: ["baseId", "tableIdOrName", "name"],
 *   run: async ({ auths, variables }) => {
 *     const airtable = new Airtable({
 *       auth: auths.airtable,
 *     });
 *     const response = await airtable.createRecords({
 *       baseId: variables.baseId!,
 *       tableIdOrName: variables.tableIdOrName!,
 *       fields: {
 *         Name: variables.name!,
 *       },
 *     });
 *
 *     console.log("Record: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Create multiple records
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Airtable } from "@runlightyear/airtable";
 *
 * defineAction({
 *   name: "createMultipleRecords",
 *   title: "Create Multiple Records",
 *   apps: ["airtable"],
 *   variables: ["baseId", "tableIdOrName"],
 *   run: async ({ auths, variables }) => {
 *     const airtable = new Airtable({
 *       auth: auths.airtable,
 *     });
 *
 *     const response = await airtable.createRecords({
 *       baseId: variables.baseId!,
 *       tableIdOrName: variables.tableIdOrName!,
 *       records: [
 *         {
 *           fields: {
 *             Name: "Union Square",
 *           },
 *         },
 *         {
 *           fields: {
 *             Name: "Ferry Building",
 *           },
 *         },
 *       ],
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Get a record
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Airtable } from "@runlightyear/airtable";
 *
 * defineAction({
 *   name: "getRecord",
 *   title: "Get Record",
 *   apps: ["airtable"],
 *   variables: ["baseId", "tableIdOrName", "recordId"],
 *   run: async ({ auths, variables }) => {
 *     const airtable = new Airtable({
 *       auth: auths.airtable,
 *     });
 *
 *     const response = await airtable.getRecord({
 *       baseId: variables.baseId!,
 *       tableIdOrName: variables.tableIdOrName!,
 *       recordId: variables.recordId!,
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Update a record
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Airtable } from "@runlightyear/airtable";
 *
 * defineAction({
 *   name: "updateRecord",
 *   title: "Update Record",
 *   apps: ["airtable"],
 *   variables: ["baseId", "tableIdOrName", "recordId", "name"],
 *   run: async ({ auths, variables }) => {
 *     const airtable = new Airtable({
 *       auth: auths.airtable,
 *     });
 *
 *     const response = await airtable.updateRecord({
 *       baseId: variables.baseId!,
 *       tableIdOrName: variables.tableIdOrName!,
 *       recordId: variables.recordId!,
 *       fields: {
 *         Name: variables.name!,
 *       },
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Delete a record
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Airtable } from "@runlightyear/airtable";
 *
 * defineAction({
 *   name: "deleteRecord",
 *   title: "Delete Record",
 *   apps: ["airtable"],
 *   variables: ["baseId", "tableIdOrName", "recordId"],
 *   run: async ({ auths, variables }) => {
 *     const airtable = new Airtable({
 *       auth: auths.airtable,
 *     });
 *
 *     const response = await airtable.deleteRecord({
 *       baseId: variables.baseId!,
 *       tableIdOrName: variables.tableIdOrName!,
 *       recordId: variables.recordId!,
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 *
 * @example List records
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Airtable } from "@runlightyear/airtable";
 *
 * defineAction({
 *   name: "listRecords",
 *   title: "List Records",
 *   apps: ["airtable"],
 *   variables: ["baseId", "tableIdOrName"],
 *   run: async ({ auths, variables }) => {
 *     const airtable = new Airtable({
 *       auth: auths.airtable,
 *     });
 *
 *     const response = await airtable.listRecords({
 *       baseId: variables.baseId!,
 *       tableIdOrName: variables.tableIdOrName!,
 *       recordMetadata: ["commentCount"],
 *     });
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 *
 * @example Who am I?
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Airtable } from "@runlightyear/airtable";
 *
 * defineAction({
 *   name: "whoami",
 *   title: "Who Am I?",
 *   apps: ["airtable"],
 *   run: async ({ auths, variables }) => {
 *     const airtable = new Airtable({ auth: auths.airtable });
 *
 *     const response = await airtable.whoami();
 *
 *     console.log("Response: ", response.data);
 *   },
 * });
 * ```
 */
export class Airtable extends RestConnector {
  static authType: AuthType = "OAUTH2";
  static OAuth = AirtableOAuth;

  constructor(props: AirtableProps) {
    super({
      ...props,
      camelize: false,
    });
  }

  getBaseUrl() {
    return "https://api.airtable.com/v0";
  }

  /**
   * Retrieve the user ID and, for OAuth access tokens, the scopes associated with the token used.
   *
   * @group Meta
   *
   * @example Who am I?
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Airtable } from "@runlightyear/airtable";
   *
   * defineAction({
   *   name: "whoami",
   *   title: "Who Am I?",
   *   apps: ["airtable"],
   *   run: async ({ auths, variables }) => {
   *     const airtable = new Airtable({ auth: auths.airtable });
   *
   *     const response = await airtable.whoami();
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   *
   */
  async whoami() {
    return whoami(this)();
  }

  /**
   * List bases
   *
   * @group Base
   */
  async listBases(props?: ListBasesProps) {
    return listBases(this)(props);
  }

  /**
   * Get base schema
   *
   * @group Base
   */
  async getBaseSchema(props: GetBaseSchemaProps) {
    return getBaseSchema(this)(props);
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
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Airtable } from "@runlightyear/airtable";
   *
   * defineAction({
   *   name: "listRecords",
   *   title: "List Records",
   *   apps: ["airtable"],
   *   variables: ["baseId", "tableIdOrName"],
   *   run: async ({ auths, variables }) => {
   *     const airtable = new Airtable({
   *       auth: auths.airtable,
   *     });
   *
   *     const response = await airtable.listRecords({
   *       baseId: variables.baseId!,
   *       tableIdOrName: variables.tableIdOrName!,
   *       recordMetadata: ["commentCount"],
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
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
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Airtable } from "@runlightyear/airtable";
   *
   * defineAction({
   *   name: "createSingleRecord",
   *   title: "Create Single Record",
   *   apps: ["airtable"],
   *   variables: ["baseId", "tableIdOrName", "name"],
   *   run: async ({ auths, variables }) => {
   *     const airtable = new Airtable({
   *       auth: auths.airtable,
   *     });
   *
   *     const response = await airtable.createRecords({
   *       baseId: variables.baseId!,
   *       tableIdOrName: variables.tableIdOrName!,
   *       fields: {
   *         Name: variables.name!,
   *       },
   *     });
   *
   *     console.log("Record: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Create multiple records
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Airtable } from "@runlightyear/airtable";
   *
   * defineAction({
   *   name: "createMultipleRecords",
   *   title: "Create Multiple Records",
   *   apps: ["airtable"],
   *   variables: ["baseId", "tableIdOrName"],
   *   run: async ({ auths, variables }) => {
   *     const airtable = new Airtable({
   *       auth: auths.airtable,
   *     });
   *
   *     const response = await airtable.createRecords({
   *       baseId: variables.baseId!,
   *       tableIdOrName: variables.tableIdOrName!,
   *       records: [
   *         {
   *           fields: {
   *             Name: "Union Square",
   *           },
   *         },
   *         {
   *           fields: {
   *             Name: "Ferry Building",
   *           },
   *         },
   *       ],
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
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
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Airtable } from "@runlightyear/airtable";
   *
   * defineAction({
   *   name: "getRecord",
   *   title: "Get Record",
   *   apps: ["airtable"],
   *   variables: ["baseId", "tableIdOrName", "recordId"],
   *   run: async ({ auths, variables }) => {
   *     const airtable = new Airtable({
   *       auth: auths.airtable,
   *     });
   *
   *     const response = await airtable.getRecord({
   *       baseId: variables.baseId!,
   *       tableIdOrName: variables.tableIdOrName!,
   *       recordId: variables.recordId!,
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
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
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Airtable } from "@runlightyear/airtable";
   *
   * defineAction({
   *   name: "updateRecord",
   *   title: "Update Record",
   *   apps: ["airtable"],
   *   variables: ["baseId", "tableIdOrName", "recordId", "name"],
   *   run: async ({ auths, variables }) => {
   *     const airtable = new Airtable({
   *       auth: auths.airtable,
   *     });
   *
   *     const response = await airtable.updateRecord({
   *       baseId: variables.baseId!,
   *       tableIdOrName: variables.tableIdOrName!,
   *       recordId: variables.recordId!,
   *       fields: {
   *         Name: variables.name!,
   *       },
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
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
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Airtable } from "@runlightyear/airtable";
   *
   * defineAction({
   *   name: "deleteRecord",
   *   title: "Delete Record",
   *   apps: ["airtable"],
   *   variables: ["baseId", "tableIdOrName", "recordId"],
   *   run: async ({ auths, variables }) => {
   *     const airtable = new Airtable({
   *       auth: auths.airtable,
   *     });
   *
   *     const response = await airtable.deleteRecord({
   *       baseId: variables.baseId!,
   *       tableIdOrName: variables.tableIdOrName!,
   *       recordId: variables.recordId!,
   *     });
   *
   *     console.log("Response: ", response.data);
   *   },
   * });
   * ```
   */
  async deleteRecord(props: DeleteRecordProps) {
    return deleteRecord(this)(props);
  }

  /**
   * Create a webhook
   *
   * @alpha
   */
  async createWebhook(props: CreateWebhookProps) {
    return createWebhook(this)(props);
  }

  /**
   * List webhooks
   *
   * @alpha
   */
  async listWebhooks(props: ListWebhooksProps) {
    return listWebhooks(this)(props);
  }

  /**
   * List webhook payloads
   *
   * @alpha
   */
  async listWebhookPayloads(props: ListWebhookPayloadsProps) {
    return listWebhookPayloads(this)(props);
  }

  /**
   * Refresh a webhook
   *
   * @alpha
   */
  async refreshWebhook(props: RefreshWebhookProps) {
    return refreshWebhook(this)(props);
  }

  /**
   * Delete a webhook
   *
   * @alpha
   */
  async deleteWebhook(props: DeleteWebhookProps) {
    return deleteWebhook(this)(props);
  }

  /**
   * Define an Airtable webhook
   *
   * @alpha
   */
  static defineWebhook(props: DefineAirtableWebhookProps) {
    return defineAirtableWebhook(props);
  }

  /**
   * On change
   *
   * @alpha
   */
  static onChange(props: OnChangeProps) {
    return onChange(props);
  }

  /**
   * On new records
   *
   * @alpha
   */
  static onNewRecords(props: OnNewRecordsProps) {
    return onNewRecords(props);
  }

  /**
   * On new or updated records
   *
   * @alpha
   */
  static onNewOrUpdatedRecords(props: OnNewOrUpdatedRecordsProps) {
    return onNewOrUpdatedRecords(props);
  }
}
