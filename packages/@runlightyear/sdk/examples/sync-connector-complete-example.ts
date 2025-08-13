/**
 * Complete Sync Connector Example with Full Type Safety
 * 
 * This example demonstrates a fully typed sync connector with all CRUD operations
 * using the new function-based request configuration API.
 */

import { z } from "zod";
import {
  defineCollection,
  createRestConnector,
  createSyncConnector,
  createListConfig,
  type ListParams,
} from "../src";

// Step 1: Define the API response schemas
// These represent what the external API returns
const apiCustomerSchema = z.object({
  customer_id: z.string(),
  full_name: z.string(),
  email_address: z.string(),
  phone_number: z.string().nullable(),
  is_active: z.boolean(),
  created_timestamp: z.number(),
  updated_timestamp: z.number(),
  metadata: z.record(z.string(), z.any()).optional(),
});

const apiListResponseSchema = z.object({
  customers: z.array(apiCustomerSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    per_page: z.number(),
    has_next: z.boolean(),
    next_cursor: z.string().nullable(),
  }),
});

type ApiCustomer = z.infer<typeof apiCustomerSchema>;
type ApiListResponse = z.infer<typeof apiListResponseSchema>;

// Step 2: Define the collection model schema
// This represents how we want to store the data
const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  active: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
});

type Customer = z.infer<typeof customerSchema>;

// Step 3: Create the collection
const customersCollection = defineCollection("customers")
  .withTitle("Customers")
  .addModel("customer", {
    title: "Customer",
    schema: customerSchema as any,
    matchPattern: "$.id",
  })
  .deploy();

// Step 4: Create the REST connector
const apiConnector = createRestConnector()
  .withBaseUrl("https://api.example.com/v1")
  .addHeader("Authorization", "Bearer ${auth.accessToken}")
  .addHeader("X-API-Version", "2024-01")
  .build();

// Step 5: Helper functions for data transformation
const transformApiCustomerToModel = (apiCustomer: ApiCustomer): Customer => ({
  id: apiCustomer.customer_id,
  name: apiCustomer.full_name,
  email: apiCustomer.email_address,
  phone: apiCustomer.phone_number || undefined,
  active: apiCustomer.is_active,
  createdAt: new Date(apiCustomer.created_timestamp * 1000).toISOString(),
  updatedAt: new Date(apiCustomer.updated_timestamp * 1000).toISOString(),
  metadata: apiCustomer.metadata,
});

const transformModelToApiCustomer = (customer: Partial<Customer>): Partial<ApiCustomer> => ({
  full_name: customer.name,
  email_address: customer.email,
  phone_number: customer.phone || null,
  is_active: customer.active,
  metadata: customer.metadata,
});

// Step 6: Create the sync connector with all operations
const customerSyncConnector = createSyncConnector(apiConnector, customersCollection)
  .add("customer", (builder) =>
    builder
      // List operation with dynamic pagination
      .list({
        request: (params: ListParams) => {
          // Support different pagination strategies
          if (params.cursor) {
            return {
              endpoint: "/customers",
              method: "GET" as const,
              params: {
                cursor: params.cursor,
                limit: params.limit || 50,
              },
            };
          } else {
            return {
              endpoint: "/customers",
              method: "GET" as const,
              params: {
                page: params.page || 1,
                per_page: params.limit || 50,
              },
            };
          }
        },
        responseSchema: apiListResponseSchema,
        pagination: {
          type: "cursor",
          cursorField: "pagination.next_cursor",
          pageSize: 50,
        },
        // Transform receives the full typed response
        transform: (response: ApiListResponse): Customer[] => {
          console.log(`Fetched ${response.customers.length} of ${response.pagination.total} customers`);
          return response.customers.map(transformApiCustomerToModel);
        },
      })
      
      // Create operation with typed data
      .create({
        request: (data: Customer) => ({
          endpoint: "/customers",
          method: "POST" as const,
          data: {
            // Can add additional fields or validate data here
            ...transformModelToApiCustomer(data),
            created_timestamp: Math.floor(Date.now() / 1000),
            updated_timestamp: Math.floor(Date.now() / 1000),
          },
        }),
        transform: (response: any): Customer => {
          // Response should be a single customer
          return transformApiCustomerToModel(response);
        },
      })
      
      // Update operation
      .update({
        request: (id: string, data: Partial<Customer>) => ({
          endpoint: `/customers/${id}`,
          method: "PATCH" as const,
          data: {
            ...transformModelToApiCustomer(data),
            updated_timestamp: Math.floor(Date.now() / 1000),
          },
        }),
        transform: (response: any): Customer => {
          return transformApiCustomerToModel(response);
        },
      })
      
      // Delete operation
      .delete({
        request: (id: string) => ({
          endpoint: `/customers/${id}`,
          method: "DELETE" as const,
        }),
      })
      
      // Bulk operations
      .bulk({
        create: {
          request: (items: Customer[]) => ({
            endpoint: "/customers/bulk",
            method: "POST" as const,
            data: {
              customers: items.map((item) => ({
                ...transformModelToApiCustomer(item),
                created_timestamp: Math.floor(Date.now() / 1000),
                updated_timestamp: Math.floor(Date.now() / 1000),
              })),
            },
          }),
          batchSize: 100,
        },
        update: {
          request: (items: Array<{ id: string; data: Partial<Customer> }>) => ({
            endpoint: "/customers/bulk-update",
            method: "PATCH" as const,
            data: {
              updates: items.map((item) => ({
                customer_id: item.id,
                ...transformModelToApiCustomer(item.data),
                updated_timestamp: Math.floor(Date.now() / 1000),
              })),
            },
          }),
          batchSize: 50,
        },
        delete: {
          request: (ids: string[]) => ({
            endpoint: "/customers/bulk-delete",
            method: "POST" as const,
            data: { customer_ids: ids },
          }),
          batchSize: 200,
        },
      })
  )
  .build();

