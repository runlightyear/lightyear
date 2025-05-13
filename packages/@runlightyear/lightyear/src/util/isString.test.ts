import { describe, expect, test } from "vitest";
import isString from "./isString";

describe("isString", () => {
  test("detects string", () => {
    expect(isString("abc")).toBe(true);
  });

  test("rejects obj", () => {
    expect(isString({ a: 1 })).toBe(false);
  });

  test("rejects array", () => {
    expect(isString([1, 2, 3])).toBe(false);
  });
});
