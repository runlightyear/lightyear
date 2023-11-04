import runAction, { RunActionProps } from "./runAction";
import execResubscribe, { ExecResubscribeProps } from "./execResubscribe";
import invariant from "tiny-invariant";
import execDeployAndSubscribe from "./execDeployAndSubscribe";
import {
  execGetAuthRequestUrl,
  ExecGetAuthRequestUrlProps,
} from "./execGetAuthRequestUrl";
import {
  execRequestAccessToken,
  ExecRequestAccessTokenProps,
} from "./execRequestAccessToken";
import {
  execRefreshAccessToken,
  ExecRefreshAccessTokenProps,
} from "./execRefreshAccessToken";
import {
  execRefreshSubscription,
  ExecRefreshSubscriptionProps,
} from "./execRefreshSubscription";
import { terminal } from "terminal-kit";

export interface OperationQueueDeployItem {
  operation: "deploy";
  params: undefined;
}

export interface OperationQueueRunItem {
  operation: "run";
  params: RunActionProps;
}

export interface OperationQueueRefreshSubscriptionItem {
  operation: "refreshSubscription";
  params: ExecRefreshSubscriptionProps;
}

export interface OperationQueueResubscribeItem {
  operation: "resubscribe";
  params: ExecResubscribeProps;
}

export interface OperationQueueGetAuthRequestUrlItem {
  operation: "getAuthRequestUrl";
  params: ExecGetAuthRequestUrlProps;
}

export interface OperationQueueRequestAccessTokenItem {
  operation: "requestAccessToken";
  params: ExecRequestAccessTokenProps;
}

export interface OperationQueueRefreshAccessTokenItem {
  operation: "refreshAccessToken";
  params: ExecRefreshAccessTokenProps;
}

export type OperationQueueItem =
  | OperationQueueDeployItem
  | OperationQueueGetAuthRequestUrlItem
  | OperationQueueRequestAccessTokenItem
  | OperationQueueRefreshAccessTokenItem
  | OperationQueueRefreshSubscriptionItem
  | OperationQueueRunItem
  | OperationQueueResubscribeItem;

export const operationQueue: Array<OperationQueueItem> = [];

let processingOperations = false;
let firstOperationsProcessed = true;

export function pushOperation(operationQueueItem: OperationQueueItem) {
  operationQueue.push(operationQueueItem);
  if (!processingOperations) {
    processOperations();
  }
}

async function processOperations() {
  processingOperations = true;
  console.debug("Starting to process operations");
  while (operationQueue.length > 0) {
    const item = operationQueue.shift();
    invariant(item);

    console.info("Processing operation", item.operation);

    try {
      if (item.operation === "deploy") {
        await execDeployAndSubscribe();
      } else if (item.operation === "run") {
        await runAction(item.params);
      } else if (item.operation === "resubscribe") {
        await execResubscribe(item.params);
      } else if (item.operation === "getAuthRequestUrl") {
        await execGetAuthRequestUrl(item.params);
      } else if (item.operation === "requestAccessToken") {
        await execRequestAccessToken(item.params);
      } else if (item.operation === "refreshAccessToken") {
        await execRefreshAccessToken(item.params);
      } else if (item.operation === "refreshSubscription") {
        await execRefreshSubscription(item.params);
      } else {
        const _exhaustiveCheck: never = item;
        throw new Error(`Unhandled operation ${_exhaustiveCheck}`);
      }
    } catch (error) {
      console.error(String(error));
    }
  }
  console.debug("Finished processing operations");
  processingOperations = false;

  if (firstOperationsProcessed) {
    terminal("\n\nDashboard is available at: https://app.runlightyear.com\n");
    firstOperationsProcessed = false;
  }

  terminal("\n\nWaiting for file changes...\n");
  terminal("press h for help, press q to quit\n\n");
}
