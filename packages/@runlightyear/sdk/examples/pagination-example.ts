/**
 * Pagination Example
 * 
 * This example demonstrates how to use default pagination strategies
 * and override them for specific models when needed.
 */

import { z } from "zod";
import {
  defineTypedCollection,
  defineRestConnector,
  createSyncConnector,
  PaginationStrategies,
} from "../src";

// Define a simple collection
const apiCollection = defineTypedCollection("api-data")
  .addModel(
    "user",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
      },
      required: ["id", "name", "email"],
    } as const,
    (m) => m
  )
  .addModel(
    "post",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        content: { type: "string" },
        authorId: { type: "string" },
      },
      required: ["id", "title", "content", "authorId"],
    } as const,
    (m) => m
  )
  .deploy();

// Create REST connector
const apiConnector = defineRestConnector()
  .withBaseUrl("https://api.example.com/v2")
  .addHeader("Authorization", "Bearer token")
  .build();

// Example 1: Using built-in pagination strategy
const syncWithCursorPagination = createSyncConnector(apiConnector, apiCollection)
  .withDefaultPagination("cursor"); // Built-in cursor pagination

syncWithCursorPagination
  .addModelConnector("user")
  .withList("/users", {
    responseSchema: z.object({
      users: z.array(z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
      })),
      nextCursor: z.string().optional(),
      hasMore: z.boolean(),
    }),
    transform: (response) => response.users,
    // No need to implement getNextPage - uses default cursor strategy
  });

// Example 2: Custom default pagination strategy
const customPagination = createSyncConnector(apiConnector, apiCollection)
  .withDefaultPagination({
    getNextPage: (response, current) => {
      // Custom logic: uses 'continuation' token
      if (response.continuation) {
        return {
          type: "cursor",
          cursor: response.continuation,
          limit: current.limit,
        };
      }
      return null;
    },
    extractHasMore: (response) => !!response.continuation,
    extractNextCursor: (response) => response.continuation,
  });

// Example 3: Override default for specific model
const syncWithMixedPagination = createSyncConnector(apiConnector, apiCollection)
  .withDefaultPagination("page"); // Default: page-based

syncWithMixedPagination
  .addModelConnector("user")
  .withList("/users", {
    responseSchema: z.object({
      data: z.array(z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      })),
      page: z.number(),
      totalPages: z.number(),
      hasMore: z.boolean(),
    }),
    transform: (response) => response.data,
    // Uses default page-based pagination
  });

syncWithMixedPagination
  .addModelConnector("post")
  .withList("/posts", {
    responseSchema: z.object({
      posts: z.array(z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
      })),
      offset: z.number(),
      limit: z.number(),
      total: z.number(),
    }),
    transform: (response) => response.posts,
    // Override with custom offset-based pagination for this model
    getNextPage: (response, current) => {
      if (current.type === "page") {
        // Convert page to offset for this endpoint
        const offset = (current.page - 1) * current.limit;
        const nextOffset = offset + current.limit;
        if (nextOffset < response.total) {
          return {
            type: "page",
            page: current.page + 1,
            limit: current.limit,
          };
        }
      }
      return null;
    },
  });

// Example 4: Using predefined strategies
async function demonstratePagination() {
  // HubSpot-style pagination
  const hubspotStyle = createSyncConnector(apiConnector, apiCollection)
    .withDefaultPagination(PaginationStrategies.hubspot);

  // Standard cursor pagination
  const cursorStyle = createSyncConnector(apiConnector, apiCollection)
    .withDefaultPagination(PaginationStrategies.cursor);

  // Offset-based pagination
  const offsetStyle = createSyncConnector(apiConnector, apiCollection)
    .withDefaultPagination(PaginationStrategies.offset);

  console.log("Pagination strategies configured!");
}

export { 
  apiCollection,
  syncWithCursorPagination,
  syncWithMixedPagination,
  demonstratePagination 
};