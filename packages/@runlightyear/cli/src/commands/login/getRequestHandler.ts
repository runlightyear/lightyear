import { RequestListener } from "http";
import fetchApiKey from "./fetchApiKey";
import writeEnvFile from "./writeEnvFile";
import parseCode from "./parseCode";
import { program } from "commander";

export default function getRequestHandler(baseUrl: string) {
  const callback: RequestListener = async (req, res) => {
    console.log("Received request", req.url);

    res.statusCode = 302;

    const code = parseCode(req.url);
    if (!code) {
      res.setHeader("location", `${baseUrl}/prototype/cli-login/failure`);
      res.end();
      program.error("Failed to find code in url");
    }

    const { ENV_NAME, BASE_URL, API_KEY } = await fetchApiKey(
      baseUrl,
      code,
      res
    );
    await writeEnvFile({ ENV_NAME, BASE_URL, API_KEY }, res);

    process.exit(0);
  };

  return callback;
}
