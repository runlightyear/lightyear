import { getUnconfirmedChanges, confirmChangeBatch } from "./sync";
import { BatchHttpProxyResponse } from "../http";

export interface PendingChange {
  changeId: string;
  operation: "CREATE" | "UPDATE" | "DELETE";
  requestPromise?: Promise<BatchHttpProxyResponse>;
  externalId?: string;
  data?: any;
  extractFn?: (response: any) => {
    externalId: string;
    externalUpdatedAt?: string | null;
  };
}

export class ChangeProcessor {
  private syncId: string;
  private pendingChanges: Map<string, PendingChange> = new Map();
  private pollingInterval: NodeJS.Timer | null = null;
  private confirmationQueue: Array<{
    changeId: string;
    externalId: string;
    externalUpdatedAt?: string | null;
  }> = [];

  constructor(syncId: string) {
    this.syncId = syncId;
  }

  /**
   * Track a pending change that was sent asynchronously
   */
  addPendingChange(change: PendingChange) {
    this.pendingChanges.set(change.changeId, change);
  }

  /**
   * Start polling for unconfirmed changes
   */
  startPolling(intervalMs: number = 2000) {
    if (this.pollingInterval) {
      return;
    }

    this.pollingInterval = setInterval(() => {
      this.processUnconfirmedChanges().catch((error) => {
        console.error("Error processing unconfirmed changes:", error);
      });
    }, intervalMs);

    // Also run immediately
    this.processUnconfirmedChanges().catch((error) => {
      console.error("Error processing unconfirmed changes:", error);
    });
  }

  /**
   * Stop polling
   */
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  /**
   * Process unconfirmed changes from the server
   */
  private async processUnconfirmedChanges() {
    try {
      const unconfirmedChanges = await getUnconfirmedChanges({
        syncId: this.syncId,
        limit: 100,
      });

      if (unconfirmedChanges.length === 0) {
        return;
      }

      console.info(
        `Processing ${unconfirmedChanges.length} unconfirmed changes for sync ${this.syncId}`
      );

      const confirmations: Array<{
        changeId: string;
        externalId: string;
        externalUpdatedAt?: string | null;
      }> = [];

      for (const unconfirmed of unconfirmedChanges) {
        const pendingChange = this.pendingChanges.get(unconfirmed.changeId);
        if (!pendingChange) {
          console.warn(
            `Received unconfirmed change ${unconfirmed.changeId} but no pending change found`
          );
          continue;
        }

        // Extract externalId and externalUpdatedAt from response
        let externalId: string | undefined;
        let externalUpdatedAt: string | null = null;

        if (unconfirmed.error) {
          console.error(
            `Change ${unconfirmed.changeId} failed:`,
            unconfirmed.error
          );
          // For failed changes, we might still want to confirm them to remove from queue
          // Use the pending change's externalId if available
          externalId = pendingChange.externalId;
        } else if (unconfirmed.response) {
          // Extract from successful response
          const responseData = unconfirmed.response.data;

          if (pendingChange.extractFn) {
            // Use custom extract function if provided
            const extracted = pendingChange.extractFn(responseData);
            externalId = extracted.externalId;
            externalUpdatedAt = extracted.externalUpdatedAt || null;
          } else if (pendingChange.operation === "CREATE") {
            // For create operations, extract from response
            externalId = responseData?.id || responseData?.externalId;
            externalUpdatedAt =
              responseData?.updatedAt ||
              responseData?.externalUpdatedAt ||
              null;
          } else if (pendingChange.operation === "UPDATE") {
            // For updates, use existing externalId or extract from response
            externalId =
              pendingChange.externalId ||
              responseData?.id ||
              responseData?.externalId;
            externalUpdatedAt =
              responseData?.updatedAt ||
              responseData?.externalUpdatedAt ||
              null;
          } else if (pendingChange.operation === "DELETE") {
            // For deletes, use the existing externalId
            externalId = pendingChange.externalId;
          }
        }

        if (externalId) {
          confirmations.push({
            changeId: unconfirmed.changeId,
            externalId: String(externalId),
            externalUpdatedAt: externalUpdatedAt
              ? String(externalUpdatedAt)
              : null,
          });

          // Remove from pending
          this.pendingChanges.delete(unconfirmed.changeId);
        } else {
          console.error(
            `Could not extract externalId for change ${unconfirmed.changeId}`
          );
        }
      }

      // Batch confirm the processed changes
      if (confirmations.length > 0) {
        this.confirmationQueue.push(...confirmations);
        await this.flushConfirmations();
      }
    } catch (error) {
      console.error("Failed to process unconfirmed changes:", error);
    }
  }

  /**
   * Flush pending confirmations
   */
  async flushConfirmations() {
    if (this.confirmationQueue.length === 0) {
      return;
    }

    const toConfirm = [...this.confirmationQueue];
    this.confirmationQueue = [];

    try {
      await confirmChangeBatch({
        syncId: this.syncId,
        changes: toConfirm,
        async: false, // Synchronous confirmation
      });
      console.info(
        `Confirmed ${toConfirm.length} changes for sync ${this.syncId}`
      );
    } catch (error) {
      console.error("Failed to confirm changes:", error);
      // Re-add to queue for retry
      this.confirmationQueue.unshift(...toConfirm);
    }
  }

  /**
   * Wait for all pending changes to be confirmed
   */
  async waitForPendingChanges(timeoutMs: number = 30000) {
    const startTime = Date.now();

    while (this.pendingChanges.size > 0) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(
          `Timeout waiting for ${this.pendingChanges.size} pending changes`
        );
      }

      await this.processUnconfirmedChanges();

      if (this.pendingChanges.size > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Final flush of any remaining confirmations
    await this.flushConfirmations();
  }

  /**
   * Get count of pending changes
   */
  getPendingCount(): number {
    return this.pendingChanges.size;
  }

  /**
   * Expose the sync identifier associated with this processor
   */
  getSyncId(): string {
    return this.syncId;
  }
}
