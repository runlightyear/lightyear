import invariant from "tiny-invariant";
import { BaseRequestError } from "./BaseRequestError";
import { getBaseUrl } from "../util/getBaseUrl";
import { getApiKey } from "../util/getApiKey";

/**
 * @internal
 */
export interface BaseRequestProps {
  uri: string;
  method?: string;
  params?: any;
  data?: {
    [key: string]: any;
  };
  suppressLogs?: boolean;
  maxRetries?: number;
}

/**
 * @internal
 *
 * @param method
 * @param uri
 * @param params
 * @param data
 * @param suppressLogs
 * @param maxRetries
 */
export default async function baseRequest({
  method = "POST",
  uri,
  params,
  data,
  suppressLogs = false,
  maxRetries = 3,
}: BaseRequestProps): Promise<Response> {
  if (!suppressLogs) console.debug("in baseRequest");

  const baseUrl = getBaseUrl();
  invariant(baseUrl, "Missing BASE_URL");

  const apiKey = getApiKey();
  invariant(apiKey, "Missing API_KEY");

  let queryString = "";
  if (params) {
    queryString = "?" + new URLSearchParams(params).toString();
  }

  const url = `${baseUrl}${uri}${queryString}`;
  const props = {
    method,
    headers: {
      Authorization: `apiKey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: data && JSON.stringify(data),
  };

  if (!suppressLogs) console.debug(`baseRequest url: ${url}`);
  if (!suppressLogs) console.debug("baseRequest props", props);

  let attempt = 0;
  let response: Response | undefined;

  while (attempt < maxRetries) {
    response = await fetch(url, props);

    console.debug(`requestId: ${response.headers.get("x-request-id")}`);

    if (!response.ok) {
      if (response.status >= 500) {
        attempt += 1;

        if (!suppressLogs)
          console.debug(`Retrying after server error (${attempt})`);

        continue;
      }

      throw new BaseRequestError(response);
    }

    if (!suppressLogs) console.debug("about to return from baseRequest");

    return response;
  }

  invariant(response, "Missing response");

  throw new BaseRequestError(response);
}
