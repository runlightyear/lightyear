/**
 * Enhanced Sync Connector Example
 * 
 * This example demonstrates a complete sync connector implementation with:
 * - Type-safe transformations using Zod schemas
 * - Bidirectional sync (read from app, write to app)
 * - Pagination support
 * - CRUD operations
 * - Automatic validation
 */

import { z } from "zod";
import { defineTypedCollection, defineEnhancedSyncConnector, match } from "../src";
import type { ExtractModelTypes, SyncChange } from "../src";

// Define the JSON Schema for our user model
const userSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    email: { type: "string", format: "email" },
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    role: {
      type: "string",
      enum: ["admin", "user", "guest"] as const
    },
    isActive: { type: "boolean" },
    metadata: {
      type: "object",
      properties: {
        lastLogin: { type: ["string", "null"], format: "date-time" },
        loginCount: { type: "integer", minimum: 0 },
        preferences: {
          type: "object",
          properties: {
            theme: { type: "string", enum: ["light", "dark"] as const },
            language: { type: "string" }
          },
          required: ["theme", "language"]
        }
      },
      required: ["loginCount", "preferences"]
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["id", "email", "firstName", "lastName", "role", "isActive", "metadata", "createdAt", "updatedAt"],
  additionalProperties: false
} as const;

// Create a typed collection
const userCollection = defineTypedCollection("users")
  .withTitle("User Management")
  .addModel("user", userSchema, (model) =>
    model
      .withTitle("User")
      .withMatchPattern(match.property("email"))
  )
  .deploy();

// Extract the user type
type UserTypes = ExtractModelTypes<typeof userCollection>;
type User = UserTypes["user"];

// Define Zod schema for the API response
// This represents how the external API returns user data
const apiUserSchema = z.object({
  user_id: z.string(),
  email_address: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  user_role: z.enum(["ADMIN", "STANDARD", "READONLY"]),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]),
  last_login_date: z.string().datetime().nullable(),
  total_logins: z.number().int().min(0),
  settings: z.object({
    ui_theme: z.enum(["LIGHT", "DARK"]),
    locale: z.string()
  }),
  created_timestamp: z.string().datetime(),
  modified_timestamp: z.string().datetime()
});

// Define the paginated response schema
const paginatedUsersSchema = z.object({
  users: z.array(apiUserSchema),
  pagination: z.object({
    page: z.number(),
    per_page: z.number(),
    total_pages: z.number(),
    total_count: z.number(),
    has_next: z.boolean()
  })
});

// Type inference from Zod schema
type ApiUser = z.infer<typeof apiUserSchema>;
type PaginatedUsersResponse = z.infer<typeof paginatedUsersSchema>;

