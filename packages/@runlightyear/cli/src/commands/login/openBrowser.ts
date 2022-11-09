import open from "open";

export default async function openBrowser(
  authUrl: string,
  baseUrl: string,
  accountType: "new" | "existing",
  localPort: number
) {
  console.log("Opening your browser to allow you to login");

  const page = accountType === "new" ? "sign-up" : "sign-in";

  await open(
    `${authUrl}/${page}?redirect_url=${baseUrl}/cli-login/port/${localPort}/`
  );
}
