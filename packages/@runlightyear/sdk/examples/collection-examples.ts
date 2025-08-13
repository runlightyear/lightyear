/**
 * Collection Examples
 *
 * Various examples showing how to define collections with different configurations
 */

import { defineCollection, defineModel, match } from "../src";

/**
 * Define a collection with just a name
 */

const simpleCollection = defineCollection("contacts").deploy();

/**
 * Define a collection with a name and a title
 */

const titledCollection = defineCollection("products")
  .withTitle("Product Catalog")
  .deploy();

/**
 * Define a base collection builder with a name and title (not deployed) and then a new collection that overrides them both and deploy it
 */

// Create a base collection builder with initial name and title (not deployed)
const baseInventoryBuilder = defineCollection("inventory_v1")
  .withTitle("Legacy Inventory System");
// Note: baseInventoryBuilder is NOT deployed

// Create a new collection that overrides both name and title, then deploy it
const modernInventoryCollection = baseInventoryBuilder
  .withName("inventory_v2")
  .withTitle("Modern Inventory Management")
  .deploy();

/**
 * Define a collection with a name and a title and a model (no schema)
 */

const singleModelCollection = defineCollection("tasks")
  .withTitle("Task Management")
  .addModel("task", {})
  .deploy();

/**
 * Define a collection with a name and a title and a model (with schema)
 */

const schemaCollection = defineCollection("inventory")
  .withTitle("Inventory Management")
  .addModel("item", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        quantity: { type: "number", minimum: 0 },
        price: { type: "number", minimum: 0 },
      },
      required: ["id", "name", "quantity"],
    },
  })
  .deploy();

/**
 * Define a collection with a name and a title and a model (with schema) and match pattern
 */

const patternCollection = defineCollection("orders")
  .withTitle("Order Management")
  .addModel("order", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        customerEmail: { type: "string", format: "email" },
        total: { type: "number" },
        status: {
          type: "string",
          enum: ["pending", "processing", "completed", "cancelled"],
        },
      },
      required: ["id", "total", "status"],
    },
    matchPattern: match.property("customerEmail"),
  })
  .deploy();

/**
 * Define a collection with a number of models with schemas
 */

const multiModelCollection = defineCollection("ecommerce")
  .withTitle("E-commerce Platform")
  .addModel("product", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        price: { type: "number" },
        category: { type: "string" },
      },
      required: ["id", "name", "price"],
    },
  })
  .addModel("category", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        parentId: { type: "string" },
      },
      required: ["id", "name"],
    },
  })
  .addModel("cart", {
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
              quantity: { type: "number" },
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

const complexCollection = defineCollection("support")
  .withTitle("Customer Support System")
  .addModel("ticket", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        priority: { type: "string", enum: ["low", "medium", "high", "urgent"] },
        status: {
          type: "string",
          enum: ["open", "in_progress", "resolved", "closed"],
        },
        customerId: { type: "string" },
      },
      required: ["id", "title", "priority", "status"],
    },
    matchPattern: match.and(
      match.property("priority"),
      match.property("status")
    ),
  })
  .addModel("customer", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        tier: { type: "string", enum: ["basic", "premium", "enterprise"] },
      },
      required: ["id", "name", "email"],
    },
    matchPattern: match.property("email"),
  })
  .addModel("agent", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        specialties: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["id", "name", "email"],
    },
    matchPattern: match.or(
      match.property("email"),
      match.jsonPath("$.contact.email")
    ),
  })
  .deploy();

/**
 * Define a collection with a number of models with schemas and match patterns and a connector
 */

// Note: This would require a sync connector implementation
const connectorCollection = defineCollection("salesforce")
  .withTitle("Salesforce Integration")
  .addModel("account", {
    schema: {
      type: "object",
      properties: {
        Id: { type: "string" },
        Name: { type: "string" },
        Type: { type: "string" },
        Industry: { type: "string" },
        AnnualRevenue: { type: "number" },
      },
      required: ["Id", "Name"],
    },
    matchPattern: match.property("Name"),
  })
  .addModel("contact", {
    schema: {
      type: "object",
      properties: {
        Id: { type: "string" },
        FirstName: { type: "string" },
        LastName: { type: "string" },
        Email: { type: "string", format: "email" },
        AccountId: { type: "string" },
      },
      required: ["Id", "LastName"],
    },
    matchPattern: match.property("Email"),
  })
  // .withSyncConnector(salesforceConnector) // This would be added when sync connectors are implemented
  .deploy();

