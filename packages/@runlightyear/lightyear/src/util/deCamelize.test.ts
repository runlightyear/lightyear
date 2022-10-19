import deCamelize from "./deCamelize";

describe("deCamelize", () => {
  test("simple obj", () => {
    expect(deCamelize({ testThis: "hi there" })).toEqual({
      test_this: "hi there",
    });
  });

  test("multiple levels", () => {
    expect(
      deCamelize({ thisIs: { hiThere: { workingWell: "is it" } } })
    ).toEqual({ this_is: { hi_there: { working_well: "is it" } } });
  });

  test("array at top level", () => {
    expect(
      deCamelize([{ thisIs: { hiThere: { workingWell: "is it" } } }])
    ).toEqual([{ this_is: { hi_there: { working_well: "is it" } } }]);
  });

  // test("multiple caps", () => {
  //   expect(deCamelize({ secure_SSL: "test" })).toEqual({ secureSsl: "test" });
  // });
  //
  test("no change to camel case", () => {
    expect(deCamelize({ already_snake: "test" })).toEqual({
      already_snake: "test",
    });
  });
});
