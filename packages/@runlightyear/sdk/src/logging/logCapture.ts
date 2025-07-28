interface LogEntry {
  level: "DEBUG" | "INFO" | "WARN" | "ERROR" | "LOG";
  message: string;
  timestamp: string;
  position?: number;
}

interface LogUploadPayload {
  deployId?: string;
  runId?: string;
  deliveryId?: string;
  subscriptionActivityId?: string;
  authorizerActivityId?: string;
  logs: LogEntry[];
}

interface LogCaptureConfig {
  uploadIntervalMs?: number;
  maxLogsPerBatch?: number;
  baseUrl?: string;
  environment?: string;
  apiKey?: string;
}

class LogCapture {
  private logs: LogEntry[] = [];
  private uploadTimer: NodeJS.Timeout | null = null;
  private originalConsole: {
    log: typeof console.log;
    info: typeof console.info;
    warn: typeof console.warn;
    error: typeof console.error;
    debug: typeof console.debug;
  };
  private config: Required<LogCaptureConfig>;
  private isCapturing = false;
  private currentContext: {
    runId?: string;
    deployId?: string;
    deliveryId?: string;
    subscriptionActivityId?: string;
    authorizerActivityId?: string;
  } = {};

  constructor(config: LogCaptureConfig = {}) {
    this.originalConsole = {
      log: console.log.bind(console),
      info: console.info.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console),
      debug: console.debug.bind(console),
    };

