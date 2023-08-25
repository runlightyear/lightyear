export const validNameRegex = /^[A-Za-z0-9-_]+$/;

export function isValidName(name: string) {
  return validNameRegex.test(name);
}
