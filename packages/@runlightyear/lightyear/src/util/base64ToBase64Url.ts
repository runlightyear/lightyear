/**
 * @internal
 *
 * Convert a base64-encoded string to a base64-URL-encoded string
 *
 * @param base64EndcodedString
 */
export function base64ToBase64Url(base64EndcodedString: string) {
  return base64EndcodedString
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
