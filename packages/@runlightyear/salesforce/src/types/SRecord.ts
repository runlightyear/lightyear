import { Attributes } from "./Attributes";

/**
 * @example Get a lead
 * ```typescript
 * const response = await salesforce.getRecord({
 *   objectType: "Lead",
 *   objectId: "00QDo000005arNKMAY",
 *   fields: ["name", "company"],
 * });
 *
 * const lead = response.data;
 *
 * console.log(`Got lead: ${lead.name} at ${lead.company}`);
 * ```
 *
 * @example Get a list of accounts
 * ```typescript
 * const response = await salesforce.query({
 *   q: `SELECT name FROM Account`,
 * });
 *
 * const accounts = response.data.records;
 *
 * console.log(accounts.map(account => account.name));
 * ```
 */
export type SRecord = {
  id: string;
  attributes: Attributes;
  [fieldName: string]: any;
};
