import { AppName } from "./action";
import { AuthData } from "./auth";
import { AuthConnector } from "../connectors/AuthConnector";
import { defineIntegration } from "./integration";
import { defineSyncAction } from "./syncAction";

export interface ConnectorProps {
  auth: AuthData;
}

export interface SynchronizerProps {
  connector: AuthConnector;
}

export interface DefineSyncIntegrationProps {
  name: string;
  title: string;
  description?: string;
  connector: typeof AuthConnector | ((props: ConnectorProps) => AuthConnector);
  collection: string;
  app?: AppName;
  customApp?: string;
  frequency?: {
    incremental?: number;
    full?: number;
    hardDelete?: number;
  };
  direction?: "pull" | "push" | "bidirectional";
}

function isConnectorClass(
  x: typeof AuthConnector | ((props: ConnectorProps) => AuthConnector)
): x is typeof AuthConnector {
  return typeof x === typeof AuthConnector;
}

function isConnectorFunction(
  x: typeof AuthConnector | ((props: ConnectorProps) => AuthConnector)
): x is (props: ConnectorProps) => AuthConnector {
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
