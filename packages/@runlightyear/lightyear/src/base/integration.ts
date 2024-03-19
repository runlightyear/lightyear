import { pushToDeployList } from "./deploy";

/**
 * @alpha
 */
export interface DefineIntegrationProps {
  name: string;
  title: string;
  description?: string;
}

/**
 * @alpha
 */
export interface DeployIntegrationProps {
  name: string;
  title: string;
  description?: string;
}

/**
 * @alpha
 */
export function defineIntegration(props: DefineIntegrationProps) {
  console.debug("defineIntegration", props);

  pushToDeployList({
    type: "integration",
    integrationProps: props,
  });

  return props.name;
}
