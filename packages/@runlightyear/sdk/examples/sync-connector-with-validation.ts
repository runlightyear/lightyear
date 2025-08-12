/**
 * Sync Connector with Validation Example
 * 
 * This example demonstrates how the sync connector automatically validates
 * API responses against the collection schemas using Zod.
 */

import { defineTypedCollection, defineSyncConnector, match } from "../src";
import type { ExtractModelTypes } from "../src";

// Define a product catalog schema with strict validation requirements
const productSchema = {
  type: "object",
  properties: {
    id: { type: "string", pattern: "^PROD-[0-9]{6}$" }, // Must match PROD-123456
    name: { type: "string", minLength: 3, maxLength: 100 },
    description: { type: "string", maxLength: 500 },
    price: { type: "number", minimum: 0, maximum: 1000000 },
    currency: { 
      type: "string",
      enum: ["USD", "EUR", "GBP", "JPY"] as const
    },
    category: {
      type: "string",
      enum: ["electronics", "clothing", "books", "home", "sports"] as const
    },
    stock: { type: "integer", minimum: 0 },
    tags: {
      type: "array",
      items: { type: "string", minLength: 2 },
      maxItems: 10
    },
    specifications: {
      type: "object",
      properties: {
        weight: { type: "number", minimum: 0 },
        dimensions: {
          type: "object",
          properties: {
            length: { type: "number", minimum: 0 },
            width: { type: "number", minimum: 0 },
            height: { type: "number", minimum: 0 }
          },
          required: ["length", "width", "height"]
        }
      },
      required: ["weight"]
    },
    isActive: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["id", "name", "price", "currency", "category", "stock", "isActive", "createdAt", "updatedAt"],
  additionalProperties: false
} as const;

// Create a typed collection
const catalogCollection = defineTypedCollection("catalog")
  .withTitle("Product Catalog")
  .addModel("product", productSchema, (model) =>
    model
      .withTitle("Product")
      .withMatchPattern(match.property("category"))
  )
  .deploy();

// Extract types
type CatalogTypes = ExtractModelTypes<typeof catalogCollection>;
type Product = CatalogTypes["product"];

// Create sync connector with validation
const catalogSyncConnector = defineSyncConnector("product-api")
  .withBaseUrl("https://api.example.com/v1")
  .addHeader("X-API-Key", process.env.PRODUCT_API_KEY || "demo-key")
  .withCollection(catalogCollection)
  
  .defineSyncMethod("product", {
    endpoint: "/products",
    method: "GET",
    params: {
      limit: 100,
      include_inactive: true
    },
    // validateResponse: true, // This is the default
    responseMapping: (response: any): Product[] => {
      // Simulate API response that might have invalid data
      return response.products.map((item: any) => ({
        id: item.product_id,
        name: item.title,
        description: item.desc || "",
        price: parseFloat(item.price),
        currency: item.currency,
        category: item.category,
        stock: parseInt(item.inventory_count),
        tags: item.tags || [],
        specifications: item.specs || { weight: 0 },
        isActive: item.is_active,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }));
    }
  })
  
  .deploy();

// Example: Simulate syncing with mixed valid/invalid data
async function demonstrateValidation() {
  // Mock API response with some invalid products
  const mockApiResponse = {
    products: [
      // Valid product
      {
        product_id: "PROD-123456",
        title: "Laptop Pro 15",
        desc: "High-performance laptop",
        price: "1299.99",
        currency: "USD",
        category: "electronics",
        inventory_count: "25",
        tags: ["laptop", "professional"],
        specs: {
          weight: 1.8,
          dimensions: { length: 35, width: 24, height: 2 }
        },
        is_active: true,
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-20T14:45:00Z"
      },
      // Invalid product - wrong ID format
      {
        product_id: "INVALID-ID",
        title: "Wireless Mouse",
        price: "29.99",
        currency: "USD",
        category: "electronics",
        inventory_count: "100",
        is_active: true,
        created_at: "2024-01-10T09:00:00Z",
        updated_at: "2024-01-10T09:00:00Z"
      },
      // Invalid product - price too high
      {
        product_id: "PROD-789012",
        title: "Diamond Ring",
        price: "1500000", // Exceeds maximum
        currency: "USD",
        category: "jewelry", // Invalid category
        inventory_count: "1",
        is_active: true,
        created_at: "2024-01-12T11:00:00Z",
        updated_at: "2024-01-12T11:00:00Z"
      },
      // Invalid product - missing required fields
      {
        product_id: "PROD-345678",
        title: "T-Shirt",
        // Missing price, currency, etc.
        category: "clothing",
        inventory_count: "50",
        is_active: true
      },
      // Valid product
      {
        product_id: "PROD-567890",
        title: "Python Programming Book",
        desc: "Learn Python from scratch",
        price: "49.99",
        currency: "EUR",
        category: "books",
        inventory_count: "200",
        tags: ["programming", "python", "education"],
        specs: {
          weight: 0.5,
          dimensions: { length: 23, width: 15, height: 3 }
        },
        is_active: true,
        created_at: "2024-01-05T08:30:00Z",
        updated_at: "2024-01-18T16:20:00Z"
      }
    ]
  };

  // Mock the REST connector request
  console.log("Syncing products with validation...\n");
  
  // In a real scenario, this would make an HTTP request
  // For demo purposes, we'll process the mock data
  const result = await processWithValidation(mockApiResponse);
  
  console.log(`Total records received: ${result.metadata?.count}`);
  console.log(`Valid records: ${result.metadata?.validRecords}`);
  console.log(`Invalid records: ${result.metadata?.invalidRecords}`);
  
  if (result.validationErrors && result.validationErrors.length > 0) {
    console.log("\nValidation errors found:");
    result.validationErrors.forEach(error => {
      console.log(`  - Record ${error.index}: ${error.path} - ${error.message}`);
    });
  }
  
  console.log("\nValid products synced:");
  result.data.forEach(product => {
    console.log(`  - ${product.id}: ${product.name} (${product.currency} ${product.price})`);
  });
  
  return result;
}

// Helper function to simulate validation process
async function processWithValidation(mockResponse: any): Promise<any> {
  const mappedData = mockResponse.products.map((item: any) => ({
    id: item.product_id,
    name: item.title,
    description: item.desc || "",
    price: item.price ? parseFloat(item.price) : undefined,
    currency: item.currency,
    category: item.category,
    stock: item.inventory_count ? parseInt(item.inventory_count) : undefined,
    tags: item.tags || [],
    specifications: item.specs || { weight: 0 },
    isActive: item.is_active,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
  
  // Import validation function for demo
  const { validateWithSchema } = await import("../src");
  
  const validData: Product[] = [];
  const validationErrors: any[] = [];
  
  mappedData.forEach((item: any, index: number) => {
    const validation = validateWithSchema<Product>(item, productSchema);
    
    if (validation.success && validation.data) {
      validData.push(validation.data);
    } else if (validation.errors) {
      validation.errors.forEach(error => {
        validationErrors.push({
          index,
          path: error.path,
          message: error.message
        });
      });
    }
  });
  
  return {
    data: validData,
    success: true,
    validationErrors,
    metadata: {
      count: mappedData.length,
      validRecords: validData.length,
      invalidRecords: mappedData.length - validData.length,
      timestamp: new Date()
    }
  };
}

// Example: Disable validation for specific sync
const catalogSyncConnectorNoValidation = defineSyncConnector("product-api-no-validation")
  .withBaseUrl("https://api.example.com/v1")
  .withCollection(catalogCollection)
  
  .defineSyncMethod("product", {
    endpoint: "/products",
    validateResponse: false, // Disable validation
    responseMapping: (response: any): Product[] => {
      // Data won't be validated, so invalid data might pass through
      return response.products;
    }
  })
  
  .deploy();

// Run the demonstration
demonstrateValidation().then(result => {
  console.log("\n✅ Validation demonstration complete!");
}).catch(console.error);

export { 
  catalogCollection, 
  catalogSyncConnector,
  demonstrateValidation,
  type Product 
};