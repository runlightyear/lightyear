import { getUnconfirmedChanges, confirmChangeBatch } from "./sync";
import { BatchHttpProxyResponse } from "../http";

export interface BatchExtractFunction {
  (response: any): Array<{
    changeId: string;
    externalId: string;
    externalUpdatedAt?: string | null;
  }>;
}

export class ChangeProcessor {
  private syncId: string;
  private batchExtractFunctions: Map<string, BatchExtractFunction> = new Map();
  private batchExtractFunctionsByModel: Map<string, BatchExtractFunction> =
    new Map();
  private pollingInterval: ReturnType<typeof setInterval> | null = null;
  private confirmationQueue: Array<{
    changeId: string;
    externalId: string;
    externalUpdatedAt?: string | null;
  }> = [];
  private confirmedChangeIds: Set<string> = new Set();

  constructor(syncId: string) {
    this.syncId = syncId;
  }

  /**
   * Register a batch extract function for a specific httpRequestId (for sync requests that return httpRequestId)
   */
  registerBatchExtractFunction(
    httpRequestId: string,
    extractFn: BatchExtractFunction
  ) {
    console.debug(
      `Registering batch extract function for httpRequestId: ${httpRequestId}`
    );
    this.batchExtractFunctions.set(httpRequestId, extractFn);
  }

  /**
   * Register a batch extract function by model name (for async requests that don't return httpRequestId immediately)
   */
  registerBatchExtractFunctionByModel(
    modelName: string,
    extractFn: BatchExtractFunction
  ) {
    console.debug(`Registering batch extract function for model: ${modelName}`);
    this.batchExtractFunctionsByModel.set(modelName, extractFn);
  }

