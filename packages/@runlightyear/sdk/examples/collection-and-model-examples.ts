import { z } from "zod";
import { defineCollection, defineModel, match } from "../src";
import type { Collection, Model } from "../src/types";

/**
 * Collection and Model Examples
 *
 * These examples demonstrate how to create collections and models using the SDK.
 * Collections are containers for models, and models define the structure of data.
 */

/**
 * Define a collection with just a name
 */
const basicCollection = defineCollection("contacts").deploy();

console.log("Basic collection:", basicCollection.name); // "contacts"

/**
 * Define a collection with a name and a title
 */
const titledCollection = defineCollection("customers")
  .withTitle("Customer Management")
  .deploy();

console.log("Collection with title:", titledCollection.title); // "Customer Management"

/**
 * Define a base collection builder with a name and title (not deployed) and then a new collection that overrides them both and deploy it
 */
// Create base builder (not deployed)
const baseCollectionBuilder = defineCollection("base_users").withTitle(
  "Base User Collection"
);

// Override both name and title, then deploy
const overriddenCollection = baseCollectionBuilder
  .withName("production_users")
  .withTitle("Production User Management")
  .deploy();

console.log("Overridden name:", overriddenCollection.name); // "production_users"
console.log("Overridden title:", overriddenCollection.title); // "Production User Management"

/**
 * Define a collection with a name and a title and a model (no schema)
 */
const collectionWithModel =
  defineCollection("tasks").withTitle("Task Management");

// Define model without schema
const taskModel = defineModel(collectionWithModel, "task")
  .withTitle("Task")
  .deploy();

const deployedTaskCollection = collectionWithModel.deploy();

console.log("Collection models:", deployedTaskCollection.models.length); // 1
console.log("Model name:", deployedTaskCollection.models[0].name); // "task"

/**
 * Define a collection with a name and a title and a model (with schema) defined inline
 */
const ordersCollection = defineCollection("orders")
  .withTitle("Order Management")
  .addModel("order", {
    title: "Order",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        customerId: { type: "string" },
        total: { type: "number" },
        status: { type: "string", enum: ["pending", "completed", "cancelled"] },
      },
      required: ["id", "customerId", "total", "status"],
    },
  })
  .deploy();

console.log(
  "Orders collection model schema:",
  ordersCollection.models[0].schema
);

/**
 * Define a collection with a name and a title and a model (with schema) and match pattern
 */
const productsCollection = defineCollection("products")
  .withTitle("Product Catalog")
  .addModel("product", {
    title: "Product",
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        sku: { type: "string" },
        name: { type: "string" },
        price: { type: "number" },
      },
      required: ["id", "sku", "name", "price"],
    },
    matchPattern: "$.sku", // Match products by SKU
  })
  .deploy();

console.log(
  "Product match pattern:",
  productsCollection.models[0].matchPattern
);

/**
 * Define a collection with a number of models with schemas
 */
const ecommerceCollection = defineCollection("ecommerce")
  .withTitle("E-commerce Platform")
  .addModel("customer", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string", format: "email" },
        name: { type: "string" },
      },
      required: ["id", "email", "name"],
    },
  })
  .addModel("product", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        price: { type: "number" },
        inventory: { type: "integer" },
      },
      required: ["id", "name", "price"],
    },
  })
  .addModel("order", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        customerId: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              productId: { type: "string" },
              quantity: { type: "integer" },
            },
          },
        },
      },
      required: ["id", "customerId", "items"],
    },
  })
  .deploy();

console.log("E-commerce models count:", ecommerceCollection.models.length); // 3

/**
 * Define a collection with a number of models with schemas and match patterns
 */
const crmCollection = defineCollection("crm")
  .withTitle("Customer Relationship Management")
  .addModel("contact", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        email: { type: "string", format: "email" },
        phone: { type: "string" },
      },
      required: ["id", "email"],
    },
    matchPattern: match.or(match.property("email"), match.property("phone")),
  })
  .addModel("company", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        domain: { type: "string" },
      },
      required: ["id", "name"],
    },
    matchPattern: "$.domain",
  })
  .addModel("deal", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        value: { type: "number" },
        stage: { type: "string" },
      },
      required: ["id", "title", "value"],
    },
    matchPattern: match.and(match.property("id"), match.property("stage")),
  })
  .deploy();

console.log(
  "CRM models with patterns:",
  crmCollection.models.map((m) => m.matchPattern)
);

/**
 * Define a collection with a number of models with schemas and match patterns and a connector
 */
