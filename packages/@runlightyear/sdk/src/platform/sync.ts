import {
  makeApiRequest,
  getApiKey,
  getBaseUrl,
  getEnvName,
} from "../utils/api";

export interface GetModelsResponseItem {
  name: string;
  title?: string;
}

export async function getModels(props: {
  collectionName: string;
}): Promise<Array<GetModelsResponseItem>> {
  const { collectionName } = props;
  const envName = process.env.ENV_NAME || "dev";
  const response = await makeApiRequest(
    `/api/v1/envs/${envName}/collections/${collectionName}/models`
  );
  return (await response.json()) as Array<GetModelsResponseItem>;
}

export async function getSync(props: { syncId: string }): Promise<any> {
  const envName = process.env.ENV_NAME || "dev";
  const response = await makeApiRequest(
    `/api/v1/envs/${envName}/syncs/${props.syncId}`
  );
  return await response.json();
}

export async function updateSync(props: {
  syncId: string;
  type?: "FULL" | "INCREMENTAL";
  status?: "PAUSED" | "SUCCEEDED" | "FAILED";
  currentModelName?: string;
  currentDirection?: "PUSH" | "PULL" | null;
}): Promise<any> {
  const envName = process.env.ENV_NAME || "dev";
  const response = await makeApiRequest(
    `/api/v1/envs/${envName}/syncs/${props.syncId}`,
    {
      method: "PATCH",
      data: {
        type: props.type,
        status: props.status,
        currentModelName: props.currentModelName,
        currentDirection: props.currentDirection,
      },
    }
  );
  return await response.json();
}

export async function pauseSync(syncId: string): Promise<void> {
  const envName = process.env.ENV_NAME || "dev";
  await makeApiRequest(`/api/v1/envs/${envName}/syncs/${syncId}/pause`, {
    method: "POST",
  });
}

export async function finishSync(syncId: string): Promise<void> {
  const envName = process.env.ENV_NAME || "dev";
  await makeApiRequest(`/api/v1/envs/${envName}/syncs/${syncId}/finish`, {
    method: "POST",
  });
}

export async function upsertObjectBatch(props: {
  collectionName: string;
  syncId: string;
  modelName: string;
  app?: string | undefined;
  customApp?: string | undefined;
  managedUserId?: string | null;
  objects: Array<{
    objectId?: string;
    externalId: string;
    externalUpdatedAt: string | null;
    data: Record<string, unknown>;
  }>;
  cursor?: string;
  overwrite?: boolean;
  async?: boolean;
}): Promise<void> {
  const envName = process.env.ENV_NAME || "dev";
  await makeApiRequest(
    `/api/v1/envs/${envName}/collections/${props.collectionName}/models/${props.modelName}/objects/upsert/batch`,
    {
      method: "POST",
      data: {
        syncId: props.syncId,
        appName: props.app,
        customAppName: props.customApp,
        managedUserId: props.managedUserId,
        objects: props.objects,
        overwrite: props.overwrite,
        async: props.async,
        cursor: props.cursor,
      },
    }
  );
}

export async function retrieveDelta<T = any>(props: {
  collectionName: string;
  syncId: string;
  modelName: string;
  limit?: number;
}): Promise<
  | {
      operation: "CREATE";
      changes: Array<{ changeId: string; data: T }>;
    }
  | {
      operation: "UPDATE";
      changes: Array<{ changeId: string; externalId: string; data: T }>;
    }
  | {
      operation: "DELETE";
      changes: Array<{ changeId: string; externalId: string }>;
    }
> {
  const MAX_RETRIES = 5;
  const envName = getEnvName();
  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error(
      "Missing API key. Set LIGHTYEAR_API_KEY or API_KEY environment variable."
    );
  }

  const url = `${baseUrl}/api/v1/envs/${envName}/collections/${props.collectionName}/delta`;

  let retryNumber = 0;
  while (retryNumber < MAX_RETRIES) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        syncId: props.syncId,
        modelName: props.modelName,
        limit: props.limit,
      }),
    });

    if (response.status === 423) {
      retryNumber += 1;
      const waitTime = Math.pow(2, retryNumber) * 1000;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      continue;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return (await response.json()) as any;
  }

  throw new Error(`Delta timed out after ${MAX_RETRIES} retries`);
}

export async function confirmChangeBatch(props: {
  syncId: string;
  changes: Array<{
    changeId: string;
    externalId: string;
    externalUpdatedAt: string | null;
  }>;
  async?: boolean;
}): Promise<void> {
  const envName = process.env.ENV_NAME || "dev";
  await makeApiRequest(
    `/api/v1/envs/${envName}/syncs/${props.syncId}/changes/batch/confirm`,
    {
      method: "POST",
      data: {
        changes: props.changes,
        async: props.async,
      },
    }
  );
}
