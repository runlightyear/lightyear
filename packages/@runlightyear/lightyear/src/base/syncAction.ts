import { CollectionSynchronizer } from "../synchronizers/CollectionSynchronizer";
import { AppName, defineAction } from "./action";
import { AuthData } from "./auth";
import { BaseConnector } from "../connectors/BaseConnector";

export interface SynchronizerProps {
  auths: {
    [name: string]: AuthData;
  };
}

export interface DefineSyncActionProps {
  name: string;
  title: string;
  connector: typeof BaseConnector;
  synchronizer?: (props: SynchronizerProps) => CollectionSynchronizer;
  app?: AppName;
  customApp?: string;
  frequency?: {
    incremental?: number;
    full?: number;
    hardDelete?: number;
  };
}

export function defineSyncAction(props: DefineSyncActionProps) {
  return defineAction({
    name: props.name,
    title: props.title,
    trigger: {
      pollingFrequency: props.frequency?.incremental ?? 1,
    },
    apps: props.app ? [props.app] : [],
    customApps: props.customApp ? [props.customApp] : [],
    run: async (runProps) => {
      console.log("Ready to run sync action!");

      let synchronizer: CollectionSynchronizer | undefined = undefined;

      if (props.synchronizer) {
        synchronizer = props.synchronizer({
          auths: runProps.auths,
        });
      }

      if (!synchronizer) {
        throw new Error("No synchronizer provided");
      }

      await synchronizer.sync();
    },
  });
}