// Create the enhanced sync connector
const userSyncConnector = defineEnhancedSyncConnector("user-api")
  .withBaseUrl("https://api.example.com/v2")
  .addHeader("X-API-Key", process.env.USER_API_KEY || "demo-key")
  .withCollection(userCollection)
  
  .defineModelConnector("user", {
    // List configuration with pagination
    list: {
      endpoint: (params) => `/users?page=${params.page || 1}&limit=${params.limit || 50}`,
      method: "GET",
      responseSchema: paginatedUsersSchema,
      
      // Type-safe transformation from API format to model format
      transform: (apiUser: ApiUser): User => ({
        id: apiUser.user_id,
        email: apiUser.email_address,
        firstName: apiUser.first_name,
        lastName: apiUser.last_name,
        role: apiUser.user_role === "ADMIN" ? "admin" : 
              apiUser.user_role === "READONLY" ? "guest" : "user",
        isActive: apiUser.status === "ACTIVE",
        metadata: {
          lastLogin: apiUser.last_login_date,
          loginCount: apiUser.total_logins,
          preferences: {
            theme: apiUser.settings.ui_theme.toLowerCase() as "light" | "dark",
            language: apiUser.settings.locale
          }
        },
        createdAt: apiUser.created_timestamp,
        updatedAt: apiUser.modified_timestamp
      }),
      
      pagination: {
        type: "page",
        pageSize: 50,
        getNextPage: (response: PaginatedUsersResponse) => {
          if (response.pagination.has_next) {
            return { page: response.pagination.page + 1, limit: response.pagination.per_page };
          }
          return null;
        }
      }
    },
    
    // Create configuration
    create: {
      endpoint: "/users",
      method: "POST",
      
      // Transform from model format to API format
      transform: (user: User) => ({
        email_address: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        user_role: user.role === "admin" ? "ADMIN" : 
                   user.role === "guest" ? "READONLY" : "STANDARD",
        status: user.isActive ? "ACTIVE" : "INACTIVE",
        settings: {
          ui_theme: user.metadata.preferences.theme.toUpperCase(),
          locale: user.metadata.preferences.language
        }
      }),
      
      // Transform API response to get created ID and timestamps
      responseTransform: (response) => ({
        id: response.user_id,
        createdAt: response.created_timestamp,
        updatedAt: response.modified_timestamp
      })
    },
    
    // Update configuration
    update: {
      endpoint: (id) => `/users/${id}`,
      method: "PATCH",
      
      // Transform only changed fields
      transform: (user: User, previousUser?: User) => {
        const updates: any = {};
        
        if (!previousUser || user.email !== previousUser.email) {
          updates.email_address = user.email;
        }
        if (!previousUser || user.firstName !== previousUser.firstName) {
          updates.first_name = user.firstName;
        }
        if (!previousUser || user.lastName !== previousUser.lastName) {
          updates.last_name = user.lastName;
        }
        if (!previousUser || user.role !== previousUser.role) {
          updates.user_role = user.role === "admin" ? "ADMIN" : 
                             user.role === "guest" ? "READONLY" : "STANDARD";
        }
        if (!previousUser || user.isActive !== previousUser.isActive) {
          updates.status = user.isActive ? "ACTIVE" : "INACTIVE";
        }
        
        return updates;
      },
      
      responseTransform: (response) => ({
        updatedAt: response.modified_timestamp
      })
    },
    
    // Delete configuration
    delete: {
      endpoint: (id) => `/users/${id}`,
      method: "DELETE"
    },
    
    // ID field configuration
    idField: "id"
  })
  
  .deploy();

