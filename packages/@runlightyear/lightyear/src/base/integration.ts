import { pushToDeployList } from "./deploy";

/**
 * Base properties for integration definitions
 * @alpha
 */
interface BaseIntegrationProps {
  name: string;
  title: string;
  description?: string;
  actions?: Array<string>;
  webhooks?: Array<string>;
}

/**
 * Integration with a system app
 * @alpha
 */
interface IntegrationWithApp extends BaseIntegrationProps {
  app: string;
  customApp?: never;
}

/**
 * Integration with a custom app
 * @alpha
 */
interface IntegrationWithCustomApp extends BaseIntegrationProps {
  app?: never;
  customApp: string;
}

/**
 * @alpha
 */
export type DefineIntegrationProps =
  | IntegrationWithApp
  | IntegrationWithCustomApp;

/**
 * @alpha
 */
export type DeployIntegrationProps =
  | IntegrationWithApp
  | IntegrationWithCustomApp;

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
