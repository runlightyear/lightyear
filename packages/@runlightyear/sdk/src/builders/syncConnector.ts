import type { CollectionWithSchema, ExtractModelTypes } from "./schemaTypes";
import type { Collection } from "../types";
import { RestConnector } from "../connectors/RestConnector";
import { createArrayValidator, validateWithSchema, type ValidationResult } from "./schemaValidation";

export interface SyncOptions<T> {
  endpoint: string;
  method?: "GET" | "POST";
  params?: Record<string, any>;
  headers?: Record<string, string>;
  responseMapping?: (response: any) => T[];
  validateResponse?: boolean; // Enable/disable validation (default: true)
}

export interface SyncResult<T> {
  data: T[];
  success: boolean;
  error?: Error;
  validationErrors?: Array<{
    index?: number;
    path: string;
    message: string;
  }>;
  metadata?: {
    count: number;
    timestamp: Date;
    validRecords?: number;
    invalidRecords?: number;
  };
}

export class SyncConnectorBuilder<TCollection extends CollectionWithSchema<any> = never> {
  private name: string;
  private baseUrl?: string;
  private headers: Record<string, string> = {};
  private collection?: TCollection;
  private syncMethods: Map<string, SyncOptions<any>> = new Map();
  private restConnector?: RestConnector;

  constructor(name: string) {
    this.name = name;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  withBaseUrl(baseUrl: string): this {
    this.baseUrl = baseUrl;
    return this;
  }

  withHeaders(headers: Record<string, string>): this {
    this.headers = { ...headers };
    return this;
  }

  addHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  withCollection<T extends CollectionWithSchema<any>>(
    collection: T
  ): SyncConnectorBuilder<T> {
    (this as any).collection = collection;
    return this as any;
  }

  defineSyncMethod<TModel extends keyof ExtractModelTypes<TCollection>>(
    modelName: TModel,
    options: SyncOptions<ExtractModelTypes<TCollection>[TModel]>
  ): this {
    if (!this.collection) {
      throw new Error("Collection must be set before defining sync methods");
    }

    const model = (this.collection as any).models[modelName];
    if (!model) {
      throw new Error(`Model '${String(modelName)}' not found in collection`);
    }

    this.syncMethods.set(String(modelName), options);
    return this;
  }

  deploy(): SyncConnector<TCollection> {
    if (!this.baseUrl) {
      throw new Error("Base URL is required for sync connector");
    }

    if (!this.collection) {
      throw new Error("Collection is required for sync connector");
    }

    this.restConnector = new RestConnector({
      baseUrl: this.baseUrl,
      headers: this.headers,
    });

    return new SyncConnector(
      this.name,
      this.collection,
      this.syncMethods,
      this.restConnector
    );
  }
}

export class SyncConnector<TCollection extends CollectionWithSchema<any>> {
  constructor(
    private name: string,
    private collection: TCollection,
    private syncMethods: Map<string, SyncOptions<any>>,
    private restConnector: RestConnector
  ) {}

  async syncModel<TModel extends keyof ExtractModelTypes<TCollection>>(
    modelName: TModel
  ): Promise<SyncResult<ExtractModelTypes<TCollection>[TModel]>> {
    const options = this.syncMethods.get(String(modelName));
    if (!options) {
      throw new Error(`No sync method defined for model '${String(modelName)}'`);
    }

    const model = (this.collection as any).models[modelName];
    if (!model) {
      throw new Error(`Model '${String(modelName)}' not found in collection`);
    }

    try {
      const response = await this.restConnector.request({
        url: options.endpoint,
        method: options.method || "GET",
        params: options.params,
        headers: options.headers,
      });

      let data = options.responseMapping
        ? options.responseMapping(response.data)
        : response.data;

      // Ensure data is an array
      if (!Array.isArray(data)) {
        data = [data];
      }

      // Validate response if enabled (default: true)
      if (options.validateResponse !== false && model.schema) {
        const validData: ExtractModelTypes<TCollection>[TModel][] = [];
        const validationErrors: Array<{
          index?: number;
          path: string;
          message: string;
        }> = [];

        // Validate each item in the array
        data.forEach((item: any, index: number) => {
          const validation = validateWithSchema<ExtractModelTypes<TCollection>[TModel]>(
            item,
            model.schema
          );

          if (validation.success && validation.data) {
            validData.push(validation.data);
          } else if (validation.errors) {
            validation.errors.forEach(error => {
              validationErrors.push({
                index,
                path: error.path,
                message: error.message,
              });
            });
          }
        });

        return {
          data: validData,
          success: true,
          validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
          metadata: {
            count: data.length,
            timestamp: new Date(),
            validRecords: validData.length,
            invalidRecords: data.length - validData.length,
          },
        };
      }

      // No validation - return data as is
      return {
        data,
        success: true,
        metadata: {
          count: Array.isArray(data) ? data.length : 0,
          timestamp: new Date(),
        },
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error as Error,
        metadata: {
          count: 0,
          timestamp: new Date(),
        },
      };
    }
  }

  async syncAll(): Promise<
    Record<keyof ExtractModelTypes<TCollection>, SyncResult<any>>
  > {
    const results: any = {};

    for (const modelName of this.syncMethods.keys()) {
      results[modelName] = await this.syncModel(modelName as any);
    }

    return results;
  }

  getCollection(): TCollection {
    return this.collection;
  }

  getName(): string {
    return this.name;
  }
}

export function defineSyncConnector(name: string): SyncConnectorBuilder {
  return new SyncConnectorBuilder(name);
}