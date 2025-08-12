/**
 * Chained Model Connectors Example
 * 
 * This example demonstrates different ways to add model connectors
 * to a sync connector, including chaining patterns.
 */

import { z } from "zod";
import {
  defineTypedCollection,
  defineRestConnector,
  defineSyncConnector,
} from "../src";

// Define a simple e-commerce collection
const ecommerceCollection = defineTypedCollection("ecommerce")
  .addModel(
    "product",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        price: { type: "number" },
        inStock: { type: "boolean" },
      },
      required: ["id", "name", "price", "inStock"],
    } as const,
    (m) => m
  )
  .addModel(
    "order",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        productId: { type: "string" },
        quantity: { type: "integer" },
        total: { type: "number" },
      },
      required: ["id", "productId", "quantity", "total"],
    } as const,
    (m) => m
  )
  .addModel(
    "customer",
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
  .deploy();

// Create REST connector
const apiConnector = defineRestConnector()
  .withBaseUrl("https://api.store.com")
  .build();

// Pattern 1: Traditional approach - configure each model separately
const traditionalSyncBuilder = defineSyncConnector(apiConnector, ecommerceCollection)
  .withDefaultPagination("page");

// Configure product
traditionalSyncBuilder
  .addModelConnector("product")
  .withList("/products", {
    responseSchema: z.object({
      products: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        in_stock: z.boolean(),
      })),
      hasMore: z.boolean(),
    }),
    transform: (response) => response.products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      inStock: p.in_stock,
    })),
  });

// Configure order separately
traditionalSyncBuilder
  .addModelConnector("order")
  .withList("/orders", {
    responseSchema: z.object({
      orders: z.array(z.object({
        id: z.string(),
        product_id: z.string(),
        quantity: z.number(),
        total: z.number(),
      })),
      hasMore: z.boolean(),
    }),
    transform: (response) => response.orders.map(o => ({
      id: o.id,
      productId: o.product_id,
      quantity: o.quantity,
      total: o.total,
    })),
  });

// Build the traditional sync connector
const traditionalSync = traditionalSyncBuilder.build();

// Pattern 2: Using withModelConnectors for simple cases
const bulkAddSync = defineSyncConnector(apiConnector, ecommerceCollection)
  .withDefaultPagination("page")
  // Add multiple model connectors at once (creates empty connectors)
  .withModelConnectors("product", "order", "customer")
  .build();

// Then configure them individually after building
// Note: This won't work with the new pattern - connectors must be configured before build()
  responseSchema: z.array(z.any()),
  transform: (response) => response,
});

// Pattern 3: Using chaining with 'and()' method
const chainedSync = defineSyncConnector(apiConnector, ecommerceCollection)
  .withDefaultPagination("page");

chainedSync
  .addModelConnector("product")
  .withList("/products", {
    responseSchema: z.object({
      products: z.array(z.any()),
      hasMore: z.boolean(),
    }),
    transform: (response) => response.products,
  })
  .and() // Return to sync connector builder
  .addModelConnector("order")
  .withList("/orders", {
    responseSchema: z.object({
      orders: z.array(z.any()),
      hasMore: z.boolean(),
    }),
    transform: (response) => response.orders,
  })
  .and()
  .addModelConnector("customer")
  .withList("/customers", {
    responseSchema: z.object({
      customers: z.array(z.any()),
      hasMore: z.boolean(),
    }),
    transform: (response) => response.customers,
  })
  .build();

// Pattern 4: Using addModelConnector from within a model connector
const directChainSync = defineSyncConnector(apiConnector, ecommerceCollection)
  .withDefaultPagination("page");

directChainSync
  .addModelConnector("product")
  .withList("/products", {
    responseSchema: z.object({ products: z.array(z.any()) }),
    transform: (response) => response.products,
  })
  .addModelConnector("order") // Directly chain to next model
  .withList("/orders", {
    responseSchema: z.object({ orders: z.array(z.any()) }),
    transform: (response) => response.orders,
  })
  .addModelConnector("customer")
  .withList("/customers", {
    responseSchema: z.object({ customers: z.array(z.any()) }),
    transform: (response) => response.customers,
  })
  .build();

// Pattern 5: Mixed approach for complex scenarios
const mixedSyncBuilder = defineSyncConnector(apiConnector, ecommerceCollection)
  .withDefaultPagination("cursor")
  // Add all connectors first
  .withModelConnectors("product", "order", "customer");

// Configure product with full CRUD
mixedSyncBuilder
  .getModelConnector("product")!
  .withList("/products", {
    responseSchema: z.object({
      items: z.array(z.any()),
      nextCursor: z.string().optional(),
    }),
    transform: (response) => response.items,
  })
  .withCreate("/products", {
    transform: (product) => ({
      name: product.name,
      price: product.price,
      in_stock: product.inStock,
    }),
  })
  .withUpdate((id) => `/products/${id}`, {
    transform: (product) => ({
      name: product.name,
      price: product.price,
      in_stock: product.inStock,
    }),
  })
  .withDelete((id) => `/products/${id}`);

// Configure order with just list
mixedSyncBuilder
  .getModelConnector("order")!
  .withList("/orders", {
    responseSchema: z.object({
      items: z.array(z.any()),
      nextCursor: z.string().optional(),
    }),
    transform: (response) => response.items,
  });

// Build the mixed sync connector
const mixedSync = mixedSyncBuilder.build();

// Usage comparison
async function demonstratePatterns() {
  console.log("=== Model Connector Chaining Patterns ===\n");

  // All patterns achieve the same result
  const traditionalProduct = traditionalSync.getModelConnector("product");
  const chainedProduct = chainedSync.getModelConnector("product");
  const directProduct = directChainSync.getModelConnector("product");
  
  console.log("All patterns create the same connectors:");
  console.log("- Traditional:", !!traditionalProduct);
  console.log("- Chained with and():", !!chainedProduct);
  console.log("- Direct chaining:", !!directProduct);
  
  console.log("\nChoose the pattern that fits your use case:");
  console.log("- Traditional: When configuring models in different parts of code");
  console.log("- withModelConnectors: When you want to declare all models upfront");
  console.log("- Chained: When you want a fluent API for configuration");
  console.log("- Mixed: When some models need complex config, others are simple");
}

export {
  ecommerceCollection,
  traditionalSync,
  chainedSync,
  directChainSync,
  mixedSync,
  demonstratePatterns,
};