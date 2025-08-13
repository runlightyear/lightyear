import { z } from "zod";
import {
  defineCollection,
  createRestConnector,
  createSyncConnector,
  createListConfig,
} from "../src";
import { createPaginatedResponseSchema } from "../src/builders/typedSyncHelpers";

/**
 * Sync Connector Examples
 * 
 * These examples demonstrate how to use sync connectors with proper type safety.
 * 
 * Key features shown:
 * 1. Type-safe transform functions - receives the full API response typed with the 
 *    response schema and must return an array matching the collection's model schema
 * 2. Using createListConfig helper for better type inference
 * 3. Using builder methods like listWithSchema for inline type safety
 * 4. Transform functions that handle various API response structures (paginated, 
 *    wrapped, nested) and map them to collection models
 * 
 * The transform function gives you full control over how to extract items from
 * complex API responses while maintaining type safety.
 */

/**
 * Define a basic sync connector that works with a rest api and a collection
 */

const ContactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Contact = z.infer<typeof ContactSchema>;

const basicCollection = defineCollection("contacts")
  .withTitle("Contacts")
  .addModel("contact", {
    title: "Contact",
    schema: ContactSchema as any,
  })
  .deploy();

const basicRestConnector = createRestConnector()
  .withBaseUrl("https://api.example.com")
  .addHeader("Authorization", "Bearer ${auth.accessToken}")
  .build();

const basicSyncConnector = createSyncConnector(
  basicRestConnector,
  basicCollection
).build();

// Demonstrate type inference - getModelConnector should return undefined for non-existent models
const basicContactConnector = basicSyncConnector.getModelConnector("contact");
const basicNonExistent = basicSyncConnector.getModelConnector(
  "nonExistent" as any
);

// Use the sync method to verify the connector works
async function useBasicConnector() {
  await basicSyncConnector.sync();
}

/**
 * Define a sync connector that works with a rest api and a collection and has a list method
 * 
 * This example demonstrates the current limitation: the transform function parameter
 * is typed as 'any' even though we provide a responseSchema. Ideally, it should be
 * typed as CustomerApiResponse automatically.
 */

const listCollection = defineCollection("customers")
  .withTitle("Customers")
  .addModel("customer", {
    title: "Customer",
    schema: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      status: z.enum(["active", "inactive"]),
    }) as any,
  })
  .deploy();

const listRestConnector = createRestConnector()
  .withBaseUrl("https://api.crm.com/v1")
  .addHeader("X-API-Key", "${secrets.apiKey}")
  .build();

// Define the actual API response schema (different from our model)
const customerApiResponseSchema = z.object({
  customer_id: z.string(),
  full_name: z.string(),
  email_address: z.string().email(),
  is_active: z.boolean(),
  created_at: z.string(),
  tier: z.string().optional(),
});

type CustomerApiResponse = z.infer<typeof customerApiResponseSchema>;

