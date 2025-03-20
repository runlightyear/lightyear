import { CollectionSynchronizer } from "../synchronizers/CollectionSynchronizer";
import { AppName, defineAction } from "./action";
import { AuthData } from "./auth";
import { AuthConnector } from "../connectors/AuthConnector";
import { finishSync, startSync, updateSync } from "./collection";
import { dayjsUtc } from "../util/dayjsUtc";
import { RERUN, SKIPPED } from "..";

export interface ConnectorProps {
  auth: AuthData;
}

export interface SynchronizerProps {
  connector: AuthConnector;
  collection: string;
}

export interface DefineSyncActionProps {
  name: string;
  title: string;
  connector: typeof AuthConnector | ((props: ConnectorProps) => AuthConnector);
  collection: string;
  synchronizer?:
    | typeof CollectionSynchronizer
    | ((props: SynchronizerProps) => CollectionSynchronizer);
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

function isSynchronizerClass(
  x:
    | typeof CollectionSynchronizer
    | ((props: SynchronizerProps) => CollectionSynchronizer)
): x is typeof CollectionSynchronizer {
  return typeof x === typeof CollectionSynchronizer;
}

function isSynchronizerFunction(
  x:
    | typeof CollectionSynchronizer
    | ((props: SynchronizerProps) => CollectionSynchronizer)
) {
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

      let connector: AuthConnector | undefined = undefined;

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

      const synchronizerProps: SynchronizerProps = {
        connector,
        collection: props.collection,
      };

      let synchronizer: CollectionSynchronizer | null | undefined = undefined;

      if (!props.synchronizer) {
        const connectorType = typeof connector;

        // @ts-ignore
        const synchronizerClass = connector.constructor["Synchronizer"];

        if (!synchronizerClass) {
          throw new Error("No synchronizer provided on connector");
        }
        // @ts-ignore - We are assuming the user passed in a concrete class.
        synchronizer = new synchronizerClass(synchronizerProps);
      } else if (isSynchronizerClass(props.synchronizer)) {
        // @ts-ignore - We are assuming the user passed in a concrete class.
        synchronizer = new props.synchronizer(synchronizerProps);
      } else if (isSynchronizerFunction(props.synchronizer)) {
        synchronizer = props.synchronizer(synchronizerProps);
      } else {
        throw new Error("Unknown synchronizer type");
      }

      if (!synchronizer) {
        throw new Error("No synchronizer provided");
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

      try {
        await synchronizer.sync(sync.id, props.direction);
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
