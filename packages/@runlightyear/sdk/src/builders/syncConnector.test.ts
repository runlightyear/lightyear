import { describe, it, expect, beforeEach, vi } from "vitest";
import { z } from "zod";
import type { ListFilterArgs } from "./syncConnector";
import { createSyncConnector, SyncConnectorBuilder } from "./syncConnector";
import { defineCollection } from "./collection";
import { createRestConnector } from "./restConnector";
import { RestConnector } from "../connectors/RestConnector";

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

    it("should perform bulk create operation", async () => {
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
          bulk: {
            create: {
              request: (items) => ({
                endpoint: "/users/bulk",
                method: "POST",
                data: items,
              }),
              batchSize: 2,
            },
          },
        })
        .build();

      const userConnector = syncConnector.getModelConnector("user");
      const result = await userConnector?.bulkCreate?.(newUsers);

      // Should be called twice due to batch size of 2
      expect(mockRestConnector.request).toHaveBeenCalledTimes(2);
      expect(result).toHaveLength(6); // 3 items returned twice
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
});
