/**
 * Simple CRUD Demo for Sync Connectors
 * 
 * This example demonstrates how data is incorporated into create and update requests
 * using the new function-based request configuration.
 */

import { z } from "zod";
import {
  defineCollection,
  createRestConnector,
  createSyncConnector,
} from "../src";

// Define a simple product schema
const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  inStock: z.boolean(),
});

type Product = z.infer<typeof productSchema>;

// Create collection
const productsCollection = defineCollection("products")
  .addModel("product", {
    schema: productSchema as any,
  })
  .deploy();

// Create REST connector
const apiConnector = createRestConnector()
  .withBaseUrl("https://api.store.com")
  .addHeader("Authorization", "Bearer ${auth.token}")
  .build();

// Create sync connector with CRUD operations
const productSync = createSyncConnector(apiConnector, productsCollection)
  .with("product", {
    // LIST - Shows how to pass query parameters
    list: {
      request: (params) => ({
        endpoint: "/products",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 20,
          // Can add more query params based on the params object
          ...(params.cursor && { cursor: params.cursor }),
        },
      }),
      transform: (response: any) => {
        // Assuming API returns { products: Product[], total: number }
        return response.products;
      },
    },

    // CREATE - Shows how data is incorporated into the request body
    create: {
      request: (data: Product) => ({
        endpoint: "/products",
        method: "POST",
        // The data parameter contains the new product to create
        data: {
          // Can transform or add fields as needed
          product_name: data.name,
          product_price: data.price,
          product_description: data.description,
          in_stock: data.inStock,
          // Can add extra fields not in the model
          created_at: new Date().toISOString(),
        },
      }),
      // Transform API response back to model format
      transform: (response: any): Product => ({
        id: response.product_id,
        name: response.product_name,
        price: response.product_price,
        description: response.product_description,
        inStock: response.in_stock,
      }),
    },

    // UPDATE - Shows how both ID and data are used
    update: {
      request: (id: string, data: Partial<Product>) => ({
        // ID is used in the endpoint
        endpoint: `/products/${id}`,
        method: "PATCH",
        // Partial data is sent in the request body
        data: {
          // Only send fields that were provided
          ...(data.name !== undefined && { product_name: data.name }),
          ...(data.price !== undefined && { product_price: data.price }),
          ...(data.description !== undefined && { product_description: data.description }),
          ...(data.inStock !== undefined && { in_stock: data.inStock }),
          // Always send updated timestamp
          updated_at: new Date().toISOString(),
        },
      }),
      transform: (response: any): Product => ({
        id: response.product_id,
        name: response.product_name,
        price: response.product_price,
        description: response.product_description,
        inStock: response.in_stock,
      }),
    },

    // DELETE - Shows how ID is used
    delete: {
      request: (id: string) => ({
        endpoint: `/products/${id}`,
        method: "DELETE",
        // Some APIs might require data in DELETE requests
        // data: { confirm: true },
      }),
    },

    // BULK operations
    bulk: {
      create: {
        request: (items: Product[]) => ({
          endpoint: "/products/bulk",
          method: "POST",
          // Send array of products
          data: {
            products: items.map(item => ({
              product_name: item.name,
              product_price: item.price,
              product_description: item.description,
              in_stock: item.inStock,
            })),
          },
        }),
        batchSize: 50,
      },
      update: {
        request: (items: Array<{ id: string; data: Partial<Product> }>) => ({
          endpoint: "/products/bulk-update",
          method: "PATCH",
          // Send array of updates
          data: {
            updates: items.map(item => ({
              product_id: item.id,
              ...(item.data.name !== undefined && { product_name: item.data.name }),
              ...(item.data.price !== undefined && { product_price: item.data.price }),
              ...(item.data.description !== undefined && { product_description: item.data.description }),
              ...(item.data.inStock !== undefined && { in_stock: item.data.inStock }),
              updated_at: new Date().toISOString(),
            })),
          },
        }),
        batchSize: 50,
      },
      delete: {
        request: (ids: string[]) => ({
          endpoint: "/products/bulk-delete",
          method: "POST",
          // Send array of IDs to delete
          data: {
            product_ids: ids,
          },
        }),
        batchSize: 100,
      },
    },
  })
  .build();

// Usage example
async function demonstrateCrud() {
  const productConnector = productSync.getModelConnector("product");
  
  if (!productConnector) return;

  // CREATE - The data is passed to the request function
  if (productConnector.create) {
    const newProduct = await productConnector.create({
      id: "temp-id", // Will be replaced by server
      name: "Widget Pro",
      price: 99.99,
      description: "Professional grade widget",
      inStock: true,
    });
    console.log("Created product:", newProduct);
  }

  // UPDATE - Both ID and data are passed to the request function
  if (productConnector.update) {
    const updated = await productConnector.update("prod-123", {
      price: 89.99,
      inStock: false,
    });
    console.log("Updated product:", updated);
  }

  // LIST - Pagination params are passed to the request function
  if (productConnector.list) {
    const { items } = await productConnector.list({ 
      page: 2, 
      limit: 50 
    });
    console.log(`Found ${items.length} products`);
  }

  // DELETE - ID is passed to the request function
  if (productConnector.delete) {
    await productConnector.delete("prod-123");
    console.log("Deleted product");
  }
}

export { productSync, demonstrateCrud };