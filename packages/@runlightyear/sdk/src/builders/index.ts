/**
 * Builders module - Re-exports all builder classes and helpers
 */

// Collection and Model builders
export { CollectionBuilder, ModelBuilder, defineCollection, defineModel } from "./collection";

// Custom App builder
export {
  CustomAppBuilder,
  defineCustomApp,
  defineOAuth2CustomApp,
  defineApiKeyCustomApp,
  defineBasicCustomApp,
} from "./customApp";

// Integration builder
export { IntegrationBuilder, defineIntegration } from "./integration";

// Action builder
export { ActionBuilder, defineAction } from "./action";

// OAuth connector builder
export { OAuthConnectorBuilder, createOAuthConnector } from "./oauth";

// REST connector builder
export { RestConnectorBuilder, createRestConnector } from "./restConnector";

// Sync connector builder
export { 
  SyncConnectorBuilder,
  SyncConnector,
  ModelConnector,
  createSyncConnector,
  createListConfig,
  PaginationStrategies 
} from "./syncConnector";
export type {
  Pagination,
  PagePagination,
  CursorPagination,
  OffsetPagination,
  PaginationStrategy,
  ListResponse,
  BulkResponse,
  ListConfig,
  CreateConfig,
  UpdateConfig,
  DeleteConfig,
  BulkConfig
} from "./syncConnector";

// Match pattern helpers
export { match } from "./match";


// Schema type inference utilities
export type { 
  ExtractSchemaType,
  ModelWithSchema,
  CollectionWithSchema,
  ExtractModelTypes
} from "./schemaTypes";

// Schema validation utilities
export { 
  jsonSchemaToZod,
  createArrayValidator,
  validateWithSchema
} from "./schemaValidation";
export type { ValidationResult } from "./schemaValidation";
