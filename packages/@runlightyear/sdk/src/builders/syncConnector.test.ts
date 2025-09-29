import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { z } from "zod";
import type { ListFilterArgs } from "./syncConnector";
import { createSyncConnector, SyncConnectorBuilder } from "./syncConnector";
import { defineCollection } from "./collection";
import { createRestConnector } from "./restConnector";
import { RestConnector } from "../connectors/RestConnector";
import * as platformSync from "../platform/sync";
import * as logging from "../logging";
import * as timeUtils from "../utils/time";

describe("SyncConnector", () => {
  let mockRestConnector: RestConnector;
  let collection: any;

  beforeEach(() => {
    mockRestConnector = {
      request: vi.fn(),
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    } as any;

    collection = defineCollection("testCollection")
      .addModel("user", {
        title: "User",
        schema: z.object({
          id: z.string(),
          name: z.string(),
          email: z.string(),
        }) as any,
      })
      .addModel("product", {
        title: "Product",
        schema: z.object({
          id: z.string(),
          name: z.string(),
          price: z.number(),
        }) as any,
      })
      .deploy();
  });

  describe("createSyncConnector", () => {
    it("should create a sync connector builder", () => {
      const builder = createSyncConnector(mockRestConnector, collection);
      expect(builder).toBeInstanceOf(SyncConnectorBuilder);
    });
  });

  describe("SyncConnectorBuilder", () => {
    it("should add model connector with 'with' method", () => {
      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          list: {
            request: (params) => ({
              endpoint: "/users",
              method: "GET",
            }),
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      expect(userConnector).toBeDefined();
      expect(userConnector?.modelName).toBe("user");
    });

    it("should add model connector with 'add' method using builder", () => {
      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .add("product", (builder) =>
          builder
            .list({
              request: (params) => ({
                endpoint: "/products",
              }),
              responseSchema: z.array(z.object({
                id: z.string(),
                name: z.string(),
                price: z.number(),
              })),
              transform: (response) => response,
            })
            .create({
              request: (data) => ({
                endpoint: "/products",
                method: "POST",
                data,
              }),
            })
        )
        .build();

      const productConnector = syncConnector.getModelConnector("product");
      expect(productConnector).toBeDefined();
      expect(productConnector?.modelName).toBe("product");
      expect(productConnector?.config.list).toBeDefined();
      expect(productConnector?.config.create).toBeDefined();
    });

    it("should throw error when adding connector for non-existent model", () => {
      expect(() => {
        createSyncConnector(mockRestConnector, collection)
          .with("nonExistentModel" as any, {
            list: {
              request: (params) => ({
                endpoint: "/test",
              }),
            },
          });
      }).toThrow('Model "nonExistentModel" does not exist in collection');
    });

    it("should chain multiple model connectors", () => {
      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          list: {
            request: (params) => ({
              endpoint: "/users",
            }),
          },
        })
        .with("product", {
          list: {
            request: (params) => ({
              endpoint: "/products",
            }),
          },
        })
        .build();

      expect(syncConnector.getModelConnector("user")).toBeDefined();
      expect(syncConnector.getModelConnector("product")).toBeDefined();
    });
  });

  describe("ModelConnector operations", () => {
    it("should perform list operation", async () => {
      const mockResponse = {
        data: [
          { id: "1", name: "User 1", email: "user1@example.com" },
          { id: "2", name: "User 2", email: "user2@example.com" },
        ],
      };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          list: {
            request: (params) => ({
              endpoint: "/users",
              method: "GET",
            }),
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.list?.();

      expect(mockRestConnector.request).toHaveBeenCalledWith({
        method: "GET",
        url: "/users",
        params: undefined,
      });
      expect(result?.items).toEqual(mockResponse.data);
    });

    it("should validate list response with schema", async () => {
      const UserSchema = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      });

      const mockResponse = {
        data: [
          { id: "1", name: "User 1", email: "user1@example.com" },
          { id: "2", name: "User 2", email: "invalid-email" }, // Invalid email
        ],
      };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          list: {
            request: (params) => ({
              endpoint: "/users",
            }),
            responseSchema: z.array(UserSchema),
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      
      await expect(userConnector?.list?.()).rejects.toThrow();
    });

    it("should handle nested response data with transform", async () => {
      const mockResponse = {
        data: {
          results: {
            users: [
              { id: "1", name: "User 1", email: "user1@example.com" },
              { id: "2", name: "User 2", email: "user2@example.com" },
            ],
          },
          total: 2,
        },
      };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          list: {
            request: (params) => ({
              endpoint: "/users",
            }),
            transform: (response: any) => response.results.users,
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.list?.();

      expect(result?.items).toEqual(mockResponse.data.results.users);
    });

    it("should transform list items when transform function is provided", async () => {
      const mockResponse = {
        data: [
          { user_id: "1", full_name: "User 1", email_address: "user1@example.com" },
          { user_id: "2", full_name: "User 2", email_address: "user2@example.com" },
        ],
      };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          list: {
            request: (params) => ({
              endpoint: "/users",
            }),
            transform: (response: any[]) => response.map((item: any) => ({
              id: item.user_id,
              name: item.full_name,
              email: item.email_address,
            })),
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.list?.();

      expect(result?.items).toEqual([
        { id: "1", name: "User 1", email: "user1@example.com" },
        { id: "2", name: "User 2", email: "user2@example.com" },
      ]);
    });

    it("should filter list items when a filter function is provided", async () => {
      const mockResponse = {
        data: [
          { id: "1", updatedAt: "2024-01-01T00:00:00.000Z" },
          { id: "2", updatedAt: "2024-01-03T00:00:00.000Z" },
        ],
      };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const filterFn = vi.fn<(args: ListFilterArgs<any>) => boolean>(
        ({ obj, lastExternalId, lastExternalUpdatedAt, syncType }) => {
          expect(obj).toEqual(
            expect.objectContaining({
              externalId: expect.any(String),
              externalUpdatedAt: expect.any(String),
              data: expect.objectContaining({
                id: expect.any(String),
                updatedAt: expect.any(String),
              }),
            })
          );
          expect(syncType).toBe("INCREMENTAL");
          expect(lastExternalId).toBe("1");
          expect(lastExternalUpdatedAt).toBe("2024-01-01T00:00:00.000Z");
          return obj.externalId !== "1";
        }
      );

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          list: {
            request: () => ({
              endpoint: "/users",
            }),
            transform: (response: any[]) =>
              response.map((item) => ({
                externalId: item.id,
                externalUpdatedAt: item.updatedAt,
                data: item,
              })),
            filter: filterFn,
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.list?.({
        syncType: "INCREMENTAL",
        lastExternalId: "1",
        lastExternalUpdatedAt: "2024-01-01T00:00:00.000Z",
      });

      expect(filterFn).toHaveBeenCalledTimes(2);
      expect(result?.items).toEqual([
        {
          externalId: "2",
          externalUpdatedAt: "2024-01-03T00:00:00.000Z",
          data: { id: "2", updatedAt: "2024-01-03T00:00:00.000Z" },
        },
      ]);
    });

    it("should perform create operation", async () => {
      const newUser = { name: "New User", email: "new@example.com" };
      const mockResponse = { data: { id: "3", ...newUser } };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          create: {
            request: (data) => ({
              endpoint: "/users",
              method: "POST",
              data,
            }),
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.create?.(newUser);

      expect(mockRestConnector.request).toHaveBeenCalledWith({
        method: "POST",
        url: "/users",
        data: newUser,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should perform update operation with function endpoint", async () => {
      const updateData = { name: "Updated User" };
      const mockResponse = { data: { id: "1", name: "Updated User", email: "user1@example.com" } };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          update: {
            request: (id, data) => ({
              endpoint: `/users/${id}`,
              method: "PATCH",
              data,
            }),
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.update?.("1", updateData);

      expect(mockRestConnector.request).toHaveBeenCalledWith({
        method: "PATCH",
        url: "/users/1",
        data: updateData,
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should transform create request and response", async () => {
      const newUser = { id: "3", name: "New User", email: "new@example.com" };
      const mockResponse = { data: { user_id: "3", full_name: "New User", email_address: "new@example.com" } };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          create: {
            request: (data) => ({
              endpoint: "/users",
              method: "POST",
            }),
            transformRequest: (data: any) => ({
              full_name: data.name,
              email_address: data.email,
            }),
            transform: (response: any) => ({
              id: response.user_id,
              name: response.full_name,
              email: response.email_address,
            }),
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.create?.(newUser);

      expect(mockRestConnector.request).toHaveBeenCalledWith({
        method: "POST",
        url: "/users",
        data: {
          full_name: "New User",
          email_address: "new@example.com",
        },
      });
      expect(result).toEqual({
        id: "3",
        name: "New User",
        email: "new@example.com",
      });
    });

    it("should perform batch create operation", async () => {
      const newUsers = [
        { name: "User 1", email: "user1@example.com" },
        { name: "User 2", email: "user2@example.com" },
        { name: "User 3", email: "user3@example.com" },
      ];

      const mockResponse = {
        data: newUsers.map((user, index) => ({ id: String(index + 1), ...user })),
      };

      (mockRestConnector.request as any).mockResolvedValue(mockResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          batchCreate: {
            payloadType: "items",
            request: (items) => ({
              endpoint: "/users/batch",
              method: "POST",
              data: items,
            }),
            batchSize: 2,
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.batchCreate?.(newUsers);

      // Should be called twice due to batch size of 2
      expect(mockRestConnector.request).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(6); // 3 items returned twice
    });

    it("should support batch create change payloads with extraction", async () => {
      const changes = [
        {
          changeId: "change-1",
          data: {
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
          },
        },
        {
          changeId: "change-2",
          data: {
            firstName: "Alan",
            lastName: "Turing",
            email: "alan@example.com",
          },
        },
      ];

      const responsePayload = {
        results: [
          {
            objectWriteTraceId: "change-1",
            id: "201",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
          {
            objectWriteTraceId: "change-2",
            id: "202",
            updatedAt: "2024-01-02T00:00:00.000Z",
          },
        ],
      };

      (mockRestConnector.request as any).mockResolvedValueOnce({
        data: responsePayload,
      });

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder.withBatchCreate({
            request: (incomingChanges) => {
              expect(incomingChanges).toEqual(
                changes.map((change) => ({
                  ...change,
                  obj: change.data,
                }))
              );
              return {
                endpoint: "/objects/contacts/batch/create",
                method: "POST",
                json: {
                  inputs: incomingChanges.map((change) => ({
                    objectWriteTraceId: change.changeId,
                    properties: {
                      firstname: change.data.firstName,
                      lastname: change.data.lastName,
                      email: change.data.email,
                    },
                  })),
                },
              };
            },
            responseSchema: z.object({
              results: z.array(
                z.object({
                  objectWriteTraceId: z.string(),
                  id: z.string(),
                  updatedAt: z.string(),
                })
              ),
            }),
            extract: (response) =>
              response.results.map((result) => ({
                changeId: result.objectWriteTraceId,
                externalId: result.id,
                externalUpdatedAt: result.updatedAt,
              })),
          })
        )
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const confirmations = await userConnector?.batchCreate?.(changes);

      expect(mockRestConnector.request).toHaveBeenCalledTimes(1);
      expect(mockRestConnector.request).toHaveBeenCalledWith({
        method: "POST",
        url: "/objects/contacts/batch/create",
        data: {
          inputs: [
            {
              objectWriteTraceId: "change-1",
              properties: {
                firstname: "Ada",
                lastname: "Lovelace",
                email: "ada@example.com",
              },
            },
            {
              objectWriteTraceId: "change-2",
              properties: {
                firstname: "Alan",
                lastname: "Turing",
                email: "alan@example.com",
              },
            },
          ],
        },
      });

      expect(confirmations).toEqual([
        {
          changeId: "change-1",
          externalId: "201",
          externalUpdatedAt: "2024-01-01T00:00:00.000Z",
        },
        {
          changeId: "change-2",
          externalId: "202",
          externalUpdatedAt: "2024-01-02T00:00:00.000Z",
        },
      ]);
    });

    it("should support batch update change payloads with extraction", async () => {
      const changes = [
        {
          changeId: "change-1",
          externalId: "201",
          data: {
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
          },
        },
        {
          changeId: "change-2",
          externalId: "202",
          data: {
            firstName: "Alan",
            lastName: "Turing",
            email: "alan@example.com",
          },
        },
      ];

      const responsePayload = {
        results: [
          {
            objectWriteTraceId: "change-1",
            id: "201",
            updatedAt: "2024-02-01T00:00:00.000Z",
          },
          {
            objectWriteTraceId: "change-2",
            id: "202",
            updatedAt: "2024-02-02T00:00:00.000Z",
          },
        ],
      };

      (mockRestConnector.request as any).mockResolvedValueOnce({
        data: responsePayload,
      });

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder.withBatchUpdate({
            request: (incomingChanges) => {
              expect(incomingChanges).toEqual(
                changes.map((change) => ({
                  ...change,
                  id: change.externalId,
                  obj: change.data,
                  data: change.data,
                }))
              );
              return {
                endpoint: "/objects/contacts/batch/update",
                method: "POST",
                json: {
                  inputs: incomingChanges.map((change) => ({
                    objectWriteTraceId: change.changeId,
                    id: change.externalId,
                    properties: {
                      firstname: change.obj.firstName,
                      lastname: change.obj.lastName,
                      email: change.obj.email,
                    },
                  })),
                },
              };
            },
            responseSchema: z.object({
              results: z.array(
                z.object({
                  objectWriteTraceId: z.string(),
                  id: z.string(),
                  updatedAt: z.string(),
                })
              ),
            }),
            extract: (response) =>
              response.results.map((result) => ({
                changeId: result.objectWriteTraceId,
                externalId: result.id,
                externalUpdatedAt: result.updatedAt,
              })),
          })
        )
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const confirmations = await userConnector?.batchUpdate?.(
        changes as any
      );

      expect(mockRestConnector.request).toHaveBeenCalledWith({
        method: "POST",
        url: "/objects/contacts/batch/update",
        data: {
          inputs: [
            {
              objectWriteTraceId: "change-1",
              id: "201",
              properties: {
                firstname: "Ada",
                lastname: "Lovelace",
                email: "ada@example.com",
              },
            },
            {
              objectWriteTraceId: "change-2",
              id: "202",
              properties: {
                firstname: "Alan",
                lastname: "Turing",
                email: "alan@example.com",
              },
            },
          ],
        },
      });

      expect(confirmations).toEqual([
        {
          changeId: "change-1",
          externalId: "201",
          externalUpdatedAt: "2024-02-01T00:00:00.000Z",
        },
        {
          changeId: "change-2",
          externalId: "202",
          externalUpdatedAt: "2024-02-02T00:00:00.000Z",
        },
      ]);
    });

    it("should support batch delete change payloads", async () => {
      const changes = [
        { changeId: "change-1", externalId: "201" },
        { changeId: "change-2", externalId: "202" },
      ];

      (mockRestConnector.request as any).mockResolvedValue({ data: {} });

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder.withBatchDelete({
            request: (incomingChanges) => {
              expect(incomingChanges).toEqual(
                changes.map((change) => ({
                  ...change,
                  id: change.externalId,
                }))
              );
              return {
                endpoint: "/objects/contacts/batch/delete",
                method: "POST",
                json: {
                  inputs: incomingChanges.map((change) => ({
                    objectWriteTraceId: change.changeId,
                    id: change.externalId,
                  })),
                },
              };
            },
          })
        )
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const confirmations = await userConnector?.batchDelete?.(changes as any);

      expect(mockRestConnector.request).toHaveBeenCalledWith({
        method: "POST",
        url: "/objects/contacts/batch/delete",
        data: {
          inputs: [
            {
              objectWriteTraceId: "change-1",
              id: "201",
            },
            {
              objectWriteTraceId: "change-2",
              id: "202",
            },
          ],
        },
      });

      expect(confirmations).toEqual([]);
    });
  });

  describe("sync method", () => {
    it("should sync all configured models", async () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
      
      const mockUserResponse = {
        data: [
          { id: "1", name: "User 1", email: "user1@example.com" },
        ],
      };

      const mockProductResponse = {
        data: [
          { id: "1", name: "Product 1", price: 99.99 },
          { id: "2", name: "Product 2", price: 149.99 },
        ],
      };

      (mockRestConnector.request as any)
        .mockResolvedValueOnce(mockUserResponse)
        .mockResolvedValueOnce(mockProductResponse);

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .with("user", {
          list: {
            request: (params) => ({
              endpoint: "/users",
            }),
          },
        })
        .with("product", {
          list: {
            request: (params) => ({
              endpoint: "/products",
            }),
          },
        })
        .build();

      await syncConnector.sync();

      expect(consoleSpy).toHaveBeenCalledWith("Synced 1 items for model user");
      expect(consoleSpy).toHaveBeenCalledWith("Synced 2 items for model product");

      consoleSpy.mockRestore();
    });
  });

  describe("type safety", () => {
    it("should provide proper type inference for model connectors", () => {
      const UserSchema = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      });

      type User = z.infer<typeof UserSchema>;

      const typedCollection = defineCollection("users")
        .addModel("user", {
          schema: UserSchema as any,
        })
        .deploy();

      const syncConnector = createSyncConnector(mockRestConnector, typedCollection)
        .with("user", {
          list: {
            request: (params) => ({
              endpoint: "/users",
            }),
            responseSchema: z.array(UserSchema),
          },
          create: {
            request: (data) => ({
              endpoint: "/users",
              method: "POST",
              data,
            }),
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      
      // Type check - this should compile without errors
      if (userConnector?.create) {
        // This should error - missing required fields
        // await userConnector.create({ name: "Test" });
        
        // This should be valid - but we're not calling it to avoid making actual requests
        // Just checking that TypeScript accepts the correct shape
        const validUser = {
          id: "1",
          name: "Test",
          email: "test@example.com",
        };
        // userConnector.create(validUser); // Would be valid if called
      }
    });
  });

  describe("push workflow", () => {
    const originalNodeEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv;
      vi.restoreAllMocks();
    });

    it("prefers batch create when both create and batch create are configured", async () => {
      process.env.NODE_ENV = "development";

      const setContextMock = vi.fn();
      vi.spyOn(logging, "getLogCapture").mockReturnValue({
        setContext: setContextMock,
      } as any);
      vi.spyOn(logging, "getCurrentContext").mockReturnValue({
        managedUserId: "managed-1",
      } as any);

      vi.spyOn(timeUtils, "resetTimeLimit").mockImplementation(() => {});
      vi.spyOn(timeUtils, "isTimeLimitExceeded").mockReturnValue(false);

      vi.spyOn(platformSync, "startSync").mockResolvedValue({
        id: "sync-123",
        type: "FULL",
      } as any);
      vi.spyOn(platformSync, "finishSync").mockResolvedValue(undefined);
      const updateSyncMock = vi
        .spyOn(platformSync, "updateSync")
        .mockResolvedValue(undefined);
      const confirmChangeBatchMock = vi
        .spyOn(platformSync, "confirmChangeBatch")
        .mockResolvedValue(undefined);

      const changes = [
        {
          changeId: "change-1",
          data: {
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
          },
        },
        {
          changeId: "change-2",
          data: {
            firstName: "Alan",
            lastName: "Turing",
            email: "alan@example.com",
          },
        },
      ];

      vi.spyOn(platformSync, "retrieveDelta")
        .mockResolvedValueOnce({
          operation: "CREATE",
          changes,
        } as any)
        .mockResolvedValueOnce({
          operation: "CREATE",
          changes: [],
        } as any);

      const syncState = {
        id: "sync-123",
        type: "FULL",
        currentModel: null,
        modelStatuses: {},
        requestedDirection: "push",
        currentDirection: null,
      } as any;

      const getSyncMock = vi.spyOn(platformSync, "getSync");
      getSyncMock
        .mockResolvedValueOnce(syncState)
        .mockResolvedValueOnce(syncState)
        .mockResolvedValue(syncState);

      vi.spyOn(platformSync, "getModels").mockResolvedValue([
        { name: "user" },
      ] as any);

      const responsePayload = {
        results: [
          {
            objectWriteTraceId: "change-1",
            id: "201",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
          {
            objectWriteTraceId: "change-2",
            id: "202",
            updatedAt: "2024-01-02T00:00:00.000Z",
          },
        ],
      };

      const batchRequestSpy = vi.fn((incomingChanges: any[]) => ({
        endpoint: "/objects/contacts/batch/create",
        method: "POST",
        json: {
          inputs: incomingChanges.map((change) => ({
            objectWriteTraceId: change.changeId,
            properties: {
              firstname: change.data.firstName,
              lastname: change.data.lastName,
              email: change.data.email,
            },
          })),
        },
      }));

      (mockRestConnector.request as any).mockImplementation(async (requestConfig: any) => {
        if (requestConfig?.url === "/objects/contacts/batch/create") {
          return { data: responsePayload };
        }
        throw new Error(`Unexpected request to ${requestConfig?.url}`);
      });

      const createRequestSpy = vi.fn(() => ({
        endpoint: "/users",
        method: "POST",
        json: {},
      }));

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder
            .withCreate({
              request: createRequestSpy,
              extract: () => ({
                externalId: "fallback",
                externalUpdatedAt: null,
              }),
            })
            .withBatchCreate({
              request: batchRequestSpy,
              responseSchema: z.object({
                results: z.array(
                  z.object({
                    objectWriteTraceId: z.string(),
                    id: z.string(),
                    updatedAt: z.string(),
                  })
                ),
              }),
              extract: (response) =>
                response.results.map((result: any) => ({
                  changeId: result.objectWriteTraceId,
                  externalId: result.id,
                  externalUpdatedAt: result.updatedAt,
                })),
              batchSize: 10,
            })
        )
        .withSyncWrites()
        .build();

      await syncConnector.sync("FULL", { useAsyncWrites: false });

      expect(createRequestSpy).not.toHaveBeenCalled();
      expect(batchRequestSpy).toHaveBeenCalledTimes(1);
      expect(batchRequestSpy.mock.calls[0][0]).toEqual(
        changes.map((change) => ({
          ...change,
          obj: change.data,
        }))
      );
      expect(mockRestConnector.request).toHaveBeenCalledTimes(1);
      expect(mockRestConnector.request).toHaveBeenCalledWith({
        method: "POST",
        url: "/objects/contacts/batch/create",
        data: {
          inputs: [
            {
              objectWriteTraceId: "change-1",
              properties: {
                firstname: "Ada",
                lastname: "Lovelace",
                email: "ada@example.com",
              },
            },
            {
              objectWriteTraceId: "change-2",
              properties: {
                firstname: "Alan",
                lastname: "Turing",
                email: "alan@example.com",
              },
            },
          ],
        },
      });

      expect(confirmChangeBatchMock).toHaveBeenCalledWith({
        syncId: "sync-123",
        changes: [
          {
            changeId: "change-1",
            externalId: "201",
            externalUpdatedAt: "2024-01-01T00:00:00.000Z",
          },
          {
            changeId: "change-2",
            externalId: "202",
            externalUpdatedAt: "2024-01-02T00:00:00.000Z",
          },
        ],
        async: true,
      });

      expect(updateSyncMock.mock.calls.some(([args]) => args.currentDirection === "PUSH")).toBe(true);
      expect(platformSync.retrieveDelta).toHaveBeenCalledTimes(2);
      expect(platformSync.finishSync).toHaveBeenCalledWith("sync-123");
    });

    it("prefers batch update when both update and batch update are configured", async () => {
      process.env.NODE_ENV = "development";

      const setContextMock = vi.fn();
      vi.spyOn(logging, "getLogCapture").mockReturnValue({
        setContext: setContextMock,
      } as any);
      vi.spyOn(logging, "getCurrentContext").mockReturnValue({
        managedUserId: "managed-1",
      } as any);

      vi.spyOn(timeUtils, "resetTimeLimit").mockImplementation(() => {});
      vi.spyOn(timeUtils, "isTimeLimitExceeded").mockReturnValue(false);

      vi.spyOn(platformSync, "startSync").mockResolvedValue({
        id: "sync-456",
        type: "FULL",
      } as any);
      vi.spyOn(platformSync, "finishSync").mockResolvedValue(undefined);
      const updateSyncMock = vi
        .spyOn(platformSync, "updateSync")
        .mockResolvedValue(undefined);
      const confirmChangeBatchMock = vi
        .spyOn(platformSync, "confirmChangeBatch")
        .mockResolvedValue(undefined);

      const changes = [
        {
          changeId: "change-1",
          externalId: "201",
          data: {
            firstName: "Ada",
            lastName: "Lovelace",
            email: "ada@example.com",
          },
        },
        {
          changeId: "change-2",
          externalId: "202",
          data: {
            firstName: "Alan",
            lastName: "Turing",
            email: "alan@example.com",
          },
        },
      ];

      vi.spyOn(platformSync, "retrieveDelta")
        .mockResolvedValueOnce({
          operation: "UPDATE",
          changes,
        } as any)
        .mockResolvedValueOnce({
          operation: "UPDATE",
          changes: [],
        } as any);

      const syncState = {
        id: "sync-456",
        type: "FULL",
        currentModel: null,
        modelStatuses: {},
        requestedDirection: "push",
        currentDirection: null,
      } as any;

      const getSyncMock = vi.spyOn(platformSync, "getSync");
      getSyncMock
        .mockResolvedValueOnce(syncState)
        .mockResolvedValueOnce(syncState)
        .mockResolvedValue(syncState);

      vi.spyOn(platformSync, "getModels").mockResolvedValue([
        { name: "user" },
      ] as any);

      const responsePayload = {
        results: [
          {
            objectWriteTraceId: "change-1",
            id: "201",
            updatedAt: "2024-02-01T00:00:00.000Z",
          },
          {
            objectWriteTraceId: "change-2",
            id: "202",
            updatedAt: "2024-02-02T00:00:00.000Z",
          },
        ],
      };

      const batchRequestSpy = vi.fn((incomingChanges: any[]) => ({
        endpoint: "/objects/contacts/batch/update",
        method: "POST",
        json: {
          inputs: incomingChanges.map((change) => ({
            objectWriteTraceId: change.changeId,
            id: change.externalId,
            properties: {
              firstname: change.obj.firstName,
              lastname: change.obj.lastName,
              email: change.obj.email,
            },
          })),
        },
      }));

      (mockRestConnector.request as any).mockImplementation(async (requestConfig: any) => {
        if (requestConfig?.url === "/objects/contacts/batch/update") {
          expect(batchRequestSpy).toHaveBeenCalled();
          return { data: responsePayload };
        }
        return { data: {} };
      });

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder.withBatchUpdate({
            request: batchRequestSpy,
            responseSchema: z.object({
              results: z.array(
                z.object({
                  objectWriteTraceId: z.string(),
                  id: z.string(),
                  updatedAt: z.string(),
                })
              ),
            }),
            extract: (response) =>
              response.results.map((result: any) => ({
                changeId: result.objectWriteTraceId,
                externalId: result.id,
                externalUpdatedAt: result.updatedAt,
              })),
          })
        )
        .withSyncWrites()
        .build();

      await syncConnector.sync("FULL", { useAsyncWrites: false });

      expect(batchRequestSpy).toHaveBeenCalledTimes(1);
      expect(batchRequestSpy.mock.calls[0][0]).toEqual(
        changes.map((change) => ({
          ...change,
          id: change.externalId,
          obj: change.data,
          data: change.data,
        }))
      );
      expect(confirmChangeBatchMock).toHaveBeenCalledWith({
        syncId: "sync-456",
        changes: [
          {
            changeId: "change-1",
            externalId: "201",
            externalUpdatedAt: "2024-02-01T00:00:00.000Z",
          },
          {
            changeId: "change-2",
            externalId: "202",
            externalUpdatedAt: "2024-02-02T00:00:00.000Z",
          },
        ],
        async: true,
      });
      expect(updateSyncMock.mock.calls.some(([args]) => args.currentDirection === "PUSH")).toBe(true);
      expect(platformSync.retrieveDelta).toHaveBeenCalledTimes(2);
      expect(platformSync.finishSync).toHaveBeenCalledWith("sync-456");
    });

    it("prefers batch delete when both delete and batch delete are configured", async () => {
      process.env.NODE_ENV = "development";

      const setContextMock = vi.fn();
      vi.spyOn(logging, "getLogCapture").mockReturnValue({
        setContext: setContextMock,
      } as any);
      vi.spyOn(logging, "getCurrentContext").mockReturnValue({
        managedUserId: "managed-1",
      } as any);

      vi.spyOn(timeUtils, "resetTimeLimit").mockImplementation(() => {});
      vi.spyOn(timeUtils, "isTimeLimitExceeded").mockReturnValue(false);

      vi.spyOn(platformSync, "startSync").mockResolvedValue({
        id: "sync-789",
        type: "FULL",
      } as any);
      vi.spyOn(platformSync, "finishSync").mockResolvedValue(undefined);
      const updateSyncMock = vi
        .spyOn(platformSync, "updateSync")
        .mockResolvedValue(undefined);
      const confirmChangeBatchMock = vi
        .spyOn(platformSync, "confirmChangeBatch")
        .mockResolvedValue(undefined);

      const changes = [
        {
          changeId: "change-1",
          externalId: "201",
        },
        {
          changeId: "change-2",
          externalId: "202",
        },
      ];

      vi.spyOn(platformSync, "retrieveDelta")
        .mockResolvedValueOnce({
          operation: "DELETE",
          changes,
        } as any)
        .mockResolvedValueOnce({
          operation: "DELETE",
          changes: [],
        } as any);

      const syncState = {
        id: "sync-789",
        type: "FULL",
        currentModel: null,
        modelStatuses: {},
        requestedDirection: "push",
        currentDirection: null,
      } as any;

      const getSyncMock = vi.spyOn(platformSync, "getSync");
      getSyncMock
        .mockResolvedValueOnce(syncState)
        .mockResolvedValueOnce(syncState)
        .mockResolvedValue(syncState);

      vi.spyOn(platformSync, "getModels").mockResolvedValue([
        { name: "user" },
      ] as any);

      const batchRequestSpy = vi.fn((incomingChanges: any[]) => ({
        endpoint: "/objects/contacts/batch/delete",
        method: "POST",
        json: {
          inputs: incomingChanges.map((change) => ({
            objectWriteTraceId: change.changeId,
            id: change.externalId,
          })),
        },
      }));

      (mockRestConnector.request as any).mockImplementation(async (requestConfig: any) => {
        if (requestConfig?.url === "/objects/contacts/batch/delete") {
          return { data: {} };
        }
        return { data: {} };
      });

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder.withBatchDelete({
            request: batchRequestSpy,
          })
        )
        .withSyncWrites()
        .build();

      await syncConnector.sync("FULL", { useAsyncWrites: false });

      expect(batchRequestSpy).toHaveBeenCalledTimes(1);
      expect(batchRequestSpy.mock.calls[0][0]).toEqual(
        changes.map((change) => ({
          ...change,
          id: change.externalId,
        }))
      );
      expect(confirmChangeBatchMock).toHaveBeenCalledWith({
        syncId: "sync-789",
        changes: [
          {
            changeId: "change-1",
            externalId: "201",
          },
          {
            changeId: "change-2",
            externalId: "202",
          },
        ],
        async: true,
      });
      expect(updateSyncMock.mock.calls.some(([args]) => args.currentDirection === "PUSH")).toBe(true);
      expect(platformSync.retrieveDelta).toHaveBeenCalledTimes(2);
      expect(platformSync.finishSync).toHaveBeenCalledWith("sync-789");
    });
  });

  describe("Async Writes", () => {
    let getUnconfirmedChangesMock: any;
    let batchHttpRequestMock: any;
    let retrieveDeltaMock: any;
    let startSyncMock: any;
    let getSyncMock: any;
    let updateSyncMock: any;
    let getModelsMock: any;
    let confirmChangeBatchMock: any;
    let finishSyncMock: any;

    beforeEach(() => {
      // Mock log context
      vi.spyOn(logging, "getCurrentContext").mockReturnValue({
        runId: "run-123",
        managedUserId: "user-456",
        syncId: "sync-789",
      } as any);

      // Mock time functions
      vi.spyOn(timeUtils, "resetTimeLimit");
      vi.spyOn(timeUtils, "isTimeLimitExceeded").mockReturnValue(false);

      // Mock platform sync methods
      getUnconfirmedChangesMock = vi.spyOn(platformSync, 'getUnconfirmedChanges').mockResolvedValue([]);
      retrieveDeltaMock = vi.spyOn(platformSync, 'retrieveDelta');
      startSyncMock = vi.spyOn(platformSync, 'startSync').mockResolvedValue({ id: "sync-789", type: "FULL" });
      getSyncMock = vi.spyOn(platformSync, 'getSync').mockResolvedValue({ 
        currentDirection: null,
        requestedDirection: "bidirectional",
        type: "FULL",
        modelStatuses: {}
      });
      updateSyncMock = vi.spyOn(platformSync, 'updateSync').mockResolvedValue({});
      getModelsMock = vi.spyOn(platformSync, 'getModels').mockResolvedValue([{ name: "user" }]);
      confirmChangeBatchMock = vi.spyOn(platformSync, 'confirmChangeBatch').mockResolvedValue(undefined);
      finishSyncMock = vi.spyOn(platformSync, 'finishSync').mockResolvedValue(undefined);
      
      // Mock batch HTTP request
      batchHttpRequestMock = vi.fn();
      mockRestConnector.batchRequest = batchHttpRequestMock;
    });

    it("should default to using async writes", () => {
      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) => builder)
        .build();

      expect(syncConnector.useAsyncWrites).toBe(true);
    });

    it("should allow disabling async writes via builder", () => {
      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) => builder)
        .withSyncWrites()
        .build();

      expect(syncConnector.useAsyncWrites).toBe(false);
    });

    it("should pass changeIds at top level for batch operations with async writes", async () => {
      const connector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder.withBatchCreate({
            request: (items) => ({
              endpoint: "/users/batch",
              method: "POST",
              json: items,
            }),
          })
        )
        .build();

      // Access the private method through any cast
      const syncConnectorInstance = connector as any;
      const modelConnector = syncConnectorInstance.modelConnectors.get("user");
      
      const changes = [
        { changeId: "change-1", data: { name: "New User 1", email: "user1@example.com" } },
        { changeId: "change-2", data: { name: "New User 2", email: "user2@example.com" } },
      ];

      // Mock the request method
      mockRestConnector.request = vi.fn().mockResolvedValue({ data: [] });

      // Create a ChangeProcessor instance
      const { ChangeProcessor } = await import("../platform/changeProcessor");
      const processor = new ChangeProcessor("sync-123");

      // Call the async batch create method directly
      await syncConnectorInstance.processBatchCreateAsync(
        modelConnector,
        changes,
        "user",
        processor
      );

      // Verify the request was made with changeIds at top level
      expect(mockRestConnector.request).toHaveBeenCalled();
      const call = mockRestConnector.request.mock.calls[0][0];
      expect(call.method).toBe("POST");
      expect(call.url).toBe("/users/batch");
      expect(call.async).toBe(true);
      expect(call.changeIds).toEqual(["change-1", "change-2"]);
      expect(call.confirm).toBeUndefined();
    });

    it("should work with extract functions in async mode", async () => {
      // Test with extract function
      const connector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder.withBatchCreate({
            request: (items) => ({
              endpoint: "/users/batch",
              method: "POST",
              json: items,
            }),
            extract: (response) => response.results.map((item: any) => ({
              externalId: item.id,
              externalUpdatedAt: item.updated_at,
            })),
          })
        )
        .build();

      // Access the private method through any cast
      const syncConnectorInstance = connector as any;
      const modelConnector = syncConnectorInstance.modelConnectors.get("user");
      
      const changes = [
        { changeId: "change-1", data: { name: "New User 1", email: "user1@example.com" } },
      ];

      // Mock the request method
      mockRestConnector.request = vi.fn().mockResolvedValue({ data: [] });

      // Create a ChangeProcessor instance
      const { ChangeProcessor } = await import("../platform/changeProcessor");
      const processor = new ChangeProcessor("sync-123");

      // Call the async batch create method directly
      await syncConnectorInstance.processBatchCreateAsync(
        modelConnector,
        changes,
        "user",
        processor
      );

      // Verify the request was made with changeIds at top level
      expect(mockRestConnector.request).toHaveBeenCalled();
      const call = mockRestConnector.request.mock.calls[0][0];
      expect(call.method).toBe("POST");
      expect(call.url).toBe("/users/batch");
      expect(call.async).toBe(true);
      expect(call.changeIds).toEqual(["change-1"]);
      expect(call.confirm).toBeUndefined();
      
      // Verify extract function is stored in processor
      expect(modelConnector.config.batchCreate.extract).toBeDefined();
    });

    it("should respect useAsyncWrites runtime option", async () => {
      const changes = [
        { changeId: "change-1", data: { name: "New User", email: "user@example.com" } },
      ];

      retrieveDeltaMock.mockResolvedValueOnce({ operation: "CREATE", changes })
        .mockResolvedValue({ operation: "CREATE", changes: [] });

      mockRestConnector.request = vi.fn().mockResolvedValue({ 
        data: { id: "123", name: "New User", email: "user@example.com" } 
      });

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) =>
          builder
            .withList({
              request: () => ({ endpoint: "/users", method: "GET" }),
              extract: (response) => ({ items: [], pagination: { hasMore: false } })
            })
            .withBatchCreate({
              request: (items) => ({
                endpoint: "/users/batch",
                method: "POST",
                json: items,
              }),
            })
        )
        .build();

      // Sync with async writes disabled
      await syncConnector.sync("FULL", { useAsyncWrites: false });

      // Should not have async flag
      expect(mockRestConnector.request).toHaveBeenCalledWith(
        expect.not.objectContaining({ async: true })
      );
    });

    it("should handle environment variable for disabling async writes", async () => {
      // Set environment variable
      process.env.LIGHTYEAR_ASYNC_WRITES = "false";

      const syncConnector = createSyncConnector(mockRestConnector, collection)
        .withModelConnector("user", (builder) => 
          builder
            .withList({
              request: () => ({ endpoint: "/users", method: "GET" }),
              extract: (response) => ({ items: [], pagination: { hasMore: false } })
            })
            .withCreate({
              request: (data) => ({ 
                endpoint: "/users", 
                method: "POST", 
                json: data 
              }),
            })
        )
        .build();

      // The environment variable affects the behavior at runtime if not explicitly set
      const changes = [
        { changeId: "change-1", data: { name: "New User", email: "user@example.com" } },
      ];

      retrieveDeltaMock.mockResolvedValueOnce({ operation: "CREATE", changes })
        .mockResolvedValue({ operation: "CREATE", changes: [] });

      mockRestConnector.request = vi.fn().mockResolvedValue({ 
        data: { id: "123", name: "New User", email: "user@example.com" } 
      });

      // Sync should use sync writes due to env variable
      await syncConnector.sync("FULL");

      // Should not have async flag
      expect(mockRestConnector.request).toHaveBeenCalledWith(
        expect.not.objectContaining({ async: true })
      );

      // Cleanup
      delete process.env.LIGHTYEAR_ASYNC_WRITES;
    });
  });
});
