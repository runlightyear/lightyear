// Simple cancellation registry and notifier for runs
import { EventEmitter } from "events";

const canceledRunIds = new Set<string>();
const emitter = new EventEmitter();

export function markRunCanceled(runId: string): void {
  canceledRunIds.add(runId);
  emitter.emit("canceled", runId);
}

export function clearRunCanceled(runId: string): void {
  canceledRunIds.delete(runId);
}

export function isRunCanceled(runId: string | undefined): boolean {
  if (!runId) return false;
  return canceledRunIds.has(runId);
}

export function waitForRunCanceled(runId: string): Promise<void> {
  if (canceledRunIds.has(runId)) return Promise.resolve();
  return new Promise((resolve) => {
    const onCanceled = (id: string) => {
      if (id === runId) {
        emitter.off("canceled", onCanceled);
        resolve();
      }
    };
    emitter.on("canceled", onCanceled);
  });
}
