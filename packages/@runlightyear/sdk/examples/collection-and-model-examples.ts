import type { InferModelData } from "../src/types";
import {
  defineCollection,
  defineModel,
  match,
  createRestConnector,
  createSyncConnector,
} from "../src";
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

/**
 * Define a collection with a name and a title
 */
const titledCollection = defineCollection("customers")
  .withTitle("Customer Management")
  .deploy();

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

/**
 * Define a collection with a number of models with schemas and match patterns and a connector
 */
// This example shows the collection definition with models and a connector
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

// Create a REST connector and a Sync connector for this collection
const apiRestConnector = createRestConnector()
  .withBaseUrl("https://api.example.com")
  .addHeader("Authorization", "Bearer {{ accessToken }}")
  .build();

const apiSyncConnector = createSyncConnector(
  apiRestConnector,
  apiCollection
).build();

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

/**
 * Infer the typescript type of a model schema directly from the model which was defined with json schema and demonstrate the type's usage and demostrate it works with positive and negative examples (use ts-expect-error to demonstrate the errors)
 */

const typedCollection =
  defineCollection("typed_users").withTitle("Typed Users");

const typedUserModel = defineModel(typedCollection, "user")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      email: { type: "string", format: "email" },
      age: { type: "integer", minimum: 0 },
      isActive: { type: "boolean" },
      roles: {
        type: "array",
        items: { enum: ["admin", "user", "guest"] },
        minItems: 1,
      },
      metadata: {
        type: "object",
        properties: {
          lastLogin: { type: "string" },
          loginCount: { type: "integer" },
        },
        required: ["lastLogin", "loginCount"],
        additionalProperties: false,
      },
    },
    required: ["id", "name", "email", "age", "isActive", "roles"],
    additionalProperties: false,
  } as const)
  .deploy();

const deployedTypedCollection = typedCollection.deploy();

// Infer the TypeScript type THROUGH the model
type InferredUser = InferModelData<typeof typedUserModel>;

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

// Also valid - metadata present with all required fields
const validUserWithMetadata: InferredUser = {
  id: "user-456",
  name: "Jane Smith",
  email: "jane@example.com",
  age: 25,
  isActive: false,
  roles: ["user"],
  metadata: { lastLogin: "2024-02-01T00:00:00Z", loginCount: 5 },
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
void invalidUserMissingEmail;

const invalidUserWrongAgeType: InferredUser = {
  id: "user-bad-1",
  name: "Bad User",
  email: "bad@example.com",
  // @ts-expect-error - wrong type for 'age' (string instead of number)
  age: "thirty",
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
  roles: ["user", "superadmin"],
};

const invalidUserExtraProperty: InferredUser = {
  id: "user-bad-3",
  name: "Extra Prop User",
  email: "extra@example.com",
  age: 40,
  isActive: true,
  roles: ["admin"],
  // @ts-expect-error - extra property not in schema
  extraField: "not allowed",
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

// For stricter compile-time checks of model names, define a const tuple
const MODEL_NAMES = ["user", "post", "comment"] as const;
type MultiModelNames = (typeof MODEL_NAMES)[number];

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
void userModel;
const postModel = getModelByName("post");
void postModel;
const commentModel = getModelByName("comment");
void commentModel;

// @ts-expect-error - 'article' is not a valid model name in the tuple
const invalidModelName1: MultiModelNames = "article";
void invalidModelName1;

// @ts-expect-error - 'product' is not a valid model name in the tuple
const invalidModelName2: MultiModelNames = "product";
void invalidModelName2;

// Create a type-safe model selector
function createModelSelector<C extends Collection>(collection: C) {
  return function selectModel(modelName: MultiModelNames) {
    return collection.models.find((m) => m.name === modelName);
  };
}

const selectMultiModel = createModelSelector(multiModelCollection);

// Valid selections
const selectedUser = selectMultiModel("user");
void selectedUser;
const selectedPost = selectMultiModel("post");
void selectedPost;
const selectedComment = selectMultiModel("comment");
void selectedComment;

// @ts-expect-error - 'invalid' is not a valid model name in the tuple
const selectedInvalid = selectMultiModel("invalid");
void selectedInvalid;

// Export for potential use in other examples
export {
  basicCollection,
  multiModelCollection,
  typedCollection,
  type InferredUser,
  type MultiModelNames,
};