// This example shows the collection definition with models
// Note: The actual connector would be a SyncConnector created separately
const apiCollection = defineCollection("api_entities")
  .withTitle("API Entities")
  .addModel("user", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        username: { type: "string" },
        email: { type: "string", format: "email" },
        isActive: { type: "boolean" },
      },
      required: ["id", "username", "email"],
    },
    matchPattern: match.or("$.username", "$.email"),
  })
  .addModel("post", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        userId: { type: "string" },
        title: { type: "string" },
        content: { type: "string" },
        published: { type: "boolean" },
      },
      required: ["id", "userId", "title", "content"],
    },
    matchPattern: "$.id",
  })
  .deploy();

// The connector would be created separately using createSyncConnector
console.log("API collection ready for connector:", apiCollection.name);

/**
 * Define a base collection builder with some models and schemas (not deployed) and then extend it with an additional model and schema and deploy it
 */
// Base collection builder with initial models (not deployed)
const baseInventoryBuilder = defineCollection("inventory")
  .withTitle("Inventory Management")
  .addModel("item", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        quantity: { type: "integer" },
      },
      required: ["id", "name", "quantity"],
    },
  })
  .addModel("warehouse", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        location: { type: "string" },
        capacity: { type: "integer" },
      },
      required: ["id", "location"],
    },
  });

// Extend with additional model and deploy
const extendedInventoryCollection = baseInventoryBuilder
  .addModel("supplier", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        contactEmail: { type: "string", format: "email" },
      },
      required: ["id", "name"],
    },
  })
  .deploy();

console.log(
  "Extended collection models:",
  extendedInventoryCollection.models.map((m) => m.name)
);
// ["item", "warehouse", "supplier"]

/**
 * Define a base collection builder with a model and schema (not deployed) and then a new collection with a modification of one of the models and schema and deploy it
 */
// Base collection with user model (not deployed)
const baseAuthBuilder = defineCollection("auth").withTitle("Authentication");

// Define base user model
const baseUserModel = defineModel(baseAuthBuilder, "user")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
    required: ["id", "email", "password"],
  })
  .deploy();

// Create new collection with enhanced user model
const enhancedAuthBuilder = defineCollection("auth_enhanced").withTitle(
  "Enhanced Authentication"
);

// Define enhanced user model with additional properties
const enhancedUserModel = defineModel(enhancedAuthBuilder, "user")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
      role: { type: "string", enum: ["admin", "user", "guest"] },
      lastLogin: { type: "string", format: "date-time" },
      isActive: { type: "boolean", default: true },
    },
    required: ["id", "email", "password", "role"],
  })
  .withMatchPattern(
    match.and(match.property("email"), match.property("isActive"))
  )
  .deploy();

const enhancedAuthCollection = enhancedAuthBuilder.deploy();

console.log(
  "Enhanced user model has match pattern:",
  enhancedAuthCollection.models[0].matchPattern !== undefined
);

/**
 * Define a model on a collection, but separate from the collection definition
 */
// First define the collection
const blogCollection = defineCollection("blog")
  .withTitle("Blog System")
  .deploy();

// Then define a model separately
const articleModel = defineModel(blogCollection, "article")
  .withTitle("Article")
  .deploy();

console.log("Separately defined model:", blogCollection.models[0].name); // "article"

/**
 * Define a model on a collection with a schema, but separate from the collection definition
 */
// Define collection first
const forumCollection = defineCollection("forum")
  .withTitle("Forum Platform")
  .deploy();

// Define model with schema separately
const topicModel = defineModel(forumCollection, "topic")
  .withTitle("Forum Topic")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      author: { type: "string" },
      content: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      replies: { type: "integer", minimum: 0 },
    },
    required: ["id", "title", "author", "content"],
  })
  .deploy();

console.log(
  "Topic model schema properties:",
  Object.keys((forumCollection.models[0].schema as any).properties || {})
);

/**
 * Define a model on a collection with a schema and a match pattern, but separate from the collection
 */
// Define collection
const socialCollection = defineCollection("social")
  .withTitle("Social Network")
  .deploy();

// Define model with schema and match pattern
const profileModel = defineModel(socialCollection, "profile")
  .withTitle("User Profile")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      username: { type: "string", pattern: "^[a-zA-Z0-9_]+$" },
      displayName: { type: "string" },
      bio: { type: "string", maxLength: 500 },
      verified: { type: "boolean" },
    },
    required: ["id", "username", "displayName"],
  })
  .withMatchPattern(match.or("$.username", match.and("$.id", "$.verified")))
  .deploy();

console.log(
  "Profile model has complex match pattern:",
  socialCollection.models[0].matchPattern !== undefined
);

/**
 * Infer the type of a model schema directly from the collection and demonstrate the type's usage and demostrate it works with positive and negative examples (use ts-expect-error to demonstrate the errors)
 */

