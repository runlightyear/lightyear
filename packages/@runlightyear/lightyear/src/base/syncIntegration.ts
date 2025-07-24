import { AppName } from "./action";
import { AuthData } from "./auth";
import { SyncConnector } from "../connectors/SyncConnector";
import { defineIntegration } from "./integration";
import {
  defineSyncAction,
  SyncActionWithApp,
  SyncActionWithCustomApp,
} from "./syncAction";

export interface ConnectorProps {
  auth: AuthData;
}

export interface SynchronizerProps {
  connector: SyncConnector;
}

export interface FrequencyProps {
  incremental?: number;
  full?: number;
  hardDelete?: number;
}

/**
 * Base properties for sync integration definitions
 */
interface BaseSyncIntegrationProps {
  name: string;
  title: string;
  description?: string;
  connector: typeof SyncConnector | ((props: ConnectorProps) => SyncConnector);
  collection: string;
  frequency?: FrequencyProps;
  direction?: "pull" | "push" | "bidirectional";
}

/**
 * Sync integration with a system app
 */
interface SyncIntegrationWithApp extends BaseSyncIntegrationProps {
  app: AppName;
  customApp?: never;
}

/**
 * Sync integration with a custom app
 */
interface SyncIntegrationWithCustomApp extends BaseSyncIntegrationProps {
  app?: never;
  customApp: string;
}

/**
 * Type for defining sync integrations - must specify exactly one of app or customApp
 */
export type DefineSyncIntegrationProps =
  | SyncIntegrationWithApp
  | SyncIntegrationWithCustomApp;

function isConnectorClass(
  x: typeof SyncConnector | ((props: ConnectorProps) => SyncConnector)
): x is typeof SyncConnector {
  return typeof x === typeof SyncConnector;
}

function isConnectorFunction(
  x: typeof SyncConnector | ((props: ConnectorProps) => SyncConnector)
): x is (props: ConnectorProps) => SyncConnector {
  return x instanceof Function;
}

export function defineSyncIntegration(props: DefineSyncIntegrationProps) {
  // Create the appropriate integration props based on whether app or customApp is provided
  const integrationProps =
    "app" in props && props.app
      ? {
          name: props.name,
          title: props.title,
          description: props.description,
          app: props.app,
          actions: [
            defineSyncAction({
              name: `${props.name}_sync`,
              title: `${props.title} Sync`,
              app: props.app,
              connector: props.connector,
              collection: props.collection,
              frequency: props.frequency,
              direction: props.direction,
            } as SyncActionWithApp),
          ],
        }
      : {
          name: props.name,
          title: props.title,
          description: props.description,
          customApp: props.customApp,
          actions: [
            defineSyncAction({
              name: `${props.name}_sync`,
              title: `${props.title} Sync`,
              customApp: props.customApp,
              connector: props.connector,
              collection: props.collection,
              frequency: props.frequency,
              direction: props.direction,
            } as SyncActionWithCustomApp),
          ],
        };

  return defineIntegration(integrationProps);
}
