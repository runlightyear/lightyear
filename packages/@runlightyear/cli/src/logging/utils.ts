export function isString(val: any): boolean {
  return typeof val === "string";
}

export function isObject(val: any): boolean {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

export function isArray(val: any): boolean {
  return Array.isArray(val);
}

export function argsToStr(args: Array<any>): string {
  return args
    .map((arg) => {
      if (isString(arg)) {
        return arg;
      }

      if (arg instanceof Error) {
        return String(arg);
      }

      if (isObject(arg) || isArray(arg)) {
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

export function redactSecrets(
  secrets: Array<string | null>,
  str: string
): string {
  let newStr = str;

  secrets.forEach((secret) => {
    if (secret) {
      newStr = newStr.replace(secret, `*****${secret.slice(-3)}`);
    }
  });

  return newStr;
}
