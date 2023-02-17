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
}: BaseRequestProps): Promise<Response> {
  console.debug("in baseRequest");
  const baseUrl = getBaseUrl();
  invariant(baseUrl, "Missing BASE_URL");

  const apiKey = getApiKey();
  invariant(apiKey, "Missing API_KEY");

  let queryString = "";
  if (params) {
    queryString = "?" + new URLSearchParams(params).toString();
  }

  const url = `${baseUrl}${uri}${queryString}`;
  const options = {
    method,
    headers: {
      Authorization: `apiKey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: data && JSON.stringify(data),
  };

  console.debug(`baseRequest url: ${url}`);
  console.debug("baseRequest options", options);

  const response = await fetch(url, options);

  if (!response.ok) {
    console.error(
      `Base request error: ${response.status} ${response.statusText}`
    );
    console.error(JSON.stringify(await response.json(), null, 2));
    throw new BaseRequestError(response);
  }

  console.debug("about to return from baseRequest");

  return response;
}