// Example usage
async function demonstrateEnhancedSync() {
  console.log("=== Enhanced Sync Connector Demo ===\n");
  
  // 1. List users with pagination
  console.log("1. Listing all users with pagination:");
  try {
    const listResult = await userSyncConnector.list("user", {
      pagination: { page: 1, limit: 100 },
      maxPages: 5 // Limit to 5 pages for demo
    });
    
    console.log(`   Total users synced: ${listResult.data.length}`);
    console.log(`   Validation errors: ${listResult.errors.length}`);
    
    if (listResult.totalCount) {
      console.log(`   Total count from API: ${listResult.totalCount}`);
    }
    
    // Show first few users
    listResult.data.slice(0, 3).forEach(user => {
      console.log(`   - ${user.firstName} ${user.lastName} (${user.email}) - ${user.role}`);
    });
    
    if (listResult.errors.length > 0) {
      console.log("\n   Validation errors:");
      listResult.errors.slice(0, 3).forEach(error => {
        console.log(`   - Record ${error.index}: ${JSON.stringify(error.errors)}`);
      });
    }
  } catch (error) {
    console.error("   Error listing users:", error);
  }
  
  // 2. Create a new user
  console.log("\n2. Creating a new user:");
  const newUser: User = {
    id: "", // Will be set by API
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    isActive: true,
    metadata: {
      lastLogin: null,
      loginCount: 0,
      preferences: {
        theme: "light",
        language: "en-US"
      }
    },
    createdAt: "", // Will be set by API
    updatedAt: "" // Will be set by API
  };
  
  try {
    const createdUser = await userSyncConnector.create("user", newUser);
    console.log(`   Created user: ${createdUser.firstName} ${createdUser.lastName}`);
    console.log(`   User ID: ${createdUser.id}`);
  } catch (error) {
    console.error("   Error creating user:", error);
  }
  
  // 3. Update an existing user
  console.log("\n3. Updating a user:");
  const userToUpdate: User = {
    id: "user-123",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith-Johnson", // Changed
    role: "admin", // Changed from "user" to "admin"
    isActive: true,
    metadata: {
      lastLogin: new Date().toISOString(),
      loginCount: 42,
      preferences: {
        theme: "dark", // Changed
        language: "en-US"
      }
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: new Date().toISOString()
  };
  
  try {
    const updatedUser = await userSyncConnector.update("user", userToUpdate);
    console.log(`   Updated user: ${updatedUser.firstName} ${updatedUser.lastName}`);
    console.log(`   New role: ${updatedUser.role}`);
  } catch (error) {
    console.error("   Error updating user:", error);
  }
  
  // 4. Delete a user
  console.log("\n4. Deleting a user:");
  const userToDelete: User = {
    id: "user-456",
    email: "delete.me@example.com",
    firstName: "Delete",
    lastName: "Me",
    role: "guest",
    isActive: false,
    metadata: {
      lastLogin: null,
      loginCount: 0,
      preferences: {
        theme: "light",
        language: "en-US"
      }
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  };
  
  try {
    await userSyncConnector.delete("user", userToDelete);
    console.log(`   Deleted user: ${userToDelete.email}`);
  } catch (error) {
    console.error("   Error deleting user:", error);
  }
  
  // 5. Sync multiple changes at once
  console.log("\n5. Syncing multiple changes:");
  const changes: SyncChange<User>[] = [
    {
      operation: "create",
      id: "new-1",
      data: {
        id: "",
        email: "bulk1@example.com",
        firstName: "Bulk",
        lastName: "User1",
        role: "user",
        isActive: true,
        metadata: {
          lastLogin: null,
          loginCount: 0,
          preferences: { theme: "light", language: "en-US" }
        },
        createdAt: "",
        updatedAt: ""
      }
    },
    {
      operation: "update",
      id: "user-789",
      data: {
        id: "user-789",
        email: "existing@example.com",
        firstName: "Existing",
        lastName: "User-Updated",
        role: "admin",
        isActive: true,
        metadata: {
          lastLogin: new Date().toISOString(),
          loginCount: 100,
          preferences: { theme: "dark", language: "en-GB" }
        },
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: new Date().toISOString()
      }
    },
    {
      operation: "delete",
      id: "user-999",
      data: {
        id: "user-999",
        email: "remove@example.com",
        firstName: "Remove",
        lastName: "This",
        role: "guest",
        isActive: false,
        metadata: {
          lastLogin: null,
          loginCount: 0,
          preferences: { theme: "light", language: "en-US" }
        },
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z"
      }
    }
  ];
  
  try {
    const syncResult = await userSyncConnector.syncChanges("user", changes);
    console.log(`   Successful operations: ${syncResult.successful}`);
    console.log(`   Failed operations: ${syncResult.failed.length}`);
    
    if (syncResult.failed.length > 0) {
      console.log("\n   Failed operations:");
      syncResult.failed.forEach(failure => {
        console.log(`   - ${failure.change.operation} ${failure.change.id}: ${failure.error.message}`);
      });
    }
  } catch (error) {
    console.error("   Error syncing changes:", error);
  }
  
  console.log("\n=== Demo Complete ===");
}

// Type safety demonstrations
function typeSafetyExamples() {
  // This would cause a TypeScript error - model doesn't exist
  // userSyncConnector.list("nonexistent");
  
  // This would cause a TypeScript error - incorrect transform return type
  // defineEnhancedSyncConnector("test")
  //   .withCollection(userCollection)
  //   .defineModelConnector("user", {
  //     list: {
  //       responseSchema: apiUserSchema,
  //       transform: (api) => ({ wrong: "type" }) // Error: doesn't match User type
  //     }
  //   });
  
  // Type inference works correctly
  const apiUser: ApiUser = {
    user_id: "123",
    email_address: "test@example.com",
    first_name: "Test",
    last_name: "User",
    user_role: "STANDARD",
    status: "ACTIVE",
    last_login_date: null,
    total_logins: 0,
    settings: {
      ui_theme: "LIGHT",
      locale: "en-US"
    },
    created_timestamp: new Date().toISOString(),
    modified_timestamp: new Date().toISOString()
  };
  
  console.log("API User type is inferred from Zod schema:", apiUser.user_role);
}

export { 
  userCollection, 
  userSyncConnector,
  demonstrateEnhancedSync,
  type User,
  type ApiUser
};