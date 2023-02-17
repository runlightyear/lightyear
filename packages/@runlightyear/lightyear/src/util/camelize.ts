// from https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase

import { camelCase, isArray, transform, isObject } from "lodash";

/**
 * @internal
 *
 * Convert an object with snake_case keys into an object with camelCase keys
 *
 * @param obj
 */
function camelize(obj: Record<string, unknown>) {
  return transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target) ? key : camelCase(key);
      result[camelKey] = isObject(value)
        ? camelize(value as Record<string, unknown>)
        : value;
    }
  );
}

export default camelize;
