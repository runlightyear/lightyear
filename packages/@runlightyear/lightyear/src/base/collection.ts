import { pushToDeployList } from "./deploy";
import { getEnvName } from "../util/getEnvName";
import baseRequest from "./baseRequest";

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

export interface UpsertObjectProps {
  collection: string;
  model: string;
  customApp: string;
  managedUserExternalId: string;
  externalId: string;
  data: unknown;
  overwrite?: boolean;
}

export async function upsertObject(props: UpsertObjectProps) {
  const {
    collection,
    model,
    customApp,
    managedUserExternalId,
    externalId,
    data,
    overwrite,
  } = props;

  const envName = getEnvName();

  return baseRequest({
    method: "POST",
    uri: `/api/v1/envs/${envName}/collections/${collection}/models/${model}/objects`,
    data: {
      customAppName: customApp,
      managedUserExternalId,
      externalId,
      data,
      overwrite,
    },
  });
}