    this.config = {
      uploadIntervalMs: config.uploadIntervalMs || 1000,
      maxLogsPerBatch: config.maxLogsPerBatch || 1000,
      baseUrl:
        config.baseUrl ||
        process.env.LIGHTYEAR_BASE_URL ||
        "https://app.runlightyear.com",
      environment: config.environment || process.env.LIGHTYEAR_ENV || "dev",
      apiKey: config.apiKey || process.env.LIGHTYEAR_API_KEY || "",
    };
  }

  /**
   * Start capturing console logs
   */
  startCapture(): void {
    if (this.isCapturing) {
      this.originalConsole.log("🔄 Log capture already running");
      return;
    }

    this.isCapturing = true;
    this.originalConsole.log("🚀 Starting log capture system...");
    this.originalConsole.log("📋 Config:", {
      uploadIntervalMs: this.config.uploadIntervalMs,
      maxLogsPerBatch: this.config.maxLogsPerBatch,
      baseUrl: this.config.baseUrl,
      environment: this.config.environment,
      hasApiKey: !!this.config.apiKey,
    });

    // Intercept console methods
    console.log = this.createInterceptor("LOG", this.originalConsole.log);
    console.info = this.createInterceptor("INFO", this.originalConsole.info);
    console.warn = this.createInterceptor("WARN", this.originalConsole.warn);
    console.error = this.createInterceptor("ERROR", this.originalConsole.error);
    console.debug = this.createInterceptor("DEBUG", this.originalConsole.debug);

    this.originalConsole.log("✅ Console methods intercepted");

    // Start periodic upload
    this.startPeriodicUpload();
    this.originalConsole.log(
      "⏰ Periodic upload started (interval: " +
        this.config.uploadIntervalMs +
        "ms)"
    );
  }

  /**
   * Stop capturing console logs
   */
  stopCapture(): void {
    if (!this.isCapturing) {
      this.originalConsole.log("🔄 Log capture already stopped");
      return;
    }

    this.originalConsole.log("🛑 Stopping log capture system...");
    this.originalConsole.log("📊 Final stats:", {
      capturedLogs: this.logs.length,
      currentContext: this.currentContext,
    });

    this.isCapturing = false;

    // Restore original console methods
    console.log = this.originalConsole.log;
    console.info = this.originalConsole.info;
    console.warn = this.originalConsole.warn;
    console.error = this.originalConsole.error;
    console.debug = this.originalConsole.debug;

    this.originalConsole.log("✅ Console methods restored");

    // Stop periodic upload
    if (this.uploadTimer) {
      clearInterval(this.uploadTimer);
      this.uploadTimer = null;
      this.originalConsole.log("⏰ Periodic upload timer stopped");
    }

    // Upload any remaining logs
    this.originalConsole.log("📤 Attempting final log upload...");
    this.uploadLogs();
  }

  /**
   * Set context for log uploads (runId, deployId, etc.)
   */
  setContext(context: {
    runId?: string;
    deployId?: string;
    deliveryId?: string;
    subscriptionActivityId?: string;
    authorizerActivityId?: string;
  }): void {
    this.originalConsole.log("🔗 Setting log context:", context);
    this.currentContext = { ...this.currentContext, ...context };
    this.originalConsole.log("📋 Current context:", this.currentContext);

    // If we have uploadable context and pending logs, trigger an immediate upload
    if (this.hasUploadableContext() && this.logs.length > 0) {
      this.originalConsole.log(
        "⚡ Context set with pending logs - triggering immediate upload"
      );
      setTimeout(() => this.uploadLogs(), 100); // Small delay to avoid blocking
    }
  }

  /**
   * Clear the current context
   */
  clearContext(): void {
    this.originalConsole.log("🧹 Clearing log context");
    this.originalConsole.log("📊 Context before clear:", this.currentContext);

    // Do a final upload before clearing context
    if (this.hasUploadableContext() && this.logs.length > 0) {
      this.originalConsole.log("📤 Final upload before clearing context");
      this.uploadLogs();
    }

    this.currentContext = {};
    this.originalConsole.log("✅ Context cleared");
  }

  /**
   * Create an interceptor for a console method
   */
  private createInterceptor(
    level: LogEntry["level"],
    originalMethod: (...args: any[]) => void
  ) {
    return (...args: any[]) => {
      // Call original console method first
      originalMethod(...args);

      // Capture the log
      if (this.isCapturing) {
        const message = args
          .map((arg) => {
            if (typeof arg === "string") {
              return arg;
            } else if (typeof arg === "object") {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            } else {
              return String(arg);
            }
          })
          .join(" ");

        this.addLog({
          level,
          message,
          timestamp: new Date().toISOString(),
          position: this.logs.length,
        });
      }
    };
  }

  /**
   * Add a log entry to the buffer
   */
  private addLog(entry: LogEntry): void {
    this.logs.push(entry);

    // Debug info (but use original console to avoid recursion)
    if (this.logs.length % 10 === 0) {
      // Every 10th log
      this.originalConsole.log(
        `📊 Log buffer: ${this.logs.length} logs captured`
      );
    }

    // Prevent memory issues by limiting log count
    if (this.logs.length > this.config.maxLogsPerBatch * 2) {
      const oldCount = this.logs.length;
      this.logs = this.logs.slice(-this.config.maxLogsPerBatch);
      this.originalConsole.log(
        `📏 Log buffer trimmed: ${oldCount} -> ${this.logs.length}`
      );
    }
  }

  /**
   * Start periodic upload of logs
   */
  private startPeriodicUpload(): void {
    this.uploadTimer = setInterval(() => {
      if (this.logs.length > 0) {
        this.originalConsole.log(
          `⏰ Periodic upload check: ${this.logs.length} logs pending`
        );
        this.uploadLogs();
      }
    }, this.config.uploadIntervalMs);
  }

  /**
   * Upload logs to the API
   */
  private async uploadLogs(): Promise<void> {
    this.originalConsole.log("📤 Upload attempt started...");
    this.originalConsole.log("📊 Current state:", {
      pendingLogs: this.logs.length,
      hasContext: this.hasUploadableContext(),
      context: this.currentContext,
      hasApiKey: !!this.config.apiKey,
    });

    if (this.logs.length === 0) {
      this.originalConsole.log("📭 No logs to upload");
      return;
    }

    // Only upload if we have a context that requires it (like runId)
    if (!this.hasUploadableContext()) {
      this.originalConsole.log("🚫 No uploadable context - skipping upload");
      this.originalConsole.log(
        "💡 Logs will be uploaded when context is set (runId, deployId, etc.)"
      );
      return;
    }

    if (!this.config.apiKey) {
      this.originalConsole.log("🚫 No API key configured - skipping upload");
      return;
    }

    const logsToUpload = this.logs.slice(0, this.config.maxLogsPerBatch);
    this.logs = this.logs.slice(this.config.maxLogsPerBatch);

    this.originalConsole.log(
      `📦 Preparing to upload ${logsToUpload.length} logs`
    );

    const payload: LogUploadPayload = {
      ...this.currentContext,
      logs: logsToUpload,
    };

    this.originalConsole.log("📋 Upload payload:", {
      contextKeys: Object.keys(this.currentContext),
      logCount: payload.logs.length,
      firstLogLevel: payload.logs[0]?.level,
      lastLogLevel: payload.logs[payload.logs.length - 1]?.level,
    });

    try {
      this.originalConsole.log("🚀 Sending logs to API...");
      await this.sendLogsToAPI(payload);
      this.originalConsole.log("✅ Logs uploaded successfully!");
    } catch (error) {
      // If upload fails, put logs back (but don't let them accumulate indefinitely)
      this.logs = [...logsToUpload.slice(-100), ...this.logs];

      // Use original console to avoid infinite recursion
      this.originalConsole.error("❌ Failed to upload logs:", error);
      this.originalConsole.log("🔄 Logs restored to buffer for retry");
    }
  }

  /**
   * Check if we have a context that requires log upload
   */
  private hasUploadableContext(): boolean {
    return !!(
      this.currentContext.runId ||
      this.currentContext.deployId ||
      this.currentContext.deliveryId ||
      this.currentContext.subscriptionActivityId ||
      this.currentContext.authorizerActivityId
    );
  }

  /**
   * Send logs to the API endpoint
   */
  private async sendLogsToAPI(payload: LogUploadPayload): Promise<void> {
    if (!this.config.apiKey) {
      this.originalConsole.log("🚫 No API key - cannot send logs");
      return; // Skip upload if no API key
    }

    const url = `${this.config.baseUrl}/api/v1/envs/${this.config.environment}/logs`;

    this.originalConsole.log("🌐 API Request details:", {
      url,
      method: "POST",
      bodySize: JSON.stringify(payload).length,
      hasApiKey: !!this.config.apiKey,
    });

    const body = JSON.stringify(payload);
    this.originalConsole.log(
      "📦 Request body preview:",
      body.substring(0, 500) + (body.length > 500 ? "..." : "")
    );

    try {
      this.originalConsole.log("⏰ Making HTTP request...");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
          "User-Agent": "@runlightyear/sdk",
          "X-SDK-Version": "0.1.0",
        },
        body,
      });

      this.originalConsole.log("📈 HTTP Response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (!response.ok) {
        const errorText = await response
          .text()
          .catch(() => "Unable to read response");
        this.originalConsole.log("📄 Error response body:", errorText);
        throw new Error(
          `Log upload failed: ${response.status} ${response.statusText}`
        );
      }

      const responseText = await response
        .text()
        .catch(() => "Unable to read response");
      this.originalConsole.log("📄 Success response body:", responseText);
    } catch (error) {
      this.originalConsole.error("🔥 HTTP Request failed:", error);
      throw error;
    }
  }

  /**
   * Get current log count (for debugging)
   */
  getLogCount(): number {
    return this.logs.length;
  }

  /**
   * Get captured logs for processing (without uploading)
   */
  getLogs(): LogEntry[] {
    return [...this.logs]; // Return a copy to prevent external modification
  }

  /**
   * Manually flush logs (for testing)
   */
  async flush(): Promise<void> {
    await this.uploadLogs();
  }
}

