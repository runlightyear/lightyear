import { pushToDeployList } from "./deploy";

/**
 * @alpha
 */
export interface DefineCollectionProps {
  name: string;
  title: string;
  models?: Array<{
    name: string;
    title: string;
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
