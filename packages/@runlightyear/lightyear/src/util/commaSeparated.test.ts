import { describe, expect, test } from "vitest";
import commaSeparated from "./commaSeparated";

describe("commaSeparated", () => {
  test("works with a string array", () => {
    expect(commaSeparated(["hi", "there"])).toEqual("hi,there");
  });

  test("handles an undefined arg", () => {
    expect(commaSeparated(undefined)).toEqual(undefined);
  });
});
