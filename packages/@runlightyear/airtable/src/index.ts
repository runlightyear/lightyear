/* Airtable */
import { Airtable } from "./Airtable";
import type { AirtableProps } from "./Airtable";

/* Airtable OAuth */
import { AirtableOAuth } from "./AirtableOAuth";
import type { AirtableOAuthProps } from "./AirtableOAuth";

/* Types */
import type { AirtableScope } from "./types/AirtableScope";
import type { Timezone } from "./types/Timezone";

/* Who am i */
import type { WhoamiResponse } from "./meta/whoami";

/* List Records */
import type {
  ListRecordsProps,
  ListRecordsResponse,
} from "./records/listRecords";

/* Create Records */
import type {
  CreateRecordsProps,
  SingleRecordResponseData,
  MultipleRecordsResponseData,
  CreateRecordsResponse,
} from "./records/createRecords";

export { Airtable, AirtableOAuth };
export type {
  AirtableProps,
  AirtableOAuthProps,
  AirtableScope,
  Timezone,
  WhoamiResponse,
  ListRecordsProps,
  ListRecordsResponse,
  CreateRecordsProps,
  SingleRecordResponseData,
  MultipleRecordsResponseData,
  CreateRecordsResponse,
};
