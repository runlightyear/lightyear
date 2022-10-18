import isFunction from "./isFunction";

describe("isFunction", () => {
  test("detects function", () => {
    expect(isFunction(() => null)).toBe(true);
  });

  test("rejects obj", () => {
    expect(isFunction({ a: 1 })).toBe(false);
  });

  test("rejects string", () => {
    expect(isFunction("abc")).toBe(false);
  });

  test("rejects array", () => {
    expect(isFunction([1, 2, 3])).toBe(false);
  });
});
