export interface HandlerEvent {
  operation: "deploy" | "health" | "registry-export" | "registry-stats";
  payload?: any;
}

export interface HandlerResponse {
  success: boolean;
  data?: any;
  error?: string;
  stats?: any;
}

export interface HandlerContext {
  remainingTimeMs?: number;
  memoryLimitMB?: string;
  functionName?: string;
  requestId?: string;
  [key: string]: any;
}

export type DirectHandler = (
  event: HandlerEvent,
  context: HandlerContext
) => Promise<HandlerResponse>;

// Individual handler function types
export type HealthHandler = (
  context?: HandlerContext
) => Promise<HandlerResponse>;
export type RegistryExportHandler = () => Promise<HandlerResponse>;
export type RegistryStatsHandler = () => Promise<HandlerResponse>;
export type DeployHandler = (payload?: any) => Promise<HandlerResponse>;
