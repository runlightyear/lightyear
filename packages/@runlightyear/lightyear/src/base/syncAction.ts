import { AppName, defineAction } from "./action";
import { AuthData } from "./auth";
import { setContext } from "./context";
import { finishRun } from "./run";
import { SyncConnector } from "../connectors/SyncConnector";
import { startSync, updateSync, finishSync } from "./collection";
import { dayjsUtc } from "../util/dayjsUtc";
import { RERUN, SKIPPED } from "..";

export interface ConnectorProps {
  auth: AuthData;
}

export interface SynchronizerProps {
  connector: SyncConnector;
  collection: string;
}

export interface FrequencyProps {
  incremental?: number;
  full?: number;
  hardDelete?: number;
}

/**
 * Base properties for sync action definitions
 */
interface BaseSyncActionProps {
  name: string;
  title: string;
  connector: typeof SyncConnector | ((props: ConnectorProps) => SyncConnector);
  collection: string;
  frequency?: FrequencyProps;
  direction?: "pull" | "push" | "bidirectional";
}

/**
 * Sync action with a system app
 */
export interface SyncActionWithApp extends BaseSyncActionProps {
  app: AppName;
  customApp?: never;
}

/**
 * Sync action with a custom app
 */
export interface SyncActionWithCustomApp extends BaseSyncActionProps {
  app?: never;
  customApp: string;
}

/**
 * Type for defining sync actions - must specify exactly one of app or customApp
 */
export type DefineSyncActionProps = SyncActionWithApp | SyncActionWithCustomApp;

function isConnectorClass(
  x: typeof SyncConnector | ((props: ConnectorProps) => SyncConnector)
): x is typeof SyncConnector {
  return typeof x === "function" && x.prototype instanceof SyncConnector;
}

function isConnectorFunction(
  x: typeof SyncConnector | ((props: ConnectorProps) => SyncConnector)
): x is (props: ConnectorProps) => SyncConnector {
  return x instanceof Function;
}

export function defineSyncAction(props: DefineSyncActionProps) {
  return defineAction({
    name: props.name,
    title: props.title,
    trigger: {
      pollingFrequency: props.frequency?.incremental ?? 1,
    },
    // apps: props.app ? [props.app] : [],
    // customApps: props.customApp ? [props.customApp] : [],
    run: async (runProps) => {
      const appName = props.app || props.customApp;
      if (!appName) {
        throw new Error("No app or custom app provided");
      }
      const auth = runProps.auths[appName];
      if (!auth) {
        throw new Error("No auth provided");
      }

      const connectorProps: ConnectorProps = { auth };

      let connector: SyncConnector | undefined = undefined;

      if (isConnectorFunction(props.connector)) {
        connector = props.connector(connectorProps);
      } else if (isConnectorClass(props.connector)) {
        // @ts-ignore - We are assuming the user passed in a concrete class.
        connector = new props.connector(connectorProps);
      } else {
        throw new Error("Unknown connector type");
      }

      if (!connector) {
        throw new Error("No connector provided");
      }

      if (!runProps.managedUser) {
        throw new Error("No managed user provided");
      }

      console.debug("Attempting to start sync");
      const startSyncResponse = await startSync({
        collectionName: props.collection,
        appName: props.app ?? null,
        customAppName: props.customApp ?? null,
        managedUserId: runProps.managedUser.externalId,
        fullSyncFrequency: props.frequency?.full,
      });
      console.debug("Received", startSyncResponse);
      const sync = startSyncResponse;
      console.info(`Started sync ${sync.id} ${sync.type}`);
      console.debug(startSyncResponse);

      setContext({
        syncId: sync.id,
      });

      try {
        await connector.sync(sync.id, props.direction);
        const response = await finishSync(sync.id);
        const jsonData = await response.json();
        console.info(jsonData.message);
      } catch (error) {
        if (error === RERUN) {
          console.info("Rerunning sync");
          throw error;
        }

        await finishSync(sync.id);
        throw error;
      }

      await finishSync(sync.id);
      console.info("Sync finished");
    },
  });
}
