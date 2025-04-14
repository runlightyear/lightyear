import { ExtendedJSONSchema as EJS } from "json-schema-to-ts";

export type ExtendedJSONSchema = EJS<{ references: string }>;
