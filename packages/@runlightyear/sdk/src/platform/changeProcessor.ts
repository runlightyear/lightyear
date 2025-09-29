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
   * Register a batch extract function for a specific httpRequestId
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
      const result = await getUnconfirmedChanges({
        syncId: this.syncId,
        limit: 100,
      });

      const unconfirmedChanges = result.changes;

      if (unconfirmedChanges.length === 0) {
        return;
      }

      console.info(
        `Processing ${unconfirmedChanges.length} unconfirmed changes for sync ${this.syncId} (pendingWritesCount: ${result.pendingWritesCount})`
      );

      // Log structure overview
      console.info(
        "Unconfirmed changes structure:",
        unconfirmedChanges.map((c) => ({
          changeId: c.changeId,
          hasHttpRequest: !!(c as any).httpRequest,
          httpRequestStatus: (c as any).httpRequest?.statusCode,
          hasResponseBody: !!(c as any).httpRequest?.responseBody,
          allKeys: Object.keys(c),
        }))
      );

      // Log FULL JSON of first change to see actual structure
      if (unconfirmedChanges.length > 0) {
        console.info(
          "FULL JSON of first unconfirmed change:",
          JSON.stringify(unconfirmedChanges[0], null, 2)
        );
      }

      // Debug log the full unconfirmed response
      console.debug(
        `Full unconfirmed changes response for sync ${this.syncId}:`,
        JSON.stringify(unconfirmedChanges, null, 2)
      );

      const confirmations: Array<{
        changeId: string;
        externalId: string;
        externalUpdatedAt?: string | null;
      }> = [];

      // Group unconfirmed changes by httpRequestId to detect batch responses
      const changesByRequestId = new Map<string, typeof unconfirmedChanges>();
      for (const unconfirmed of unconfirmedChanges) {
        const requestId = unconfirmed.httpRequestId;
        if (!changesByRequestId.has(requestId)) {
          changesByRequestId.set(requestId, []);
        }
        changesByRequestId.get(requestId)!.push(unconfirmed);
      }

      // Debug log the grouping
      console.debug(
        `Grouped changes by requestId:`,
        Array.from(changesByRequestId.entries()).map(
          ([requestId, changes]) => ({
            requestId,
            changeCount: changes.length,
            changeIds: changes.map((c) => c.changeId),
            hasResponses: changes.map((c) => ({
              changeId: c.changeId,
              hasResponse: !!c.response,
              hasError: !!c.error,
            })),
          })
        )
      );

      // Process each group of changes
      for (const [requestId, changes] of changesByRequestId) {
        // Filter out already confirmed changes
        const unconfirmedOnlyChanges = changes.filter(
          (c) => !this.confirmedChangeIds.has(c.changeId)
        );

        if (unconfirmedOnlyChanges.length === 0) {
          console.debug(
            `All ${changes.length} changes for requestId ${requestId} have already been confirmed, skipping`
          );
          continue;
        }

        if (unconfirmedOnlyChanges.length < changes.length) {
          console.info(
            `Skipping ${
              changes.length - unconfirmedOnlyChanges.length
            } already-confirmed changes for requestId ${requestId}`
          );
        }

        // Check if we have a batch extract function for this request
        const batchExtractFn = this.batchExtractFunctions.get(requestId);

        console.debug(`Processing requestId ${requestId}:`, {
          hasBatchExtractFn: !!batchExtractFn,
          changeCount: changes.length,
          registeredExtractFunctions: Array.from(
            this.batchExtractFunctions.keys()
          ),
        });

        if (batchExtractFn && unconfirmedOnlyChanges.length > 1) {
          // This is a batch request - process all changes together
          // Check if we have a response for this batch
          const changeWithHttpRequest = unconfirmedOnlyChanges.find(
            (c) => (c as any).httpRequest?.responseBody
          );

          if (changeWithHttpRequest) {
            const httpRequest = (changeWithHttpRequest as any).httpRequest;

            // Check if request failed
            if (httpRequest.statusCode && httpRequest.statusCode >= 400) {
              console.error(
                `Batch request ${requestId} failed with status ${httpRequest.statusCode}`
              );
              this.batchExtractFunctions.delete(requestId);
              continue;
            }

            // Parse the response body
            let responseData: any;
            try {
              responseData = JSON.parse(httpRequest.responseBody);
            } catch (error) {
              console.error(
                `Failed to parse batch response body for request ${requestId}:`,
                error
              );
              continue;
            }

            try {
              // Call the batch extract function once for the entire response
              const batchConfirmations = batchExtractFn(responseData);

              console.info(
                `Batch extract function returned ${batchConfirmations.length} confirmations for request ${requestId}`
              );

              // Process all confirmations
              for (const confirmation of batchConfirmations) {
                confirmations.push({
                  changeId: confirmation.changeId,
                  externalId: confirmation.externalId,
                  externalUpdatedAt: confirmation.externalUpdatedAt || null,
                });
              }

              // Clean up the extract function as it's been used
              this.batchExtractFunctions.delete(requestId);
            } catch (error) {
              console.error(
                `Failed to extract batch confirmations for request ${requestId}:`,
                error
              );
              // On error, we might want to retry, so don't delete the extract function
            }
          }
          // If no httpRequest yet, do nothing - we'll get these changes again in the next poll
        } else {
          // Process individual changes (non-batch or no batch extract function)
          for (const unconfirmed of unconfirmedOnlyChanges) {
            const httpRequest = (unconfirmed as any).httpRequest;

            // Skip if no httpRequest yet
            if (!httpRequest) {
              console.debug(
                `Change ${unconfirmed.changeId} has no httpRequest yet, skipping`
              );
              continue;
            }

            let externalId: string | undefined;
            let externalUpdatedAt: string | null = null;

            // Check if the request failed
            if (httpRequest.statusCode && httpRequest.statusCode >= 400) {
              console.error(
                `Change ${unconfirmed.changeId} failed with status ${httpRequest.statusCode}:`,
                httpRequest.responseBody?.substring(0, 200)
              );
              // Don't confirm failed changes - let the server handle them
              continue;
            }

            // Parse responseBody (it's a JSON string)
            let responseData: any;
            try {
              if (httpRequest.responseBody) {
                responseData = JSON.parse(httpRequest.responseBody);
              } else {
                console.warn(
                  `Change ${unconfirmed.changeId} has no responseBody`
                );
                continue;
              }
            } catch (error) {
              console.error(
                `Failed to parse responseBody for change ${unconfirmed.changeId}:`,
                error
              );
              continue;
            }

            if (responseData) {
              // Extract from successful response

              // Log response structure for debugging
              console.debug(
                `Processing individual response for change ${unconfirmed.changeId}`,
                {
                  httpRequestId: unconfirmed.httpRequestId,
                  hasData: !!responseData,
                  dataType: typeof responseData,
                  isArray: Array.isArray(responseData),
                  dataKeys:
                    responseData && typeof responseData === "object"
                      ? Object.keys(responseData).slice(0, 10)
                      : undefined,
                  sampleData: JSON.stringify(responseData).substring(0, 200),
                }
              );

              // For individual responses, extract the ID directly
              // The server should only send us individual responses for non-batch operations
              if (
                Array.isArray(responseData) ||
                (responseData?.results && Array.isArray(responseData.results))
              ) {
                // This shouldn't happen for individual changes
                console.error(
                  `Unexpected batch response format for individual change ${unconfirmed.changeId}. ` +
                    `This suggests the change was part of a batch operation but no batch extract function was registered.`
                );
                continue;
              }

              // Extract from single item response
              externalId = responseData?.id || responseData?.externalId;
              externalUpdatedAt =
                responseData?.updatedAt ||
                responseData?.externalUpdatedAt ||
                responseData?.properties?.hs_lastmodifieddate ||
                null;

              if (externalId) {
                confirmations.push({
                  changeId: unconfirmed.changeId,
                  externalId: String(externalId),
                  externalUpdatedAt: externalUpdatedAt
                    ? String(externalUpdatedAt)
                    : null,
                });
              } else {
                console.error(
                  `Could not extract externalId for change ${unconfirmed.changeId}`,
                  {
                    hasHttpRequest: true,
                    httpRequestStatus: httpRequest.statusCode,
                    responseData: JSON.stringify(responseData).substring(
                      0,
                      500
                    ),
                    httpRequestId: httpRequest.id,
                  }
                );
              }
            }
          }
        }
      }

      // Batch confirm the processed changes
      console.info(
        `Extracted ${confirmations.length} confirmations from ${unconfirmedChanges.length} unconfirmed changes`
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
      console.info(`Polling for unconfirmed changes (poll #${pollCount})...`);

      // Check for unconfirmed changes (just check if any exist)
      const result = await getUnconfirmedChanges({
        syncId: this.syncId,
        limit: 100, // Fetch batch to process
      });

      console.info(
        `Found ${result.changes.length} unconfirmed change(s), pendingWritesCount: ${result.pendingWritesCount}`
      );

      // Continue polling if there are unconfirmed changes OR pending writes
      if (result.changes.length === 0 && result.pendingWritesCount === 0) {
        // No more unconfirmed changes and no pending writes
        break;
      }

      if (result.changes.length > 0) {
        console.info("Processing unconfirmed changes...");
        // Process any available changes
        await this.processUnconfirmedChanges();
      } else if (result.pendingWritesCount > 0) {
        console.info(
          `No changes ready yet, but ${result.pendingWritesCount} write(s) still pending...`
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
