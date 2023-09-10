import {
  PageProperty,
  PagePropertyInput,
} from "../objects/pages/properties/PageProperty";
import {
  DatabaseProperty,
  DatabasePropertyInput,
} from "../objects/databases/properties/DatabaseProperty";
import { deCamelize } from "@runlightyear/lightyear";

export interface NotionProperties {
  [key: string]:
    | PagePropertyInput
    | DatabasePropertyInput
    | PageProperty
    | DatabaseProperty;
}

export function deCamelizeNotionProperties(properties: NotionProperties) {
  const deCamelizedProperties: NotionProperties = {};

  for (const [key, value] of Object.entries(properties)) {
    // @ts-ignore
    deCamelizedProperties[key] = deCamelize(value);
  }

  return deCamelizedProperties;
}
