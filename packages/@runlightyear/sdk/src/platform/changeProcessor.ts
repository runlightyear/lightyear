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
  private confirmationQueue: Array<{
    changeId: string;
    externalId: string;
    externalUpdatedAt?: string | null;
  }> = [];
  private confirmedChangeIds: Set<string> = new Set();
  private failedRequestIds: Set<string> = new Set(); // Track requests from which extraction has failed
  private deltaBatchCount: number = 0;
  private changesSinceLastConfirmation: number = 0;

  constructor(syncId: string) {
    this.syncId = syncId;
  }

  /**
   * Increment delta batch counter (used for confirmation frequency control)
   */
  incrementDeltaBatch() {
    this.deltaBatchCount++;
  }

  /**
   * Track changes processed since last confirmation
   */
  addChangesProcessed(count: number) {
    this.changesSinceLastConfirmation += count;
  }

  /**
   * Check if confirmations should be processed based on change count
   * @param threshold Number of changes to process before confirming (default: 1000)
   */
  shouldProcessConfirmations(threshold: number = 1000): boolean {
    return this.changesSinceLastConfirmation >= threshold;
  }

  /**
   * Reset confirmation counter after processing
   */
  resetConfirmationCounter() {
    this.changesSinceLastConfirmation = 0;
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
    console.info(
      `🔧 Registered batch extract function for model: ${modelName}`
    );
    this.batchExtractFunctionsByModel.set(modelName, extractFn);
  }

  /**
   * Check if a batch extract function is already registered for a model
   */
  hasBatchExtractFunctionForModel(modelName: string): boolean {
    return this.batchExtractFunctionsByModel.has(modelName);
  }

  /**
   * Process unconfirmed changes from the server using the new http-requests endpoint
   * @returns object with hasChanges and pendingWritesCount
   */
  async processUnconfirmedChanges(): Promise<{
    hasChanges: boolean;
    pendingWritesCount: number;
  }> {
    try {
      const result = await getUnconfirmedChanges({
        syncId: this.syncId,
        limit: 100,
      });

      const httpRequests = result.httpRequests;

      console.debug(
        `processUnconfirmedChanges: Found ${httpRequests.length} HTTP requests, ${result.pendingWritesCount} pending writes`
      );

      if (httpRequests.length === 0) {
        return {
          hasChanges: false,
          pendingWritesCount: result.pendingWritesCount,
        };
      }

      const confirmations: Array<{
        changeId: string;
        externalId: string;
        externalUpdatedAt?: string | null;
      }> = [];
      
      let attemptedExtraction = false; // Track if we actually attempted to extract from any request

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
          continue;
        }

        // Skip requests that have already failed extraction (don't retry them)
        if (this.failedRequestIds.has(requestId)) {
          console.debug(
            `⏭️  Skipping request ${requestId} - extraction previously failed`
          );
          continue;
        }

        // Skip requests that don't have responses yet (statusCode is null or responseBody is empty)
        if (
          httpRequest.statusCode === null ||
          httpRequest.statusCode === undefined ||
          !httpRequest.responseBody
        ) {
          console.info(
            `⏳ HTTP request ${requestId} not ready yet (statusCode: ${httpRequest.statusCode}, hasResponseBody: ${!!httpRequest.responseBody}), skipping for now`
          );
          continue;
        }

        console.debug(
          `Processing HTTP request ${requestId} for model ${modelName}: status=${httpRequest.statusCode}, changeIds=[${unconfirmedChangeIds.join(", ")}]`
        );

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
          }
        }

        if (batchExtractFn) {
          // Use custom batch extract function
          attemptedExtraction = true; // Mark that we're attempting extraction
          try {
            // For model-level extract functions with individual requests,
            // the function might need the changeIds to properly map responses
            // Try calling with changeIds as second parameter (for individual requests)
            let batchConfirmations: Array<{
              changeId: string;
              externalId: string;
              externalUpdatedAt?: string | null;
            }>;
            try {
              // Try calling with changeIds as second parameter (if function accepts it)
              batchConfirmations = (batchExtractFn as any)(
                responseData,
                unconfirmedChangeIds
              );
            } catch (error) {
              // Fall back to calling with just responseData (original signature)
              console.debug(
                `Extract function doesn't accept changeIds parameter, using original signature. Error: ${error}`
              );
              batchConfirmations = batchExtractFn(responseData);
            }
            
            console.debug(
              `Extract function returned ${batchConfirmations.length} confirmations for request ${requestId}`
            );

            // If extract function didn't include changeIds (e.g., for individual requests),
            // map them ourselves
            if (
              batchConfirmations.length === unconfirmedChangeIds.length &&
              batchConfirmations.some((c) => !c.changeId || c.changeId === "")
            ) {
              // Map changeIds to confirmations in order
              batchConfirmations = batchConfirmations.map((confirmation, index) => ({
                ...confirmation,
                changeId: unconfirmedChangeIds[index] || confirmation.changeId,
              }));
            }

            // For DELETE operations, if externalId is missing, try to extract from request
            // DELETE endpoints often have the ID in the URL path (e.g., /api/users/:id)
            // or we need to look it up from the original change data
            for (let i = 0; i < batchConfirmations.length; i++) {
              const confirmation = batchConfirmations[i];
              if (!confirmation.externalId && httpRequest.method === "DELETE") {
                // Try to extract ID from URL path (most common case)
                // Match the last segment of the path (e.g., /api/users/123 -> 123)
                const urlMatch = httpRequest.url.match(/\/([^\/\?]+)(?:\?|$)/);
                if (urlMatch && urlMatch[1]) {
                  confirmation.externalId = urlMatch[1];
                } else {
                  // Try URL query parameter
                  try {
                    const urlObj = new URL(httpRequest.url);
                    confirmation.externalId =
                      urlObj.searchParams.get("id") ||
                      urlObj.searchParams.get("externalId") ||
                      null;
                  } catch {
                    // If URL parsing fails, try request body
                    try {
                      const requestBody = JSON.parse(
                        httpRequest.requestBody || "{}"
                      );
                      confirmation.externalId =
                        requestBody.id || requestBody.externalId || null;
                    } catch {
                      // If all extraction fails, log a warning
                      console.warn(
                        `Could not extract externalId for DELETE request ${requestId} from URL: ${httpRequest.url}`
                      );
                    }
                  }
                }
              }
            }

            // Add confirmations for the unconfirmed changes only
            for (const confirmation of batchConfirmations) {
              if (unconfirmedChangeIds.includes(confirmation.changeId)) {
                // For DELETE operations, externalId should have been extracted from URL
                // If it's still missing, skip this confirmation
                if (!confirmation.externalId) {
                  console.warn(
                    `Skipping confirmation for change ${confirmation.changeId}: missing externalId (method: ${httpRequest.method})`
                  );
                  continue;
                }
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
            // Extraction failed - this is a critical error that should fail the sync
            // Log the error and throw it to stop the sync
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(
              `❌ Failed to extract batch confirmations for request ${requestId}. Sync will be failed. Error:`,
              errorMessage
            );
            // Throw the error to fail the sync
            throw new Error(
              `Failed to extract confirmations from HTTP request ${requestId} for model "${modelName}": ${errorMessage}`
            );
          }
        } else {
          // No custom extract function - use default logic based on changeIds length
          attemptedExtraction = true; // Mark that we're attempting extraction
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
                `Could not extract externalId for single change ${changeId} (status: ${httpRequest.statusCode})`
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
      if (confirmations.length > 0) {
        console.info(
          `📊 Extracted ${confirmations.length} confirmations from ${httpRequests.length} requests`
        );
        
        // Check if any of the requests were async (have syncInfo in request body)
        let isAsync = false;
        for (const item of httpRequests) {
          try {
            const requestBody = JSON.parse(item.httpRequest.requestBody || "{}");
            if (requestBody.syncInfo || requestBody.async === true) {
              isAsync = true;
              break;
            }
          } catch {
            // Ignore parse errors
          }
        }
        
        this.confirmationQueue.push(...confirmations);
        console.info(`⏱️  Starting confirmation flush...`);
        await this.flushConfirmations(isAsync);
        console.info(`⏱️  Confirmation flush complete`);
      } else if (attemptedExtraction) {
        // Only log warning if we actually attempted extraction but got no confirmations
        // Don't log if all requests were skipped (failed, not ready, etc.)
        console.warn(
          `⚠️  No confirmations extracted - external IDs could not be extracted`
        );
      }

      return {
        hasChanges: httpRequests.length > 0,
        pendingWritesCount: result.pendingWritesCount,
      };
    } catch (error) {
      console.error("Failed to process unconfirmed changes:", error);
      return { hasChanges: false, pendingWritesCount: 0 };
    }
  }

  /**
   * Flush pending confirmations in batches (sent in parallel for speed, with concurrency limit)
   */
  async flushConfirmations(async: boolean = false, batchSize: number = 100) {
    if (this.confirmationQueue.length === 0) {
      return;
    }

    const toConfirm = [...this.confirmationQueue];
    this.confirmationQueue = [];

    // Split into batches
    const batches: Array<typeof toConfirm> = [];
    for (let i = 0; i < toConfirm.length; i += batchSize) {
      batches.push(toConfirm.slice(i, i + batchSize));
    }

    if (batches.length > 1) {
      console.info(
        `💾 Confirming ${toConfirm.length} changes in ${batches.length} batches (parallel)...`
      );
    } else {
      console.info(`💾 Confirming ${toConfirm.length} changes...`);
    }

    // Process batches in parallel with a concurrency limit to avoid overwhelming the AbortSignal
    // Even though we increased the listener limit, it's still good practice to limit concurrency
    const MAX_PARALLEL_BATCHES = 50;
    const results: PromiseSettledResult<void>[] = [];

    for (let i = 0; i < batches.length; i += MAX_PARALLEL_BATCHES) {
      const batchChunk = batches.slice(i, i + MAX_PARALLEL_BATCHES);
      const chunkResults = await Promise.allSettled(
        batchChunk.map((batch) =>
          confirmChangeBatch({
            syncId: this.syncId,
            changes: batch,
            async,
          })
        )
      );
      results.push(...chunkResults);
    }

    // Process results and mark confirmed
    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const batch = batches[i];

      if (result.status === "fulfilled") {
        // Mark as confirmed
        for (const confirmation of batch) {
          this.confirmedChangeIds.add(confirmation.changeId);
        }
        successCount += batch.length;
      } else {
        // Re-add failed batch to queue for retry
        this.confirmationQueue.unshift(...batch);
        failedCount += batch.length;
        console.error(
          `❌ Batch ${i + 1}/${batches.length} failed:`,
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason)
        );
      }
    }

    if (failedCount > 0) {
      console.warn(
        `⚠️  ${successCount} confirmed, ${failedCount} failed (re-queued)`
      );
    }

    console.info(
      `✅ Confirmed ${successCount} changes (total: ${this.confirmedChangeIds.size})`
    );
  }

  /**
   * Wait for all pending changes to be confirmed
   */
  async waitForPendingChanges(timeoutMs: number = 120000) {
    const startTime = Date.now();
    let pollCount = 0;

    console.info(
      `⏳ Waiting for pending changes (timeout: ${timeoutMs / 1000}s)`
    );

    // Give batch requests a moment to be registered
    await new Promise((resolve) => setTimeout(resolve, 500));

    while (true) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(
          `Timeout waiting for pending changes after ${timeoutMs}ms`
        );
      }

      pollCount++;

      // Check for unconfirmed HTTP requests
      const result = await getUnconfirmedChanges({
        syncId: this.syncId,
        limit: 100, // Fetch batch to process
      });

      const totalChangeIds = result.httpRequests.reduce(
        (sum, req) => sum + req.changeIds.length,
        0
      );

      if (result.httpRequests.length > 0 || result.pendingWritesCount > 0) {
        console.info(
          `🔄 Poll #${pollCount}: ${result.httpRequests.length} requests (${totalChangeIds} changes), ${result.pendingWritesCount} pending writes`
        );
      }

      // Continue polling if there are unconfirmed HTTP requests OR pending writes
      if (result.httpRequests.length === 0 && result.pendingWritesCount === 0) {
        // No more unconfirmed requests and no pending writes
        console.info(`✅ Polling complete - no unconfirmed changes remaining`);
        break;
      }

      if (result.httpRequests.length > 0) {
        console.info(
          `⏱️  Processing ${result.httpRequests.length} unconfirmed requests...`
        );
        // Process any available requests
        await this.processUnconfirmedChanges();
        console.info(`⏱️  Processing complete, waiting 1s before next poll...`);
      } else if (result.pendingWritesCount > 0) {
        console.info(`⏱️  No requests ready, waiting 1s for pending writes...`);
      }

      // Wait before next poll
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Final flush of any remaining confirmations
    await this.flushConfirmations();
    console.info("✅ All pending changes confirmed");
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
