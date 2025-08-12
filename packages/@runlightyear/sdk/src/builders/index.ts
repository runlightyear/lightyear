/**
 * Builders module - Re-exports all builder classes and helpers
 */

// Model builder
export { ModelBuilder, defineModel } from "./model";

// Collection builder
export { CollectionBuilder, defineCollection } from "./collection";

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
export { OAuthConnectorBuilder, defineOAuthConnector } from "./oauth";

// REST connector builder
export { RestConnectorBuilder, defineRestConnector } from "./restConnector";

// Sync connector builder
export { SyncConnectorBuilder, SyncConnector, defineSyncConnector } from "./syncConnector";
export type { SyncOptions, SyncResult } from "./syncConnector";

// Enhanced sync connector builder
export { 
  EnhancedSyncConnectorBuilder, 
  EnhancedSyncConnector, 
  defineEnhancedSyncConnector 
} from "./enhancedSyncConnector";
export type { 
  ModelConnectorConfig,
  PaginationParams,
  PaginatedResponse,
  SyncOperation,
  SyncChange
} from "./enhancedSyncConnector";

// New sync connector (v2)
export { 
  SyncConnectorBuilder,
  ModelConnector,
  createSyncConnector,
  PaginationStrategies 
} from "./syncConnector2";
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
} from "./syncConnector2";

// Match pattern helpers
export { match } from "./match";

// Typed collection and model builders
export { 
  TypedCollectionBuilder, 
  TypedModelBuilder,
  defineTypedCollection,
  defineTypedModel
} from "./typedCollection";

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
