export default function redactSecrets(
  secrets: Array<string | null>,
  str: string
) {
  let newStr = str;

  secrets.forEach((secret) => {
    if (secret) {
      newStr = newStr.replace(secret, `*****${secret.slice(-3)}`);
    }
  });

  return newStr;
}
