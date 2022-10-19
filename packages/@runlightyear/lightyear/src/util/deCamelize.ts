// from https://stackoverflow.com/questions/59769649/recursively-convert-an-object-fields-from-snake-case-to-camelcase

import { snakeCase, isArray, transform, isObject } from "lodash";

const deCamelize = (obj: Record<string, unknown> | Record<string, unknown>[]) =>
  transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const newKey = isArray(target) ? key : snakeCase(key);
      result[newKey] = isObject(value)
        ? deCamelize(value as Record<string, unknown>)
        : value;
    }
  );

export default deCamelize;
