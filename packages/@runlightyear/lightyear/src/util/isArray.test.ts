import { describe, expect, test } from "vitest";
import isArray from "./isArray";

describe("isObject", () => {
  test("detects array", () => {
    expect(isArray([1, 2, 3])).toBe(true);
  });

  test("rejects string", () => {
    expect(isArray("abc")).toBe(false);
  });

  test("rejects object", () => {
    expect(isArray({ a: 1 })).toBe(false);
  });
});
