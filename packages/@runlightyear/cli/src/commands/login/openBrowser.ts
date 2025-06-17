import open from "open";

export default async function openBrowser(
  authUrl: string,
  baseUrl: string,
  accountType: "new" | "existing",
  localPort: number
) {
  if (accountType === "new") {
    console.log("Opening your browser to allow you to sign up");
  } else {
    console.log("Opening your browser to allow you to sign in");
  }

  const pagePrefix = accountType === "new" ? "/sign-up#/?redirect_url=" : "";

  await open(`${authUrl}${pagePrefix}/cli-login/port/${localPort}`);
}
