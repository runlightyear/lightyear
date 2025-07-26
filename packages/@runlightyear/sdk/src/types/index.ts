import type { JSONSchema7 } from "json-schema";

/**
 * Core types for collections and models
 */

// Match pattern types
export type SimpleMatchPattern = string;
export type JsonPathMatchPattern = `$${string}`;

export interface OrMatchPattern {
  or: MatchPattern[];
}

export interface AndMatchPattern {
  and: MatchPattern[];
}

export type MatchPattern =
  | SimpleMatchPattern
  | JsonPathMatchPattern
  | OrMatchPattern
  | AndMatchPattern;

// Model definition
export interface Model {
  name: string;
  title?: string;
  schema?: JSONSchema7;
  matchPattern?: MatchPattern;
}

// Collection definition
export interface Collection {
  name: string;
  title?: string;
  models: Model[];
}

// App authentication types
export type AppAuthType = "OAUTH2" | "APIKEY" | "BASIC";

// Variable definition for apps
export interface AppVariable {
  name: string;
  title?: string;
  description?: string;
  defaultValue?: string;
  required?: boolean;
}

// Secret definition for apps
export interface AppSecret {
  name: string;
  title?: string;
  description?: string;
  required?: boolean;
}

// Custom app definition
export interface CustomApp {
  name: string;
  type: AppAuthType;
  title?: string;
  variables?: AppVariable[];
  secrets?: AppSecret[];
}
