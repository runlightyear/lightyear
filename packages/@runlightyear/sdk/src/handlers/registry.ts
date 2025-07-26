import { exportRegistry, getRegistryStats } from "../registry";
import type {
  HandlerResponse,
  RegistryExportHandler,
  RegistryStatsHandler,
} from "./types";

export const handleRegistryExport: RegistryExportHandler =
  async (): Promise<HandlerResponse> => {
    const exported = exportRegistry();

    return {
      success: true,
      data: exported,
      stats: {
        totalItems: exported.items.length,
        exportedAt: new Date().toISOString(),
      },
    };
  };

export const handleRegistryStats: RegistryStatsHandler =
  async (): Promise<HandlerResponse> => {
    const stats = getRegistryStats();

    return {
      success: true,
      data: {
        ...stats,
        createdAt: new Date().toISOString(),
      },
    };
  };
