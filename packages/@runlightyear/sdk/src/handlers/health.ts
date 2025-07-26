import type { HandlerResponse, HandlerContext } from "./types";

export async function handleHealth(
  context: HandlerContext
): Promise<HandlerResponse> {
  return {
    success: true,
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      remainingTimeMs: context.remainingTimeMs,
      memoryLimitMB: context.memoryLimitMB,
      runtime: process.version,
      nodeEnv: process.env.NODE_ENV,
      requestId: context.requestId,
    },
  };
}
