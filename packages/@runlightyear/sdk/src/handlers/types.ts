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
