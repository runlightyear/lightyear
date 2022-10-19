export default function commaSeparated(arr?: string[]): string | undefined {
  if (arr) {
    return arr.join(",");
  }

  return undefined;
}