  /**
   * Check if a batch extract function is already registered for a model
   */
  hasBatchExtractFunctionForModel(modelName: string): boolean {
    return this.batchExtractFunctionsByModel.has(modelName);
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
   * Process unconfirmed changes from the server using the new http-requests endpoint
   */
  private async processUnconfirmedChanges() {
    try {
      const result = await getUnconfirmedChanges({
        syncId: this.syncId,
        limit: 100,
      });

      const httpRequests = result.httpRequests;

      if (httpRequests.length === 0) {
        return;
      }

      const totalChangeIds = httpRequests.reduce(
        (sum, req) => sum + req.changeIds.length,
        0
      );

      console.info(
        `Processing ${httpRequests.length} HTTP request(s) covering ${totalChangeIds} change(s) for sync ${this.syncId} (pendingWritesCount: ${result.pendingWritesCount})`
      );

      const confirmations: Array<{
        changeId: string;
        externalId: string;
        externalUpdatedAt?: string | null;
      }> = [];

      // Process each HTTP request (already grouped by the API)
      for (const item of httpRequests) {
        const httpRequest = item.httpRequest;
        const changeIds = item.changeIds;
        const modelName = item.modelName;
        const requestId = httpRequest.id;

        // Filter out already confirmed changes
        const unconfirmedChangeIds = changeIds.filter(
          (id) => !this.confirmedChangeIds.has(id)
        );

        if (unconfirmedChangeIds.length === 0) {
          console.debug(
            `All ${changeIds.length} changes for httpRequest ${requestId} have already been confirmed, skipping`
          );
          continue;
        }

        if (unconfirmedChangeIds.length < changeIds.length) {
          console.info(
            `Skipping ${
              changeIds.length - unconfirmedChangeIds.length
            } already-confirmed changes for httpRequest ${requestId}`
          );
        }

        // Check if request failed
        if (httpRequest.statusCode >= 400) {
          console.error(
            `HTTP request ${requestId} failed with status ${httpRequest.statusCode}, skipping ${unconfirmedChangeIds.length} changes`
          );
          continue;
        }

        // Parse the response body
        let responseData: any;
        try {
          responseData = JSON.parse(httpRequest.responseBody);
        } catch (error) {
          console.error(
            `Failed to parse responseBody for httpRequest ${requestId}:`,
            error
          );
          continue;
        }

        // Check if we have a batch extract function for this request
        // First try by httpRequestId, then by modelName-firstChangeId pattern
        let batchExtractFn = this.batchExtractFunctions.get(requestId);
        let extractFnSource: "httpRequestId" | "modelName" = "httpRequestId";

        if (!batchExtractFn && modelName) {
          // Try by modelName - same function can handle all batches for this model
          batchExtractFn = this.batchExtractFunctionsByModel.get(modelName);
          if (batchExtractFn) {
            extractFnSource = "modelName";
            console.debug(
              `Found batch extract function for model ${modelName}`
            );
          }
        }

        if (batchExtractFn) {
          // Use custom batch extract function
          console.debug(
            `Using batch extract function for httpRequest ${requestId} (source: ${extractFnSource})`
          );
          try {
            const batchConfirmations = batchExtractFn(responseData);

            console.info(
              `Batch extract function returned ${batchConfirmations.length} confirmations for request ${requestId}`
            );

            // Add confirmations for the unconfirmed changes only
            for (const confirmation of batchConfirmations) {
              if (unconfirmedChangeIds.includes(confirmation.changeId)) {
                confirmations.push({
                  changeId: confirmation.changeId,
                  externalId: confirmation.externalId,
                  externalUpdatedAt: confirmation.externalUpdatedAt || null,
                });
              }
            }

            // Clean up the extract function
            if (extractFnSource === "httpRequestId") {
              this.batchExtractFunctions.delete(requestId);
            }
            // Note: Don't delete by-model extract functions - they're reused for all batches of that model
          } catch (error) {
            console.error(
              `Failed to extract batch confirmations for request ${requestId}:`,
              error
            );
            // On error, we might want to retry, so don't delete the extract function
          }
        } else {
          // No custom extract function - use default logic based on changeIds length
          if (unconfirmedChangeIds.length === 1) {
            // Single change - extract directly from response
            const changeId = unconfirmedChangeIds[0];
            const externalId = responseData?.id || responseData?.externalId;
            const externalUpdatedAt =
              responseData?.updatedAt ||
              responseData?.externalUpdatedAt ||
              responseData?.createdAt ||
              null;

            if (externalId) {
              confirmations.push({
                changeId,
                externalId: String(externalId),
                externalUpdatedAt: externalUpdatedAt
                  ? String(externalUpdatedAt)
                  : null,
              });
              console.debug(
                `Extracted confirmation for single change ${changeId}: externalId=${externalId}`
              );
            } else {
              console.error(
                `Could not extract externalId for single change ${changeId}`,
                {
                  statusCode: httpRequest.statusCode,
                  responsePreview: JSON.stringify(responseData).substring(
                    0,
                    200
                  ),
                }
              );
            }
          } else {
            // Multiple changes but no extract function - this shouldn't happen
            console.warn(
              `HTTP request ${requestId} has ${unconfirmedChangeIds.length} changes but no batch extract function. Cannot process.`
            );
          }
        }
      }

      // Batch confirm the processed changes
      console.info(
        `Extracted ${confirmations.length} confirmations from ${totalChangeIds} change(s) across ${httpRequests.length} HTTP request(s)`
      );

      if (confirmations.length > 0) {
        console.debug(
          "Confirmations to queue:",
          confirmations.map((c) => ({
            changeId: c.changeId,
            externalId: c.externalId,
            hasUpdatedAt: !!c.externalUpdatedAt,
          }))
        );
        this.confirmationQueue.push(...confirmations);
        console.info(
          `Confirmation queue now has ${this.confirmationQueue.length} items, flushing...`
        );
        await this.flushConfirmations();
      } else {
        console.warn(
          `No confirmations extracted from ${unconfirmedChanges.length} unconfirmed changes - this means external IDs could not be extracted`
        );
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
      console.debug("Flush called but confirmation queue is empty, skipping");
      return;
    }

    const toConfirm = [...this.confirmationQueue];
    this.confirmationQueue = [];

    console.info(
      `Flushing ${toConfirm.length} confirmations for sync ${this.syncId}`
    );
    console.debug(
      "Confirmations being sent:",
      toConfirm.map((c) => ({
        changeId: c.changeId,
        externalId: c.externalId,
      }))
    );

    try {
      await confirmChangeBatch({
        syncId: this.syncId,
        changes: toConfirm,
        async: false, // Synchronous confirmation
      });

      // Mark as confirmed
      for (const confirmation of toConfirm) {
        this.confirmedChangeIds.add(confirmation.changeId);
      }

      console.info(
        `✅ Successfully confirmed ${toConfirm.length} changes for sync ${this.syncId} (total confirmed: ${this.confirmedChangeIds.size})`
      );
    } catch (error) {
      console.error(`❌ Failed to confirm ${toConfirm.length} changes:`, error);
      console.error("Error details:", {
        errorType:
          error instanceof Error ? error.constructor.name : typeof error,
        errorMessage: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
      });
      // Re-add to queue for retry
      this.confirmationQueue.unshift(...toConfirm);
      console.warn(
        `Re-added ${toConfirm.length} confirmations back to queue for retry`
      );
    }
  }

  /**
   * Wait for all pending changes to be confirmed
   */
  async waitForPendingChanges(timeoutMs: number = 30000) {
    const startTime = Date.now();
    let pollCount = 0;

    console.info(
      `Starting to wait for pending changes (timeout: ${timeoutMs}ms)`
    );

    // Give batch requests a moment to be registered
    console.info("Waiting 500ms for batch requests to be registered...");
    await new Promise((resolve) => setTimeout(resolve, 500));

    while (true) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(
          `Timeout waiting for pending changes after ${timeoutMs}ms`
        );
      }

      pollCount++;
      console.info(
        `Polling for unconfirmed HTTP requests (poll #${pollCount})...`
      );

      // Check for unconfirmed HTTP requests
      const result = await getUnconfirmedChanges({
        syncId: this.syncId,
        limit: 100, // Fetch batch to process
      });

      const totalChangeIds = result.httpRequests.reduce(
        (sum, req) => sum + req.changeIds.length,
        0
      );

      console.info(
        `Found ${result.httpRequests.length} HTTP request(s) with ${totalChangeIds} change(s), pendingWritesCount: ${result.pendingWritesCount}`
      );

      // Continue polling if there are unconfirmed HTTP requests OR pending writes
      if (result.httpRequests.length === 0 && result.pendingWritesCount === 0) {
        // No more unconfirmed requests and no pending writes
        break;
      }

      if (result.httpRequests.length > 0) {
        console.info("Processing unconfirmed HTTP requests...");
        // Process any available requests
        await this.processUnconfirmedChanges();
      } else if (result.pendingWritesCount > 0) {
        console.info(
          `No requests ready yet, but ${result.pendingWritesCount} write(s) still pending...`
        );
      }

      console.info("Waiting 1 second before next poll...");
      // Wait a bit before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.info("No more unconfirmed changes, flushing confirmations...");
    // Final flush of any remaining confirmations
    await this.flushConfirmations();
    console.info("All pending changes confirmed");
  }

  /**
   * Get count of registered batch extract functions
   */
  getBatchExtractFunctionCount(): number {
    return this.batchExtractFunctions.size;
  }

  /**
   * Get the sync ID associated with this processor
   */
  getSyncId(): string {
    return this.syncId;
  }
}