// Define our desired model type that matches the collection schema
interface Customer {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

// Define a response schema for the list endpoint
const customerListResponseSchema = z.object({
  customers: z.array(customerApiResponseSchema),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

type CustomerListResponse = z.infer<typeof customerListResponseSchema>;

// Using the new createListConfig helper for better type inference
const customerListConfig = createListConfig<Customer, CustomerListResponse>({
  request: {
    endpoint: "/customers",
    method: "GET",
  },
  responseSchema: customerListResponseSchema,
  pagination: {
    type: "page",
    pageSize: 50,
    pageField: "page",
    limitField: "limit",
  },
  // Transform function receives the full response and returns an array
  transform: (response) => {
    return response.customers.map((customer) => ({
      id: customer.customer_id,
      name: customer.full_name,
      email: customer.email_address,
      status: customer.is_active ? "active" : "inactive",
    }));
  },
});

const listSyncConnector = createSyncConnector(listRestConnector, listCollection)
  .with("customer", {
    list: customerListConfig,
  })
  .build();

// Alternative approach using the builder method with inline config
const listSyncConnectorAlt = createSyncConnector(listRestConnector, listCollection)
  .with("customer", {
    list: {
      request: {
        endpoint: "/customers",
        method: "GET",
      },
      responseSchema: customerListResponseSchema,
      pagination: {
        type: "page",
        pageSize: 50,
        pageField: "page",
        limitField: "limit",
      },
      // Transform receives full response and returns array
      transform: (response: CustomerListResponse): Customer[] => {
        return response.customers.map((customer) => ({
          id: customer.customer_id,
          name: customer.full_name,
          email: customer.email_address,
          status: customer.is_active ? "active" : "inactive",
        }));
      },
    },
  })
  .build();

// Use the list sync connector to demonstrate type inference
async function useListConnector() {
  const customerConnector = listSyncConnector.getModelConnector("customer");

  if (customerConnector?.list) {
    const { items, nextCursor } = await customerConnector.list({ page: 1 });

    // Type inference shows items as transformed customers
    items.forEach((customer) => {
      console.log(
        `Customer ${customer.id}: ${customer.name} (${customer.status})`
      );
      console.log(`Email: ${customer.email}`);
      
      // TypeScript would show error if we tried to access non-existent property
      // For example: console.log(customer.customer_id); // Error: Property 'customer_id' does not exist
    });

    console.log(`Next cursor: ${nextCursor}`);
  }
}

/**
 * Define a sync connector that works with a rest api and a collection and has a list method and a create method
 */

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(["admin", "user", "guest"]),
  isActive: z.boolean(),
});

type User = z.infer<typeof UserSchema>;

const usersCollection = defineCollection("users")
  .withTitle("Users")
  .addModel("user", {
    title: "User",
    schema: UserSchema as any,
  })
  .deploy();

const usersRestConnector = createRestConnector()
  .withBaseUrl("https://api.userservice.com/v2")
  .withHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer ${auth.accessToken}",
  })
  .build();

const usersSyncConnector = createSyncConnector(
  usersRestConnector,
  usersCollection
)
  .add("user", (builder) =>
    builder
      .list({
        request: {
          endpoint: "/users",
        },
        responseSchema: createPaginatedResponseSchema(UserSchema),
        pagination: {
          type: "cursor",
          cursorField: "nextCursor",
          pageSize: 100,
        },
        // Transform receives the paginated response
        transform: (response) => {
          // Extract users from the 'data' field
          return response.data.map((user) => ({
            ...user,
            // Can add computed properties
            displayName: `${user.firstName} ${user.lastName}`,
          }));
        },
      })
      .create({
        request: {
          endpoint: "/users",
          method: "POST",
        },
      })
  )
  .build();

// Use the users sync connector to demonstrate type inference with list and create
async function useUsersConnector() {
  const userConnector = usersSyncConnector.getModelConnector("user");

  if (userConnector?.list) {
    // List users
    const { items } = await userConnector.list();

    items.forEach((user) => {
      // Type inference shows all User properties plus computed ones
      console.log(`User: ${user.username} (${user.email})`);
      console.log(`Name: ${user.firstName} ${user.lastName}`);
      console.log(`Role: ${user.role}, Active: ${user.isActive}`);
      // If using transform with computed property:
      // console.log(`Display: ${user.displayName}`);
    });
  }

  if (userConnector?.create) {
    // Create a new user
    const newUser = await userConnector.create({
      id: "user-123",
      username: "johndoe",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "user",
      isActive: true,
    });

    // Type inference should show newUser as User type
    console.log(`Created user: ${newUser.username} with ID: ${newUser.id}`);
  }
}

/**
 * Define a sync connector that works with a rest api and a collection and has a list method and a create, update, and delete method
 */

const ProductSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  currency: z.string(),
  inventory: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type Product = z.infer<typeof ProductSchema>;

const fullCrudCollection = defineCollection("products")
  .withTitle("Products")
  .addModel("product", {
    title: "Product",
    schema: ProductSchema as any,
    matchPattern: "$.sku",
  })
  .deploy();

const fullCrudRestConnector = createRestConnector()
  .withBaseUrl("https://api.ecommerce.com")
  .addHeader("X-Store-ID", "${variables.storeId}")
  .addHeader("Authorization", "Bearer ${auth.accessToken}")
  .build();

// Define the API response schema separately for clarity
const productApiResponseSchema = z.object({
  products: z.array(ProductSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    hasNext: z.boolean(),
  }),
});

