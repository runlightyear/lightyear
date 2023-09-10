// from https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase

import { camelCase, isArray, transform, isObject } from "lodash";

/**
 * @internal
 *
 * Convert an object with snake_case keys into an object with camelCase keys.
 *
 * To support Notion, do not camelize the child keys of properties.
 *
 * @param obj
 * @param skipKeys
 */
export function camelizeNotionData(
  obj: Record<string, unknown>,
  skipKeys?: boolean
) {
  return transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target) ? key : skipKeys ? key : camelCase(key);
      result[camelKey] = isObject(value)
        ? camelizeNotionData(
            value as Record<string, unknown>,
            camelKey === "properties"
          )
        : value;
    }
  );
}
