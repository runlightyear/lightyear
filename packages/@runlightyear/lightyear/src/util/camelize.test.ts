import camelize from "./camelize";

describe("camelize", () => {
  test("simple obj", () => {
    expect(camelize({ test_this: "hi there" })).toEqual({
      testThis: "hi there",
    });
  });

  test("multiple levels", () => {
    expect(
      camelize({ this_is: { hi_there: { working_well: "is it" } } })
    ).toEqual({ thisIs: { hiThere: { workingWell: "is it" } } });
  });

  test("multiple caps", () => {
    expect(camelize({ secure_SSL: "test" })).toEqual({ secureSsl: "test" });
  });

  test("no change to camel case", () => {
    expect(camelize({ alreadyCamel: "test" })).toEqual({
      alreadyCamel: "test",
    });
  });
});
