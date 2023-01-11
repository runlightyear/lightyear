import isString from "../util/isString";
import isObject from "../util/isObject";

export default function argsToStr(args: Array<any>) {
  return args
    .map((arg) => {
      if (isString(arg)) {
        return arg;
      }

      if (arg instanceof Error) {
        return String(arg);
      }

      if (isObject(arg)) {
        let result: string;

        try {
          result = JSON.stringify(arg, null, 2);
        } catch (error) {
          // just use best effort if there is recursion
          result = String(arg);
        }
        return result;
      }

      return String(arg);
    })
    .join(" ");
}
