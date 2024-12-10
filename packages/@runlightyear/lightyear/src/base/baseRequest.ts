import invariant from "tiny-invariant";
import fetch, { Response } from "node-fetch";
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
}

/**
 * @internal
 *
 * @param method
 * @param uri
 * @param params
 * @param data
 */
export default async function baseRequest({
  method = "POST",
  uri,
  params,
  data,
  suppressLogs = false,
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

  const response = await fetch(url, props);

  if (!response.ok) {
    throw new BaseRequestError(response);
  }

  if (!suppressLogs) console.debug("about to return from baseRequest");

  return response;
}