// Define a strongly-typed model using Zod
const userZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().int().positive(),
  isActive: z.boolean(),
  roles: z.array(z.enum(["admin", "user", "guest"])),
  metadata: z
    .object({
      lastLogin: z.string().datetime(),
      loginCount: z.number().int(),
    })
    .optional(),
});

// Create collection and model with Zod schema
const typedCollection =
  defineCollection("typed_users").withTitle("Typed Users");

const typedUserModel = defineModel(typedCollection, "user")
  .withSchema(userZodSchema)
  .deploy();

const deployedTypedCollection = typedCollection.deploy();

// Infer the type from the schema
type InferredUser = z.infer<typeof userZodSchema>;

// Positive example - correct usage
const validUser: InferredUser = {
  id: "user-123",
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  isActive: true,
  roles: ["user", "admin"],
  metadata: {
    lastLogin: "2024-01-15T10:30:00Z",
    loginCount: 42,
  },
};

// Also valid - optional metadata omitted
const validUserWithoutMetadata: InferredUser = {
  id: "user-456",
  name: "Jane Smith",
  email: "jane@example.com",
  age: 25,
  isActive: false,
  roles: ["user"],
};

// Negative examples - TypeScript errors

// @ts-expect-error - missing required field 'email'
const invalidUserMissingEmail: InferredUser = {
  id: "user-789",
  name: "Invalid User",
  age: 20,
  isActive: true,
  roles: ["guest"],
};

const invalidUserWrongAgeType: InferredUser = {
  id: "user-bad-1",
  name: "Bad User",
  email: "bad@example.com",
  // @ts-expect-error - wrong type for 'age' (string instead of number)
  age: "thirty", // Should be number
  isActive: true,
  roles: ["user"],
};

const invalidUserBadRole: InferredUser = {
  id: "user-bad-2",
  name: "Bad Role User",
  email: "badrole@example.com",
  age: 35,
  isActive: true,
  // @ts-expect-error - invalid role value
  roles: ["user", "superadmin"], // 'superadmin' is not valid
};

const invalidUserExtraProperty: InferredUser = {
  id: "user-bad-3",
  name: "Extra Prop User",
  email: "extra@example.com",
  age: 40,
  isActive: true,
  roles: ["admin"],
  // @ts-expect-error - extra property not in schema
  extraField: "not allowed", // This field doesn't exist in schema
};

/**
 * Infer a type with the model names that are part of a collection directly from the collection and demonstrate the type's usage and demostrate it works with positive and negative examples (use ts-expect-error to demonstrate the errors)
 */

// Define a collection with multiple models
const multiModelCollection = defineCollection("multi_model")
  .withTitle("Multi-Model System")
  .addModel("user", {
    schema: {
      type: "object",
      properties: { id: { type: "string" } },
    },
  })
  .addModel("post", {
    schema: {
      type: "object",
      properties: { id: { type: "string" } },
    },
  })
  .addModel("comment", {
    schema: {
      type: "object",
      properties: { id: { type: "string" } },
    },
  })
  .deploy();

// Type to extract model names from a collection
type ExtractModelNames<C extends Collection> = C["models"][number]["name"];

// Infer the model names type
type MultiModelNames = ExtractModelNames<typeof multiModelCollection>;

// Positive examples - valid model names
const validModelName1: MultiModelNames = "user";
const validModelName2: MultiModelNames = "post";
const validModelName3: MultiModelNames = "comment";

// Function that accepts only valid model names
function getModelByName(name: MultiModelNames): Model | undefined {
  return multiModelCollection.models.find((m) => m.name === name);
}

// Valid usage
const userModel = getModelByName("user");
const postModel = getModelByName("post");
const commentModel = getModelByName("comment");

// Negative examples - TypeScript errors

// @ts-expect-error - 'article' is not a valid model name
const invalidModelName1: MultiModelNames = "article";

// @ts-expect-error - 'product' is not a valid model name
const invalidModelName2: MultiModelNames = "product";

// @ts-expect-error - invalid model name passed to function
const invalidModel = getModelByName("nonexistent");

// Create a type-safe model selector
function createModelSelector<C extends Collection>(collection: C) {
  return function selectModel<M extends ExtractModelNames<C>>(modelName: M) {
    return collection.models.find((m) => m.name === modelName);
  };
}

const selectMultiModel = createModelSelector(multiModelCollection);

// Valid selections
const selectedUser = selectMultiModel("user");
const selectedPost = selectMultiModel("post");

// @ts-expect-error - 'invalid' is not a model in the collection
const selectedInvalid = selectMultiModel("invalid");

// Export for potential use in other examples
export {
  basicCollection,
  multiModelCollection,
  typedCollection,
  type InferredUser,
  type MultiModelNames,
};
