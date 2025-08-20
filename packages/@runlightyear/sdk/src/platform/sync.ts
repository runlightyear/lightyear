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

/**
 * Create a new sync run on the platform and return the created sync record.
 */
export async function startSync(props: {
  collectionName: string;
  appName?: string | null;
  customAppName?: string | null;
  managedUserId?: string;
  fullSyncFrequency?: number;
  runId?: string;
}): Promise<any> {
  const envName = getEnvName();
  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();

  const url = `${baseUrl}/api/v1/envs/${envName}/syncs`;
  const body = JSON.stringify({
    collectionName: props.collectionName,
    appName: props.appName ?? null,
    customAppName: props.customAppName ?? null,
    managedUserId: props.managedUserId ?? null,
    fullSyncFrequency: props.fullSyncFrequency,
    runId: props.runId ?? null,
  });

  try {
    console.info(
      `startSync → env=${envName} collection=${props.collectionName} app=${
        props.appName ?? "none"
      } customApp=${props.customAppName ?? "none"} managedUser=${
        props.managedUserId ?? "none"
      } fullFrequency=${props.fullSyncFrequency ?? "default"}`
    );
    // Preview payload keys only; avoid logging full body
    console.debug("startSync payload keys:", {
      collectionName: props.collectionName,
      appName: props.appName ?? null,
      customAppName: props.customAppName ?? null,
      hasManagedUserId: !!props.managedUserId,
      fullSyncFrequency: props.fullSyncFrequency ?? null,
      runId: props.runId ?? null,
    });
  } catch {}

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `apiKey ${apiKey}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.status === 423) {
    console.warn("Another sync is running (423 Locked) — skipping");
    throw "SKIPPED";
  }

  if (response.status === 429) {
    const errorText = await response.text().catch(() => "");
    let reason = "Too many requests";
    try {
      const parsed = JSON.parse(errorText);
      if (parsed?.message) reason = parsed.message;
    } catch {}
    console.warn(`Rate limited (429): ${reason} — skipping`);
    throw "SKIPPED";
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const json = await response.json();
  try {
    console.info(
      `startSync ✓ created sync id=${json?.id ?? "unknown"} type=${
        json?.type ?? "unknown"
      }`
    );
  } catch {}
  return json;
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

export async function finishSync(
  syncId: string,
  options?: { error?: string; force?: boolean }
): Promise<void> {
  const envName = getEnvName();
  const baseUrl = getBaseUrl();
  const apiKey = getApiKey();

  const url = `${baseUrl}/api/v1/envs/${envName}/syncs/${syncId}/finish`;
  const bodyObj: any = {};
  if (options?.error) bodyObj.error = options.error;
  if (typeof options?.force === "boolean") bodyObj.force = options.force;

  try {
    console.info(
      `finishSync → env=${envName} sync=${syncId} error=${
        options?.error ? "yes" : "no"
      } force=${options?.force ?? false}`
    );
  } catch {}

  const hasBody = Object.keys(bodyObj).length > 0;
  const headers: Record<string, string> = {
    Authorization: `apiKey ${apiKey}`,
  };
  if (hasBody) headers["Content-Type"] = "application/json";

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: hasBody ? JSON.stringify(bodyObj) : undefined,
  });

  const text = await response.text().catch(() => "");
  if (!response.ok) {
    console.warn(
      `finishSync ✗ failed status=${response.status} ${response.statusText} body=${text}`
    );
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${text}`
    );
  }

  try {
    const json = text ? JSON.parse(text) : {};
    console.info(`finishSync ✓ response message=${json?.message ?? "(none)"}`);
  } catch {
    console.info("finishSync ✓ (no JSON body)");
  }
}

export async function upsertObjectBatch(props: {
  collectionName: string;
  syncId: string;
  modelName: string;
  app?: string | undefined;
  customApp?: string | undefined;
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
  try {
    const count = props.objects?.length ?? 0;
    const preview = (props.objects || [])
      .slice(0, Math.min(3, count))
      .map((o) => ({
        externalId: o.externalId,
        externalUpdatedAt: o.externalUpdatedAt,
        dataKeys: Object.keys(o.data || {}),
      }));
    console.info(
      `upsertObjectBatch → env=${envName} collection=${
        props.collectionName
      } model=${props.modelName} sync=${props.syncId} app=${
        props.app
      } customApp=${props.customApp} count=${count} cursor=${
        props.cursor ?? "none"
      } async=${props.async ?? false} overwrite=${props.overwrite ?? false}`
    );
    console.debug("upsertObjectBatch preview:", preview);
  } catch {}
  await makeApiRequest(
    `/api/v1/envs/${envName}/collections/${props.collectionName}/models/${props.modelName}/objects/upsert/batch`,
    {
      method: "POST",
      data: {
        syncId: props.syncId,
        appName: props.app,
        customAppName: props.customApp,
        objects: props.objects,
        overwrite: props.overwrite,
        async: props.async,
        cursor: props.cursor,
      },
    }
  );
  try {
    console.info(
      `upsertObjectBatch ✓ submitted ${props.objects.length} objects for model=${props.modelName}`
    );
  } catch {}
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
