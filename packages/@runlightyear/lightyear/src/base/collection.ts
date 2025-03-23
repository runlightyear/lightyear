import { pushToDeployList } from "./deploy";
import { getEnvName } from "../util/getEnvName";
import baseRequest from "./baseRequest";
import { HttpProxyResponseError, SKIPPED } from "../index";
import { BaseRequestError } from "./BaseRequestError";
import { getContext } from "./context";

export type MatchPropertyStr = string;
export type MatchNestedProperty = Array<MatchPropertyStr>;
export type MatchObjectProperty = {
  property: MatchPropertySpec;
};
export type MatchPropertySpec = MatchNestedProperty | MatchPropertyStr;
export type MatchCompoundObject =
  | {
      OR: Array<MatchPropertySpec>;
    }
  | {
      AND: Array<MatchPropertySpec>;
    }
  | { OVERLAP: MatchPropertySpec };

export type MatchSpec = MatchPropertySpec | MatchCompoundObject;

/**
 * @alpha
 */
export interface DefineCollectionProps {
  name: string;
  title: string;
  models?: Array<{
    name: string;
    title: string;
    schema?: unknown;
    matchOn?: MatchSpec;
  }>;
  enabled?: {
    [modelName: string]: boolean;
  };
}

/**
 * @alpha
 */
export interface DeployCollectionProps {
  name: string;
  title: string;
  models?: Array<{
    name: string;
    title: string;
    schema?: unknown;
    matchOn?: MatchSpec;
  }>;
}

/**
 * @alpha
 */
export function defineCollection(props: DefineCollectionProps) {
  console.debug("defineCollection", props);

  const { enabled, ...rest } = props;

  let enabledModels = props.models;
  if (props.models) {
    if (enabled) {
      enabledModels = props.models.filter((model) => {
        return enabled[model.name] ?? false;
      });
    }
  }

  pushToDeployList({
    type: "collection",
    collectionProps: { ...rest, models: enabledModels },
  });

  return props.name;
}

export interface GetModelProps {
  collection: string;
}

export async function getModels(props: GetModelProps) {
  const { collection } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models`,
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unable to get models");
  }
}

export interface GetDeltaProps {
  collection: string;
  model: string;
  app: string | null;
  customApp: string | null;
  managedUserExternalId?: string | null;
}

export async function getDelta(props: GetDeltaProps) {
  const { collection, model, app, customApp, managedUserExternalId } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/delta`,
    params: {
      // appName: app ?? undefined,
      customAppName: customApp ?? undefined,
      managedUserId: managedUserExternalId ?? undefined,
    },
  });

  if (response.ok) {
    const json = await response.json();
    return {
      changes: json.changes,
      more: json.more,
    };
  } else {
    throw new Error("Unable to get delta");
  }
}

export interface RetrieveDeltaProps {
  collectionName: string;
  syncId: string;
  modelName?: string;
  limit?: number;
}

export async function retrieveDelta(props: RetrieveDeltaProps) {
  const MAX_RETRIES = 5;

  const { collectionName, syncId, modelName, limit } = props;

  const envName = getEnvName();

  let retryNumber = 0;

  while (retryNumber < MAX_RETRIES) {
    try {
      const response = await baseRequest({
        method: "POST",
        uri: `/api/v1/envs/${envName}/collections/${collectionName}/delta`,
        data: {
          syncId,
          modelName,
          limit,
        },
      });

      const json = await response.json();
      return {
        changes: json.changes,
      };
    } catch (error) {
      if (error instanceof BaseRequestError) {
        if (error.response.status === 423) {
          retryNumber += 1;
          console.info(
            `Delta locked while previous changes are processed, retrying (${retryNumber})`
          );

          // Add exponential backoff with jitter
          const baseWaitTime = Math.pow(2, retryNumber) * 1000; // Exponential backoff
          const jitter = Math.floor(Math.random() * 5000); // Add up to 5 seconds of jitter
          const waitTime = baseWaitTime + jitter;
          console.info(
            `Waiting ${(waitTime / 1000).toFixed(2)} seconds before retry...`
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));

          continue;
        }
      }
      throw error;
    }
  }

  throw new Error(`Delta timed out after ${MAX_RETRIES} retries`);
}

export interface StartSyncProps {
  collectionName: string;
  managedUserId: string;
  appName: string | null;
  customAppName: string | null;
  fullSyncFrequency?: number;
}

export async function startSync(props: StartSyncProps) {
  const {
    collectionName,
    appName,
    customAppName,
    managedUserId,
    fullSyncFrequency,
  } = props;

  const envName = getEnvName();

  const { runId } = getContext();

  try {
    const response = await baseRequest({
      method: "POST",
      uri: `/api/v1/envs/${envName}/syncs`,
      data: {
        collectionName,
        appName,
        customAppName,
        managedUserId,
        fullSyncFrequency,
        runId,
      },
    });

    return await response.json();
  } catch (error) {
    if (error instanceof BaseRequestError) {
      if (error.response.status === 423) {
        console.info("Another sync is running");
        throw SKIPPED;
      }
    }
  }
}

export interface GetSyncProps {
  syncId: string;
}

export async function getSync(props: GetSyncProps) {
  const { syncId } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "GET",
    uri: `/api/v1/envs/${envName}/syncs/${syncId}`,
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unable to get sync");
  }
}

export interface UpdateSyncProps {
  syncId: string;
  type?: "FULL" | "INCREMENTAL";
  status?: "PAUSED" | "SUCCEEDED" | "FAILED";
}

