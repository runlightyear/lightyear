import { AppName, defineAction } from "./action";
import { AuthData } from "./auth";
import { AuthConnector } from "../connectors/AuthConnector";
import { finishSync, startSync, updateSync } from "./collection";
import { dayjsUtc } from "../util/dayjsUtc";
import { RERUN, SKIPPED, SyncConnector } from "..";
import { setContext } from "./context";

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

export interface DefineSyncActionProps {
  name: string;
  title: string;
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
  return typeof x === typeof AuthConnector;
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
    ...(props.frequency && (props.frequency.incremental || props.frequency.full)
      ? {
          trigger: {
            pollingFrequency: Math.min(
              props.frequency?.incremental ?? Infinity,
              props.frequency?.full ?? Infinity
            ),
          },
        }
      : {}),
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
        const response = await finishSync({ syncId: sync.id });
        const jsonData = await response.json();
        console.info(jsonData.message);
      } catch (error) {
        if (error === RERUN) {
          console.info("Rerunning sync");
          throw error;
        }

        console.info("Finishing sync with error", error);

        await finishSync({
          syncId: sync.id,
          error: error instanceof Error ? error.message : String(error),
          force: true,
        });
        throw error;
      }

      await finishSync({ syncId: sync.id });
      console.info("Sync finished");
    },
  });
}
