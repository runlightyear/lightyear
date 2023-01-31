import baseRequest from "./baseRequest";
import { getEnvName } from "../util/getEnvName";

export interface SaveCacheOptions {
  key: string;
  value: string;
}

export async function saveCache(options: SaveCacheOptions) {
  const envName = getEnvName();
  const { key, value } = options;

  await baseRequest({
    method: "PATCH",
    uri: `/api/v1/envs/${envName}/caches/${key}`,
    data: {
      value,
    },
  });
}

export interface GetCacheOptions {
  key: string;
  deployId?: string;
  actionId?: string;
  runId?: string;
}

export type CacheData = {
  value: string;
};

export async function getCache(options: GetCacheOptions): Promise<string> {
  const envName = getEnvName();
  const { key } = options;

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/caches/${key}`,
  });

  if (!response.ok) {
    throw new Error("Problem getting cache");
  }

  const data = <CacheData>await response.json();

  return data?.value;
}
