import open from "open";

export default async function openBrowser(
  authUrl: string,
  baseUrl: string,
  accountType: "new" | "existing",
  localPort: number
) {
  console.log("Opening your browser to allow you to login");

  const pagePrefix = accountType === "new" ? "/sign-up#/?redirect_url=" : "";

  await open(`${authUrl}${pagePrefix}/cli-login/port/${localPort}/`);
}
