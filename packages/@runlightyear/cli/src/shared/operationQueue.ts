import runAction, { RunActionProps } from "./runAction";
import execResubscribe, { ExecResubscribeProps } from "./execResubscribe";
import invariant from "tiny-invariant";
import execDeployAndSubscribe from "./execDeployAndSubscribe";

export interface OperationQueueDeployItem {
  operation: "deploy";
  params: undefined;
}

export interface OperationQueueRunItem {
  operation: "run";
  params: RunActionProps;
}

export interface OperationQueueResubscribeItem {
  operation: "resubscribe";
  params: ExecResubscribeProps;
}

export type OperationQueueItem =
  | OperationQueueDeployItem
  | OperationQueueRunItem
  | OperationQueueResubscribeItem;

export const operationQueue: Array<OperationQueueItem> = [];

let processingOperations = false;

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

    if (item.operation === "deploy") {
      await execDeployAndSubscribe();
    } else if (item.operation === "run") {
      await runAction(item.params);
    } else if (item.operation === "resubscribe") {
      await execResubscribe(item.params);
    }
  }
  console.debug("Finished processing operations");
  processingOperations = false;
}