// Step 7: Usage examples showing full type safety
async function demonstrateTypeSafety() {
  const customerConnector = customerSyncConnector.getModelConnector("customer");
  
  if (!customerConnector) {
    throw new Error("Customer connector not found");
  }

  // List customers with pagination
  if (customerConnector.list) {
    // First page
    const firstPage = await customerConnector.list({ page: 1, limit: 20 });
    console.log(`Retrieved ${firstPage.items.length} customers`);
    
    // Using cursor pagination
    if (firstPage.nextCursor) {
      const nextPage = await customerConnector.list({ 
        cursor: firstPage.nextCursor, 
        limit: 20 
      });
      console.log(`Retrieved ${nextPage.items.length} more customers`);
    }
    
    // TypeScript knows the exact shape of items
    firstPage.items.forEach((customer) => {
      console.log(`Customer: ${customer.name} (${customer.email})`);
      console.log(`Status: ${customer.active ? "Active" : "Inactive"}`);
      if (customer.phone) {
        console.log(`Phone: ${customer.phone}`);
      }
    });
  }

  // Create a new customer
  if (customerConnector.create) {
    const newCustomer = await customerConnector.create({
      id: "cust_123",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        source: "web",
        referrer: "google",
      },
    });
    console.log(`Created customer: ${newCustomer.id}`);
  }

  // Update a customer
  if (customerConnector.update) {
    const updatedCustomer = await customerConnector.update("cust_123", {
      name: "John Smith",
      metadata: {
        source: "web",
        referrer: "google",
        lastUpdated: "manual",
      },
    });
    console.log(`Updated customer: ${updatedCustomer.name}`);
  }

  // Bulk create customers
  if (customerConnector.bulkCreate) {
    const customers: Customer[] = [
      {
        id: "cust_124",
        name: "Jane Doe",
        email: "jane@example.com",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "cust_125",
        name: "Bob Smith",
        email: "bob@example.com",
        phone: "+9876543210",
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    const created = await customerConnector.bulkCreate(customers);
    console.log(`Bulk created ${created.length} customers`);
  }

  // Delete a customer
  if (customerConnector.delete) {
    await customerConnector.delete("cust_123");
    console.log("Deleted customer");
  }

  // Run full sync
  await customerSyncConnector.sync();
}

// Export for use in other files
export { customerSyncConnector, demonstrateTypeSafety };

// Example showing type errors (commented out as they would cause compilation errors)
/*
// This would cause a TypeScript error - missing required fields
const invalidCustomer = await customerConnector.create({
  name: "Invalid Customer",
  // Error: Missing required fields: id, email, active, createdAt, updatedAt
});

// This would cause a TypeScript error - wrong field types
const invalidCustomer2 = await customerConnector.create({
  id: 123, // Error: Type 'number' is not assignable to type 'string'
  name: "Invalid Customer",
  email: "invalid@example.com",
  active: "yes", // Error: Type 'string' is not assignable to type 'boolean'
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// This would cause a TypeScript error - accessing non-existent properties
firstPage.items.forEach((customer) => {
  console.log(customer.customer_id); // Error: Property 'customer_id' does not exist
  console.log(customer.full_name); // Error: Property 'full_name' does not exist
});
*/