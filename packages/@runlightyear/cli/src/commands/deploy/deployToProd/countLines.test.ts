import countLines from "./countLines";

describe("countLines", () => {
  test("three lines", () => {
    expect(countLines("one\ntwo\nthree")).toEqual(3);
  });

  test("one line", () => {
    expect(countLines("one")).toEqual(1);
  });

  test("blank", () => {
    expect(countLines("")).toEqual(1);
  });
});
