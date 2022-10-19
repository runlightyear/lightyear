import { logs } from "./index";

describe("getLogger", () => {
  test("info log", () => {
    console.info("hello world");
    expect(logs[logs.length - 1]).toEqual("[INFO]: hello" + " world");
  });

  test("warn log", () => {
    console.warn("hello world");
    expect(logs[logs.length - 1]).toEqual("[WARN]: hello world");
  });

  test("error log", () => {
    console.error("hello world");
    expect(logs[logs.length - 1]).toEqual("[ERROR]: hello world");
  });

  test("debug log", () => {
    console.debug("hello world");
    expect(logs[logs.length - 1]).toEqual("[DEBUG]: hello world");
  });
});
