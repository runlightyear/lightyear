import argsToStr from "./argsToStr";

describe("argsToStr", () => {
  test("a simple string", () => {
    expect(argsToStr("hello")).toEqual("hello");
  });

  test("an object", () => {
    expect(argsToStr({ a: 1 })).toEqual(`{
  "a": 1
}`);
  });

  test("an object with a circular reference", () => {
    const a: { b?: any } = {};
    a["b"] = a;

    expect(argsToStr(a)).toEqual("[object Object]");
  });

  test("two strings", () => {
    expect(argsToStr("hello", "there")).toEqual("hello there");
  });

  test("a string and an object", () => {
    expect(argsToStr("hello", { a: 1 })).toEqual(`hello {
  "a": 1
}`);
  });

  test("an error", () => {
    expect(argsToStr(new Error("this is an error"))).toEqual(
      "Error: this is an error"
    );
  });
});
