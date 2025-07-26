import { exportRegistry, getRegistryStats } from "../registry";
import type { HandlerResponse } from "./types";

export async function handleRegistryExport(): Promise<HandlerResponse> {
  const exported = exportRegistry();

  return {
    success: true,
    data: exported,
    stats: {
      totalItems: exported.items.length,
      exportedAt: exported.exportedAt,
    },
  };
}

export async function handleRegistryStats(): Promise<HandlerResponse> {
  const stats = getRegistryStats();

  return {
    success: true,
    data: stats,
  };
}
