import baseRequest from "./baseRequest";

export interface SaveCacheOptions {
  key: string;
  value: string;
}

export async function saveCache(options: SaveCacheOptions) {
  const envName = process.env.ENV_NAME;
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
  taskId?: string;
  runId?: string;
}

export type CacheData = {
  value: string;
};

export async function getCache(options: GetCacheOptions): Promise<string> {
  const envName = process.env.ENV_NAME;
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