/**
 * Define a base collection builder with some models and schemas (not deployed) and then extend it with an additional model and schema and deploy it
 */

// Create a base collection builder with employee and department models (not deployed)
const baseHRCollectionBuilder = defineCollection("hr_base")
  .withTitle("HR Base")
  .addModel("employee", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string", format: "email" },
        department: { type: "string" },
      },
      required: ["id", "name", "email"],
    },
  })
  .addModel("department", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        managerId: { type: "string" },
      },
      required: ["id", "name"],
    },
  });
// Note: baseHRCollectionBuilder is NOT deployed

// Extend the base collection builder with an additional payroll model and deploy it
const extendedHRCollection = baseHRCollectionBuilder
  .addModel("payroll", {
    schema: {
      type: "object",
      properties: {
        id: { type: "string" },
        employeeId: { type: "string" },
        salary: { type: "number" },
        currency: { type: "string" },
        frequency: { type: "string", enum: ["weekly", "biweekly", "monthly"] },
      },
      required: ["id", "employeeId", "salary", "currency", "frequency"],
    },
  })
  .deploy();

/**
 * Define a base collection builder with a model and schema (not deployed) and then a new collection with a modification of one of the models and schema and deploy it
 */

// Create a base user model
const baseUserModel = defineModel("user")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      username: { type: "string" },
      email: { type: "string", format: "email" },
    },
    required: ["id", "username", "email"],
  })
  .deploy();

// Create a base collection builder with the base user model (not deployed)
const baseAuthCollectionBuilder = defineCollection("auth_basic")
  .withTitle("Basic Authentication")
  .withModel(baseUserModel);
// Note: baseAuthCollectionBuilder is NOT deployed

// Create an enhanced user model with additional properties and match pattern
const enhancedUserModel = defineModel("user")
  .withSchema({
    type: "object",
    properties: {
      id: { type: "string" },
      username: { type: "string" },
      email: { type: "string", format: "email" },
      // Additional properties
      role: { type: "string", enum: ["user", "admin", "superadmin"] },
      lastLogin: { type: "string", format: "date-time" },
      isActive: { type: "boolean" },
      profile: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          avatar: { type: "string", format: "uri" },
        },
      },
    },
    required: ["id", "username", "email", "role", "isActive"],
  })
  .withMatchPattern(
    match.and(match.property("email"), match.property("isActive"))
  )
  .deploy();

// Create a new collection with the enhanced model (modification of the base model) and deploy it
const enhancedAuthCollection = defineCollection("auth_enhanced")
  .withTitle("Enhanced Authentication")
  .withModel(enhancedUserModel)
  .deploy();

/**
 * Extract a type from a model that is part of a collection and demonstrate the type's usage
 */

const productModel = multiModelCollection.models.find(
  (m) => m.name === "product"
);

// Extract the schema type from the product model
type ProductSchema = typeof productModel extends { schema: infer S }
  ? S
  : never;

// Demonstrate usage of the extracted type
function validateProduct(data: unknown): data is ProductSchema {
  const product = data as any;
  return (
    typeof product?.id === "string" &&
    typeof product?.name === "string" &&
    typeof product?.price === "number" &&
    typeof product?.category === "string"
  );
}

// Example usage
const productData = {
  id: "prod-123",
  name: "Laptop",
  price: 999.99,
  category: "electronics",
};

if (validateProduct(productData)) {
  console.log(`Valid product: ${productData.name} - $${productData.price}`);
}

/**
 * Extract a type with the model names that are part of a collection and demonstrate the type's usage
 */

type SupportModelNames = (typeof complexCollection.models)[number]["name"];
// This would be: "ticket" | "customer" | "agent"

// Demonstrate usage with a function that accepts only valid model names
function getModelFromCollection(modelName: SupportModelNames) {
  const model = complexCollection.models.find((m) => m.name === modelName);
  if (!model) {
    throw new Error(`Model ${modelName} not found in collection`);
  }
  return model;
}

// Valid usage - TypeScript will ensure only valid model names are used
const ticketModel = getModelFromCollection("ticket");
const customerModel = getModelFromCollection("customer");
const agentModel = getModelFromCollection("agent");

// This would cause a TypeScript error:
// const invalidModel = getModelFromCollection("invalid");

// Export examples for reference
export {
  simpleCollection,
  titledCollection,
  modernInventoryCollection,
  singleModelCollection,
  schemaCollection,
  patternCollection,
  multiModelCollection,
  complexCollection,
  connectorCollection,
  extendedHRCollection,
  enhancedAuthCollection,
};
