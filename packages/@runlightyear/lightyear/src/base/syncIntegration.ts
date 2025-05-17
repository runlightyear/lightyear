import { AppName } from "./action";
import { AuthData } from "./auth";
import { SyncConnector } from "../connectors/SyncConnector";
import { defineIntegration } from "./integration";
import { defineSyncAction } from "./syncAction";

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

export interface DefineSyncIntegrationProps {
  name: string;
  title: string;
  description?: string;
  connector: typeof SyncConnector | ((props: ConnectorProps) => SyncConnector);
  collection: string;
  app?: AppName;
  customApp?: string;
  frequency?: FrequencyProps;
  direction?: "pull" | "push" | "bidirectional";
}

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
  return defineIntegration({
    name: props.name,
    title: props.title,
    description: props.description,
    app: props.app,
    customApp: props.customApp,
    actions: [
      defineSyncAction({
        name: `${props.name}_sync`,
        title: `${props.title} Sync`,
        app: props.app,
        customApp: props.customApp,
        connector: props.connector,
        collection: props.collection,
        frequency: props.frequency,
        direction: props.direction,
      }),
    ],
  });
}
