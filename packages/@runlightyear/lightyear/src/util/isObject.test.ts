import isObject from "./isObject";
import { describe, expect, test } from "vitest";

describe("isObject", () => {
  test("detects object", () => {
    expect(isObject({ a: 1 })).toBe(true);
  });

  test("rejects string", () => {
    expect(isObject("abc")).toBe(false);
  });

  test("rejects array", () => {
    expect(isObject([1, 2, 3])).toBe(false);
  });
});