// Global log capture instance
let globalLogCapture: LogCapture | null = null;

/**
 * Initialize global log capture
 */
export function initializeLogCapture(config?: LogCaptureConfig): LogCapture {
  if (globalLogCapture) {
    globalLogCapture.stopCapture();
  }

  globalLogCapture = new LogCapture(config);
  globalLogCapture.startCapture();
  return globalLogCapture;
}

/**
 * Get the global log capture instance
 */
export function getLogCapture(): LogCapture | null {
  return globalLogCapture;
}

/**
 * Set context for log uploads
 */
export function setLogContext(context: {
  runId?: string;
  deployId?: string;
  deliveryId?: string;
  subscriptionActivityId?: string;
  authorizerActivityId?: string;
}): void {
  if (globalLogCapture) {
    globalLogCapture.setContext(context);
  }
}

/**
 * Clear log context
 */
export function clearLogContext(): void {
  if (globalLogCapture) {
    globalLogCapture.clearContext();
  }
}

/**
 * Stop log capture and cleanup
 */
export function stopLogCapture(): void {
  if (globalLogCapture) {
    globalLogCapture.stopCapture();
    globalLogCapture = null;
    console.log("✅ Log capture system completely stopped and cleaned up");
  } else {
    console.log("⚠️  No log capture system to stop");
  }
}

export { LogCapture };
export type { LogEntry, LogUploadPayload, LogCaptureConfig };