type ProductApiResponse = z.infer<typeof productApiResponseSchema>;

const fullCrudSyncConnector = createSyncConnector(
  fullCrudRestConnector,
  fullCrudCollection
)
  .add("product", (builder) =>
    builder
      .list({
        request: {
          endpoint: "/api/v3/products",
          method: "GET",
        },
        responseSchema: productApiResponseSchema,
        pagination: {
          type: "page",
          pageSize: 100,
          pageField: "page",
          limitField: "limit",
        },
        // Transform receives full response with products array
        transform: (response) => {
          return response.products.map((item) => ({
            ...item,
            // Convert price from cents to dollars if needed
            price:
              typeof item.price === "number" && item.price > 1000
                ? item.price / 100
                : item.price,
            // Ensure tags is always an array
            tags: item.tags || [],
          }));
        },
      })
      .create({
        request: {
          endpoint: "/api/v3/products",
          method: "POST",
        },
        // Transform request to match API expectations
        transformRequest: (data: Product) => ({
          ...data,
          // Convert price to cents for API
          price: Math.round(data.price * 100),
        }),
        // Transform response back to match collection model
        transform: (response: any) => ({
          ...response,
          // Convert price back from cents
          price: response.price / 100,
          tags: response.tags || [],
        }),
      })
      .update({
        request: {
          endpoint: (id: string) => `/api/v3/products/${id}`,
          method: "PUT",
        },
        transformRequest: (data: Partial<Product>) => ({
          ...data,
          // Convert price to cents if present
          ...(data.price !== undefined && {
            price: Math.round(data.price * 100),
          }),
        }),
        transform: (response: any) => ({
          ...response,
          price: response.price / 100,
          tags: response.tags || [],
        }),
      })
      .delete({
        request: {
          endpoint: (id: string) => `/api/v3/products/${id}`,
          method: "DELETE",
        },
      })
      .bulk({
        create: {
          request: {
            endpoint: "/api/v3/products/bulk",
            method: "POST",
          },
          batchSize: 50,
        },
        update: {
          request: {
            endpoint: "/api/v3/products/bulk",
            method: "PATCH",
          },
          batchSize: 50,
        },
        delete: {
          request: {
            endpoint: "/api/v3/products/bulk-delete",
            method: "POST",
          },
          batchSize: 100,
        },
      })
  )
  .build();

// Use the full CRUD sync connector to demonstrate all operations with type inference
async function useFullCrudConnector() {
  // Get a model connector
  const productConnector = fullCrudSyncConnector.getModelConnector("product");

  if (productConnector?.list) {
    // List products
    const { items, nextCursor } = await productConnector.list({ page: 1 });
    console.log(`Found ${items.length} products`);

    // Create a product
    if (productConnector.create) {
      const newProduct = await productConnector.create({
        id: "prod-123",
        sku: "SKU-001",
        name: "Example Product",
        description: "A great product",
        price: 99.99,
        currency: "USD",
        inventory: 100,
        category: "Electronics",
        tags: ["new", "featured"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      console.log("Created product:", newProduct);
    }

    // Update a product
    if (productConnector.update) {
      const updatedProduct = await productConnector.update("prod-123", {
        price: 89.99,
        inventory: 95,
      });
      console.log("Updated product:", updatedProduct);
    }

    // Bulk create products
    if (productConnector.bulkCreate) {
      const products: Product[] = [
        {
          id: "prod-124",
          sku: "SKU-002",
          name: "Product 2",
          description: "Another product",
          price: 149.99,
          currency: "USD",
          inventory: 50,
          category: "Electronics",
          tags: ["premium"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "prod-125",
          sku: "SKU-003",
          name: "Product 3",
          description: "Yet another product",
          price: 199.99,
          currency: "USD",
          inventory: 25,
          category: "Electronics",
          tags: ["premium", "limited"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const createdProducts = await productConnector.bulkCreate(products);
      console.log(`Created ${createdProducts.length} products in bulk`);
    }

    // Delete a product
    if (productConnector.delete) {
      await productConnector.delete("prod-123");
      console.log("Deleted product");
    }
  }

  // Run a full sync
  await fullCrudSyncConnector.sync();
}
