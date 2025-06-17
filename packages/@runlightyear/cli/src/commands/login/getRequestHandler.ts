import { RequestListener } from "http";
import fetchApiKey from "./fetchApiKey";
import writeEnvFile from "./writeEnvFile";
import parseCode from "./parseCode";
import { program } from "commander";

export default function getRequestHandler(
  baseUrl: string,
  onComplete: () => void
) {
  const callback: RequestListener = async (req, res) => {
    console.log("Received response from browser");

    res.statusCode = 302;

    const code = parseCode(req.url);
    if (!code) {
      res.setHeader("location", `${baseUrl}/cli-login/failed`);
      res.end();
      program.error("Failed to find code in url");
    }

    const { LIGHTYEAR_API_KEY } = await fetchApiKey(baseUrl, code, res);
    await writeEnvFile({ LIGHTYEAR_API_KEY, baseUrl }, res);

    // Signal completion to the calling code
    onComplete();
  };

  return callback;
}
