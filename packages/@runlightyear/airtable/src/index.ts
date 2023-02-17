/* Airtable */
import { Airtable } from "./Airtable";
import type { AirtableProps } from "./Airtable";

/* Airtable Oauth */
import { AirtableOauth } from "./AirtableOauth";
import type { AirtableOauthProps } from "./AirtableOauth";

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

export { Airtable, AirtableOauth };
export type {
  AirtableProps,
  AirtableOauthProps,
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
