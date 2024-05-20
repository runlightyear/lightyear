import { pushToDeployList } from "./deploy";
import { getEnvName } from "../util/getEnvName";
import baseRequest from "./baseRequest";

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
    };

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

  pushToDeployList({
    type: "collection",
    collectionProps: props,
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
  customApp: string | null;
  managedUserExternalId?: string | null;
}

export async function getDelta(props: GetDeltaProps) {
  const { collection, model, customApp, managedUserExternalId } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/delta`,
    data: {
      customAppName: customApp,
      managedUserExternalId: managedUserExternalId ?? null,
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

export interface UpsertObjectProps {
  collection: string;
  model: string;
  app: string | undefined;
  customApp: string | undefined;
  managedUserExternalId?: string | null;
  externalId: string;
  externalUpdatedAt: string;
  data: unknown;
  overwrite?: boolean;
}

export async function upsertObject(props: UpsertObjectProps) {
  const {
    collection,
    model,
    app,
    customApp,
    managedUserExternalId,
    externalId,
    externalUpdatedAt,
    data,
    overwrite,
  } = props;

  const envName = getEnvName();

  const response = await baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects/upsert`,
    data: {
      appName: app,
      customAppName: customApp,
      managedUserExternalId,
      externalId,
      externalUpdatedAt,
      data,
      overwrite,
    },
  });

  console.info(
    "Upsert",
    collection,
    model,
    externalId,
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