export async function updateSync(props: UpdateSyncProps) {
  const { syncId, type, status } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "PATCH",
    uri: `/api/v1/envs/${envName}/syncs/${syncId}`,
    data: {
      type,
      status,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Unable to update sync");
  }
}

export interface UpsertObjectProps {
  collection: string;
  syncId: string;
  model: string;
  app: string | undefined;
  customApp: string | undefined;
  managedUserId?: string | null;
  objectId?: string;
  localObjectId: string;
  localUpdatedAt: string | null;
  data: unknown;
  overwrite?: boolean;
}

export async function upsertObject(props: UpsertObjectProps) {
  const {
    collection,
    syncId,
    model,
    app,
    customApp,
    managedUserId,
    objectId,
    localObjectId,
    localUpdatedAt,
    data,
    overwrite,
  } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/upsert`,
    data: {
      syncId,
      appName: app,
      customAppName: customApp,
      managedUserId,
      objectId,
      localObjectId,
      localUpdatedAt,
      data,
      overwrite,
    },
  });

  console.info(
    "Upsert",
    collection,
    model,
    localObjectId,
    response.status,
    response.statusText
  );

  return response;
}

export interface UpsertObjectBatchProps {
  collection: string;
  syncId: string;
  model: string;
  app: string | undefined;
  customApp: string | undefined;
  managedUserId?: string | null;
  objects: Array<{
    objectId?: string;
    localObjectId: string;
    localUpdatedAt: string | null;
    data: unknown;
  }>;
  cursor?: string;
  overwrite?: boolean;
  async?: boolean;
}

export async function upsertObjectBatch(props: UpsertObjectBatchProps) {
  const {
    collection,
    syncId,
    model,
    app,
    customApp,
    managedUserId,
    objects,
    overwrite,
    async,
    cursor,
  } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/upsert/batch`,
    data: {
      syncId,
      appName: app,
      customAppName: customApp,
      managedUserId,
      objects,
      overwrite,
      async,
      cursor,
    },
  });

  console.info(
    "Upsert",
    collection,
    model,
    objects.length,
    response.status,
    response.statusText
  );

  return response;
}

export interface ConfirmChangeProps {
  collectionName: string;
  modelName: string;
  syncId: string;
  changeId: string;
  localObjectId: string;
  localUpdatedAt: string | null;
}

export async function confirmObject(props: ConfirmChangeProps) {
  const {
    collectionName,
    modelName,
    syncId,
    changeId,
    localObjectId,
    localUpdatedAt,
  } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collectionName}/models/${modelName}/objects/confirm`,
    data: {
      syncId,
      changeId,
      localObjectId,
      localUpdatedAt,
    },
  });

  console.info(
    "Confirm",
    collectionName,
    modelName,
    syncId,
    changeId,
    localObjectId,
    localUpdatedAt,
    response.status,
    response.statusText
  );

  return response;
}

export interface ConfirmChangeBatchProps {
  collection: string;
  syncId: string;
  model: string;
  app: string | undefined;
  customApp: string | undefined;
  managedUserId?: string | null;
  objects: Array<{
    objectId?: string;
    localObjectId: string;
    localUpdatedAt: string | null;
    data: unknown;
  }>;
  overwrite?: boolean;
  async?: boolean;
}

export async function confirmObjectBatch(props: ConfirmChangeBatchProps) {
  const {
    collection,
    syncId,
    model,
    app,
    customApp,
    managedUserId,
    objects,
    overwrite,
    async,
  } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/confirm/batch`,
    data: {
      syncId,
      appName: app,
      customAppName: customApp,
      managedUserId,
      objects,
      overwrite,
      async,
    },
  });

  console.info(
    "Confirm",
    collection,
    model,
    objects.length,
    response.status,
    response.statusText
  );

  return response;
}

export interface DeleteObjectProps {
  collection: string;
  model: string;
  customApp: string;
  managedUserExternalId?: string;
  externalId: string;
}

export async function deleteObject(props: DeleteObjectProps) {
  const { collection, model, customApp, managedUserExternalId, externalId } =
    props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/delete`,
    data: {
      customAppName: customApp,
      managedUserExternalId,
      externalId,
    },
  });

  console.info(
    "Delete object",
    collection,
    model,
    externalId,
    response.status,
    response.statusText
  );

  return response;
}

export interface GetLastUpdatedObjectProps {
  collection: string;
  model: string;
  app: string | null;
  customApp: string | null;
  managedUserExternalId: string | null;
}

export async function getLastUpdatedObject(props: GetLastUpdatedObjectProps) {
  const { collection, model, app, customApp, managedUserExternalId } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/last-updated`,
    data: {
      appName: app,
      customAppName: customApp,
      managedUserExternalId,
    },
  });

  return await response.json();
}

export interface DetectHardDeletesProps {
  collection: string;
  model: string;
  customApp: string;
  managedUserExternalId: string;
  remainingIds: Array<string>;
}

export async function detectHardDeletes(props: DetectHardDeletesProps) {
  const envName = getEnvName();
  const { collection, model, customApp, managedUserExternalId, remainingIds } =
    props;

  return baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/detect-hard-deletes`,
    data: {
      remainingIds,
    },
  });
}

export async function pauseSync(syncId: string) {
  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/syncs/${syncId}/pause`,
  });

  if (response.ok) {
    console.info("Sync paused");
  } else {
    throw new Error("Unable to pause sync");
  }

  return response;
}

export async function finishSync(syncId: string) {
  const envName = getEnvName();

  return baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/syncs/${syncId}/finish`,
  });
}
