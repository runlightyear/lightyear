/**
 * Sync Connector Examples
 *
 * Note: Each example demonstrates type inference by using the sync connector
 * in a way that shows the types are properly inferred.
 */

import { z } from "zod";
import { defineCollection, createSyncConnector, RestConnector } from "../src";

/**
 * Define a basic sync connector that works with a rest api and a collection
 */

// Define schemas for our models
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// Create a collection
const userCollection = defineCollection("users")
  .addModel("user", { schema: UserSchema })
  .deploy();

// Initialize REST connector
const apiConnector = new RestConnector({
  baseUrl: "https://api.example.com",
  headers: {
    Authorization: "Bearer {{ accessToken }}",
  },
});

// Create a basic sync connector
const basicSyncConnector = createSyncConnector(
  apiConnector,
  userCollection
).build();

// Access the connectors
const restConnector = basicSyncConnector.getRestConnector();
void restConnector;
const collection = basicSyncConnector.getCollection();
void collection;

/**
 * Define a sync connector that works with a rest api and a collection and has a model connector with a list method
 */

// Define response schema for list endpoint
const UserListResponseSchema = z.object({
  users: z.array(UserSchema),
  nextPage: z.string().optional(),
  totalCount: z.number(),
});

// Create sync connector with list method
const syncConnectorWithList = createSyncConnector(apiConnector, userCollection)
  .withModelConnector("user", (modelConnector) =>
    modelConnector.withList({
      request: (params) => ({
        endpoint: "/users",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
        },
      }),
      responseSchema: UserListResponseSchema,
      transform: (response) => response.users,
    })
  )
  .build();

// Demonstrate type inference with list method
async function demonstrateListTypeInference() {
  const userConnector = syncConnectorWithList.getModelConnector("user");

  if (userConnector?.list) {
    const result = await userConnector.list({ page: 1, limit: 10 });
    // TypeScript knows result.items is User[]
    result.items.forEach((user) => {
      console.log(user.name); // Type-safe access to user properties
      console.log(user.email);
    });
  }
}

/**
 * Define a sync connector that works with a rest api and a collection and has a model connector with a list method and a create method
 */

const syncConnectorWithListAndCreate = createSyncConnector(
  apiConnector,
  userCollection
)
  .withModelConnector("user", (modelConnector) =>
    modelConnector
      .withList({
        request: (params) => ({
          endpoint: "/users",
          params: {
            page: params.page || 1,
            limit: params.limit || 20,
          },
        }),
        responseSchema: UserListResponseSchema,
        transform: (response) => response.users,
      })
      .withCreate({
        request: (user) => ({
          endpoint: "/users",
          method: "POST",
          data: user,
        }),
        transform: (response) => response.data,
      })
  )
  .build();

// Demonstrate type inference with list and create methods
async function demonstrateListAndCreateTypeInference() {
  const userConnector =
    syncConnectorWithListAndCreate.getModelConnector("user");

  if (userConnector?.create) {
    // TypeScript enforces the correct user structure
    const newUser = await userConnector.create({
      id: "",
      name: "John Doe",
      email: "john@example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Type-safe access to created user
    console.log(`Created user: ${newUser.name} with id: ${newUser.id}`);
  }

  if (userConnector?.list) {
    const users = await userConnector.list({ page: 1 });
    // Type-safe iteration over users
    users.items.forEach((user) => {
      console.log(`${user.name} - ${user.email}`);
    });
  }
}

/**
 * Define a sync connector that works with a rest api and a collection and has a model connector with a list method and a create, update, and delete method
 */

const fullCrudSyncConnector = createSyncConnector(apiConnector, userCollection)
  .withModelConnector("user", (modelConnector) =>
    modelConnector
      .withList({
        request: (params) => ({
          endpoint: "/users",
          params: {
            page: params.page || 1,
            limit: params.limit || 20,
            sortBy: params.sortBy || "createdAt",
            sortOrder: params.sortOrder || "desc",
          },
        }),
        responseSchema: UserListResponseSchema,
        pagination: {
          type: "page",
          pageField: "page",
          pageSize: 20,
        },
        transform: (response) => response.users,
      })
      .withCreate({
        request: (user) => ({
          endpoint: "/users",
          method: "POST",
          data: user,
        }),
        transformRequest: (user) => {
          // Remove id field for creation
          const { id, ...userData } = user;
          return userData;
        },
        transform: (response) => response.data,
      })
      .withUpdate({
        request: (id, data) => ({
          endpoint: `/users/${id}`,
          method: "PUT",
          data,
        }),
        transformRequest: (data) => {
          // Remove read-only fields
          const { id, createdAt, ...updateData } = data;
          return updateData;
        },
        transform: (response) => response.data,
      })
      .withDelete({
        request: (id) => ({
          endpoint: `/users/${id}`,
          method: "DELETE",
        }),
      })
  )
  .build();

// Demonstrate type inference with all CRUD methods
async function demonstrateFullCrudTypeInference() {
  const userConnector = fullCrudSyncConnector.getModelConnector("user");

  if (!userConnector) {
    throw new Error("User connector not found");
  }

  // CREATE - TypeScript enforces correct user structure
  if (userConnector.create) {
    const newUser = await userConnector.create({
      id: "", // Will be generated by API
      name: "Jane Smith",
      email: "jane@example.com",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    console.log(`Created user: ${newUser.name}`);

    // UPDATE - TypeScript knows this is Partial<User>
    if (userConnector.update) {
      const updatedUser = await userConnector.update(newUser.id, {
        name: "Jane Doe",
        updatedAt: new Date().toISOString(),
      });
      console.log(`Updated user: ${updatedUser.name}`);
    }

    // LIST - TypeScript infers User[] for items
    if (userConnector.list) {
      const userList = await userConnector.list({
        sortBy: "name",
        sortOrder: "asc",
      });

      userList.items.forEach((user) => {
        // All user properties are type-safe
        console.log(`${user.id}: ${user.name} (${user.email})`);
      });
    }

    // DELETE - TypeScript ensures id is a string
    if (userConnector.delete) {
      await userConnector.delete(newUser.id);
      console.log(`Deleted user: ${newUser.id}`);
    }
  }
}

// Export examples for testing
export {
  demonstrateListTypeInference,
  demonstrateListAndCreateTypeInference,
  demonstrateFullCrudTypeInference,
};
