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
   * Register a batch extract function for a specific httpRequestId
   */
  registerBatchExtractFunction(httpRequestId: string, extractFn: BatchExtractFunction) {
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
      
      // Debug log the full unconfirmed response
      console.debug(
        `Unconfirmed changes response for sync ${this.syncId}:`,
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
        Array.from(changesByRequestId.entries()).map(([requestId, changes]) => ({
          requestId,
          changeCount: changes.length,
          changeIds: changes.map(c => c.changeId),
          hasResponses: changes.map(c => ({ changeId: c.changeId, hasResponse: !!c.response, hasError: !!c.error }))
        }))
      );

      // Process each group of changes
      for (const [requestId, changes] of changesByRequestId) {
        // Check if we have a batch extract function for this request
        const batchExtractFn = this.batchExtractFunctions.get(requestId);
        
        console.debug(
          `Processing requestId ${requestId}:`,
          {
            hasBatchExtractFn: !!batchExtractFn,
            changeCount: changes.length,
            registeredExtractFunctions: Array.from(this.batchExtractFunctions.keys())
          }
        );
        
        if (batchExtractFn && changes.length > 1) {
          // This is a batch request - process all changes together
          // Check if we have a response for this batch
          const changeWithResponse = changes.find(c => c.response);
          
          if (changeWithResponse?.response) {
            const responseData = changeWithResponse.response.data;
            
            try {
              // Call the batch extract function once for the entire response
              const batchConfirmations = batchExtractFn(responseData);
              
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
          } else if (changes.some(c => c.error)) {
            // Batch request failed
            console.error(
              `Batch request ${requestId} failed:`,
              changes.find(c => c.error)?.error
            );
            // Clean up the extract function
            this.batchExtractFunctions.delete(requestId);
            // Don't confirm these changes - let the server handle the failure
          }
          // If no response yet, do nothing - we'll get these changes again in the next poll
        } else {
          // Process individual changes (non-batch or no batch extract function)
          for (const unconfirmed of changes) {
            // Skip if no response yet
            if (!unconfirmed.response && !unconfirmed.error) {
              continue;
            }

            let externalId: string | undefined;
            let externalUpdatedAt: string | null = null;

            if (unconfirmed.error) {
              console.error(
                `Change ${unconfirmed.changeId} failed:`,
                unconfirmed.error
              );
              // Don't confirm failed changes - let the server handle them
              continue;
            } else if (unconfirmed.response) {
              // Extract from successful response
              const responseData = unconfirmed.response.data;
              
              // Log response structure for debugging
              console.debug(
                `Processing individual response for change ${unconfirmed.changeId}`,
                {
                  httpRequestId: unconfirmed.httpRequestId,
                  hasData: !!responseData,
                  dataType: typeof responseData,
                  isArray: Array.isArray(responseData),
                  dataKeys: responseData && typeof responseData === 'object' ? 
                    Object.keys(responseData).slice(0, 10) : undefined,
                  sampleData: JSON.stringify(responseData).substring(0, 200),
                }
              );
              
              // For individual responses, extract the ID directly
              // The server should only send us individual responses for non-batch operations
              if (Array.isArray(responseData) || (responseData?.results && Array.isArray(responseData.results))) {
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
                  externalUpdatedAt: externalUpdatedAt ? String(externalUpdatedAt) : null,
                });
              } else {
                console.error(
                  `Could not extract externalId for change ${unconfirmed.changeId}`,
                  {
                    hasResponse: true,
                    responseStatus: unconfirmed.response?.status,
                    responseData: JSON.stringify(responseData).substring(0, 500),
                    httpRequestId: unconfirmed.httpRequestId,
                  }
                );
              }
            }
          }
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
    let hasUnconfirmedChanges = true;

    while (hasUnconfirmedChanges) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(`Timeout waiting for pending changes after ${timeoutMs}ms`);
      }

      // Check for unconfirmed changes
      const unconfirmed = await getUnconfirmedChanges({
        syncId: this.syncId,
        limit: 1,
      });
      
      hasUnconfirmedChanges = unconfirmed.length > 0;
      
      if (hasUnconfirmedChanges) {
        // Process any available changes
        await this.processUnconfirmedChanges();
        
        // Wait a bit before checking again
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Final flush of any remaining confirmations
    await this.flushConfirmations();
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
