/**
 * Sync Connector Type Safety Demonstration
 * 
 * This file demonstrates the improved type safety for sync connector transform methods.
 * It shows how the transform function parameter is properly typed with the response schema
 * and the return type must match the collection's model schema.
 */

import { z } from "zod";
import {
  defineCollection,
  createRestConnector,
  createSyncConnector,
  createListConfig,
} from "../src";

// Define our API response schema (what the external API returns)
const apiUserSchema = z.object({
  user_id: z.string(),
  full_name: z.string(),
  email_address: z.string(),
  is_active: z.boolean(),
  created_timestamp: z.number(),
});

type ApiUser = z.infer<typeof apiUserSchema>;

// Define our collection model schema (what we want to store)
const collectionUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
  createdAt: z.string(),
});

type CollectionUser = z.infer<typeof collectionUserSchema>;

// Create collection
const userCollection = defineCollection("users")
  .addModel("user", {
    schema: collectionUserSchema as any,
  })
  .deploy();

// Create REST connector
const apiConnector = createRestConnector()
  .withBaseUrl("https://api.example.com")
  .build();

// Define API list response schema
const apiListResponseSchema = z.object({
  users: z.array(apiUserSchema),
  total: z.number(),
  hasMore: z.boolean(),
});

type ApiListResponse = z.infer<typeof apiListResponseSchema>;

// Example 1: Using createListConfig helper for maximum type safety
const typeSafeListConfig = createListConfig<CollectionUser, ApiListResponse>({
  request: {
    endpoint: "/users",
  },
  responseSchema: apiListResponseSchema,
  // Transform receives the full response and returns an array
  transform: (response) => {
    // TypeScript knows response has users, total, and hasMore
    return response.users.map((apiUser) => ({
      // TypeScript knows all the properties of apiUser
      id: apiUser.user_id,
      name: apiUser.full_name,
      email: apiUser.email_address,
      active: apiUser.is_active,
      createdAt: new Date(apiUser.created_timestamp * 1000).toISOString(),
    }));
  },
});

// Create sync connector with type-safe config
const syncConnector = createSyncConnector(apiConnector, userCollection)
  .with("user", {
    list: typeSafeListConfig,
  })
  .build();

// Example 2: Using inline configuration with explicit types
const syncConnectorInline = createSyncConnector(apiConnector, userCollection)
  .with("user", {
    list: {
      request: {
        endpoint: "/users",
      },
      responseSchema: apiListResponseSchema,
      // Transform with explicit type annotations
      transform: (response: ApiListResponse): CollectionUser[] => {
        return response.users.map((apiUser) => ({
          id: apiUser.user_id,
          name: apiUser.full_name,
          email: apiUser.email_address,
          active: apiUser.is_active,
          createdAt: new Date(apiUser.created_timestamp * 1000).toISOString(),
        }));
      },
    },
  })
  .build();

// Example 3: Using the builder pattern with list method
const syncConnectorBuilder = createSyncConnector(apiConnector, userCollection)
  .add("user", (builder) =>
    builder.list({
      request: {
        endpoint: "/users",
      },
      responseSchema: apiListResponseSchema,
      // Transform is properly typed with the full response!
      transform: (response) => {
        return response.users.map((apiUser) => ({
          id: apiUser.user_id,
          name: apiUser.full_name,
          email: apiUser.email_address,
          active: apiUser.is_active,
          createdAt: new Date(apiUser.created_timestamp * 1000).toISOString(),
        }));
      },
    })
  )
  .build();

// Usage example showing type safety in action
async function demonstrateTypeSafety() {
  const userConnector = syncConnector.getModelConnector("user");
  
  if (userConnector?.list) {
    const { items } = await userConnector.list();
    
    // items is properly typed as CollectionUser[]
    items.forEach((user) => {
      // All these properties are available and typed
      console.log(`User ${user.id}: ${user.name}`);
      console.log(`Email: ${user.email}`);
      console.log(`Active: ${user.active}`);
      console.log(`Created: ${user.createdAt}`);
      
      // TypeScript would error on these:
      // console.log(user.user_id);        // Error: Property doesn't exist
      // console.log(user.full_name);      // Error: Property doesn't exist
      // console.log(user.is_active);      // Error: Property doesn't exist
      // console.log(user.created_timestamp); // Error: Property doesn't exist
    });
  }
}

// Example showing transform type errors (commented out as they would cause compilation errors)
/*
// This would cause a TypeScript error - not returning an array:
const badConfig = createListConfig<CollectionUser, ApiListResponse>({
  request: {
    endpoint: "/users",
  },
  responseSchema: apiListResponseSchema,
  transform: (response) => {
    // Error: Must return CollectionUser[], not CollectionUser
    return {
      id: "1",
      name: "test",
      email: "test@example.com",
      active: true,
      createdAt: "2024-01-01",
    };
  },
});

// This would also cause a TypeScript error - missing required properties:
const badConfig2 = createListConfig<CollectionUser, ApiListResponse>({
  request: {
    endpoint: "/users",
  },
  responseSchema: apiListResponseSchema,
  transform: (response) => {
    return response.users.map((apiUser) => ({
      // Error: Property 'id' is missing
      name: apiUser.full_name,
      email: apiUser.email_address,
      active: apiUser.is_active,
      createdAt: new Date(apiUser.created_timestamp * 1000).toISOString(),
    }));
  },
});

// This would cause an error - wrong property type:
const badConfig3 = createListConfig<CollectionUser, ApiListResponse>({
  request: {
    endpoint: "/users",
  },
  responseSchema: apiListResponseSchema,
  transform: (response) => {
    return response.users.map((apiUser) => ({
      id: apiUser.user_id,
      name: apiUser.full_name,
      email: apiUser.email_address,
      active: apiUser.is_active,
      createdAt: apiUser.created_timestamp, // Error: Type 'number' is not assignable to type 'string'
    }));
  },
});
*/

export { syncConnector, demonstrateTypeSafety };