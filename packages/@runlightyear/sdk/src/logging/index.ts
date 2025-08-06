// Log capture system
export {
  LogCapture,
  initializeLogCapture,
  getLogCapture,
  setLogContext,
  clearLogContext,
  stopLogCapture,
  getCurrentContext,
} from "./logCapture";
export type {
  LogEntry,
  LogUploadPayload,
  LogCaptureConfig,
} from "./logCapture";
