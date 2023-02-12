export function base64ToBase64Url(base64EndcodedString: string) {
  return base64EndcodedString
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
