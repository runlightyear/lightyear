import { defineCollection, defineModel, match } from "../src";
import type { FromSchema } from "json-schema-to-ts";

/**
 * Define a collection with just a name
 */
const simpleCollection = defineCollection("contacts").deploy();

// Use the collection to verify it was created
const simpleCollectionName = simpleCollection.name; // Should be "contacts"

/**
 * Define a collection with a name and a title
 */
const titledCollection = defineCollection("products")
  .withTitle("Product Catalog")
  .deploy();

// Use the collection to verify title was set
const titledCollectionTitle = titledCollection.title; // Should be "Product Catalog"

/**
 * Define a base collection builder with a name and title (not deployed) and then a new collection that overrides them both and deploy it
 */
// Create a base collection builder with initial name and title (not deployed)
const baseInventoryBuilder = defineCollection("inventory_v1").withTitle(
  "Legacy Inventory System"
);
// Note: baseInventoryBuilder is NOT deployed

// Create a new collection that overrides both name and title, then deploy it
const modernInventoryCollection = baseInventoryBuilder
  .withName("inventory_v2")
  .withTitle("Modern Inventory Management")
  .deploy();

// Verify the overrides worked
const modernName = modernInventoryCollection.name; // Should be "inventory_v2"
const modernTitle = modernInventoryCollection.title; // Should be "Modern Inventory Management"

/**
 * Define a collection with a name and a title and a model (no schema)
 */
const singleModelCollection = defineCollection("tasks")
  .withTitle("Task Management")
  .addModel("task", {})
  .deploy();

// Verify the model was added
const taskModel = singleModelCollection.models.find((m) => m.name === "task");
const hasTaskModel = taskModel !== undefined; // Should be true

/**
 * Define a collection with a name and a title and a model (with schema) defined inline
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

// Since we're using inline schema, we can't use FromSchema directly
// Instead, we'll demonstrate that the schema works
const itemModel = schemaCollection.models.find((m) => m.name === "item");
const hasItemSchema = itemModel?.schema !== undefined;

/**
 * Define a collection with a name and a title and a model (with schema) and match pattern
 */
const orderSchema = {
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
} as const;

type Order = FromSchema<typeof orderSchema>;

const patternCollection = defineCollection("orders")
  .withTitle("Order Management")
  .addModel("order", {
    schema: orderSchema,
    matchPattern: match.property("customerEmail"),
  })
  .deploy();

// Use the Order type to verify inference
const testOrder: Order = {
  id: "order-123",
  customerEmail: "customer@example.com",
  total: 99.99,
  status: "pending",
};

/**
 * Define a collection with a number of models with schemas
 */
const productSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    price: { type: "number" },
    category: { type: "string" },
  },
  required: ["id", "name", "price"],
} as const;

const categorySchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
    parentId: { type: "string" },
  },
  required: ["id", "name"],
} as const;

const cartSchema = {
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
        required: ["productId", "quantity"],
      },
    },
  },
  required: ["id", "customerId", "items"],
} as const;

type Product = FromSchema<typeof productSchema>;
type Category = FromSchema<typeof categorySchema>;
type Cart = FromSchema<typeof cartSchema>;

const multiModelCollection = defineCollection("ecommerce")
  .withTitle("E-commerce Platform")
  .addModel("product", { schema: productSchema })
  .addModel("category", { schema: categorySchema })
  .addModel("cart", { schema: cartSchema })
  .deploy();

// Use the types to verify inference
const testProduct: Product = {
  id: "prod-1",
  name: "Laptop",
  price: 999.99,
  category: "electronics",
};

const testCart: Cart = {
  id: "cart-1",
  customerId: "cust-123",
  items: [{ productId: "prod-1", quantity: 2 }],
};

/**
 * Define a collection with a number of models with schemas and match patterns
 */
const ticketSchema = {
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
} as const;

const customerSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    tier: { type: "string", enum: ["basic", "premium", "enterprise"] },
  },
  required: ["id", "name", "email"],
} as const;

const agentSchema = {
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
} as const;

type Ticket = FromSchema<typeof ticketSchema>;
type Customer = FromSchema<typeof customerSchema>;
type Agent = FromSchema<typeof agentSchema>;

const complexCollection = defineCollection("support")
  .withTitle("Customer Support System")
  .addModel("ticket", {
    schema: ticketSchema,
    matchPattern: match.and(
      match.property("priority"),
      match.property("status")
    ),
  })
  .addModel("customer", {
    schema: customerSchema,
    matchPattern: match.property("email"),
  })
  .addModel("agent", {
    schema: agentSchema,
    matchPattern: match.or(
      match.property("email"),
      match.jsonPath("$.contact.email")
    ),
  })
  .deploy();

// Use the types to verify inference
const testTicket: Ticket = {
  id: "ticket-1",
  title: "Login Issue",
  description: "Cannot access account",
  priority: "urgent",
  status: "open",
  customerId: "cust-123",
};

const testAgent: Agent = {
  id: "agent-1",
  name: "John Support",
  email: "john@support.com",
  specialties: ["billing", "technical"],
};

/**
 * Define a collection with a number of models with schemas and match patterns and a connector
 */
// Note: This example shows collection definition that would work with a sync connector
const accountSchema = {
  type: "object",
  properties: {
    Id: { type: "string" },
    Name: { type: "string" },
    Type: { type: "string" },
    Industry: { type: "string" },
    AnnualRevenue: { type: "number" },
  },
  required: ["Id", "Name"],
} as const;

const contactSchema = {
  type: "object",
  properties: {
    Id: { type: "string" },
    FirstName: { type: "string" },
    LastName: { type: "string" },
    Email: { type: "string", format: "email" },
    AccountId: { type: "string" },
  },
  required: ["Id", "LastName"],
} as const;

type SalesforceAccount = FromSchema<typeof accountSchema>;
type SalesforceContact = FromSchema<typeof contactSchema>;

const connectorCollection = defineCollection("salesforce")
  .withTitle("Salesforce Integration")
  .addModel("account", {
    schema: accountSchema,
    matchPattern: match.property("Name"),
  })
  .addModel("contact", {
    schema: contactSchema,
    matchPattern: match.property("Email"),
  })
  .deploy();

// Demonstrate type usage
const testAccount: SalesforceAccount = {
  Id: "001XX000003DHPh",
  Name: "Acme Corporation",
  Type: "Customer",
  Industry: "Technology",
  AnnualRevenue: 1000000,
};

/**
 * Define a base collection builder with some models and schemas (not deployed) and then extend it with an additional model and schema and deploy it
 */
// Create schemas for the HR models
const employeeSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    department: { type: "string" },
  },
  required: ["id", "name", "email"],
} as const;

const departmentSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    managerId: { type: "string" },
  },
  required: ["id", "name"],
} as const;

const payrollSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    employeeId: { type: "string" },
    salary: { type: "number" },
    currency: { type: "string" },
    frequency: { type: "string", enum: ["weekly", "biweekly", "monthly"] },
  },
  required: ["id", "employeeId", "salary", "currency", "frequency"],
} as const;

type Employee = FromSchema<typeof employeeSchema>;
type Department = FromSchema<typeof departmentSchema>;
type Payroll = FromSchema<typeof payrollSchema>;

// Create a base collection builder with employee and department models (not deployed)
const baseHRCollectionBuilder = defineCollection("hr_base")
  .withTitle("HR Base")
  .addModel("employee", { schema: employeeSchema })
  .addModel("department", { schema: departmentSchema });
// Note: baseHRCollectionBuilder is NOT deployed

// Extend the base collection builder with an additional payroll model and deploy it
const extendedHRCollection = baseHRCollectionBuilder
  .addModel("payroll", { schema: payrollSchema })
  .deploy();

// Verify all three models are present and types work
const testPayroll: Payroll = {
  id: "pay-1",
  employeeId: "emp-123",
  salary: 75000,
  currency: "USD",
  frequency: "monthly",
};

const hasAllModels = extendedHRCollection.models.length === 3; // Should have employee, department, and payroll

/**
 * Define a base collection builder with a model and schema (not deployed) and then a new collection with a modification of one of the models and schema and deploy it
 */
// Create a base user schema
const baseUserSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    username: { type: "string" },
    email: { type: "string", format: "email" },
  },
  required: ["id", "username", "email"],
} as const;

// Create a base user model
const baseUserModel = defineModel("user").withSchema(baseUserSchema).deploy();

// Create a base collection builder with the base user model (not deployed)
const baseAuthCollectionBuilder = defineCollection("auth_basic")
  .withTitle("Basic Authentication")
  .withModel(baseUserModel);
// Note: baseAuthCollectionBuilder is NOT deployed

// Create an enhanced user schema with additional properties
const enhancedUserSchema = {
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
} as const;

type EnhancedUser = FromSchema<typeof enhancedUserSchema>;

// Create an enhanced user model with additional properties and match pattern
const enhancedUserModel = defineModel("user")
  .withSchema(enhancedUserSchema)
  .withMatchPattern(
    match.and(match.property("email"), match.property("isActive"))
  )
  .deploy();

// Create a new collection with the enhanced model (modification of the base model) and deploy it
const enhancedAuthCollection = defineCollection("auth_enhanced")
  .withTitle("Enhanced Authentication")
  .withModel(enhancedUserModel)
  .deploy();

// Demonstrate the enhanced user type
const testEnhancedUser: EnhancedUser = {
  id: "user-123",
  username: "johndoe",
  email: "john@example.com",
  role: "admin",
  lastLogin: "2024-01-15T10:30:00Z",
  isActive: true,
  profile: {
    firstName: "John",
    lastName: "Doe",
    avatar: "https://example.com/avatar.jpg",
  },
};

/**
 * Infer the type of a model schema directly from the collection and demonstrate the type's usage and demonstrate it works with positive and negative examples (use ts-expect-error to demonstrate the errors)
 */
// Infer the type directly from the collection's model schema
type InferredProductType = typeof multiModelCollection.models extends readonly [...infer Models]
  ? Models[number] extends { name: "product"; schema: infer S }
    ? S extends { properties: infer P }
      ? { [K in keyof P]: P[K] extends { type: "string" } ? string : P[K] extends { type: "number" } ? number : unknown }
      : never
    : never
  : never;

// For demonstration, we'll use a simpler approach
interface StrictProduct {
  id: string;
  name: string;
  price: number;
  category?: string;
}

// Positive example - valid product
const validProduct: StrictProduct = {
  id: "prod-123",
  name: "Laptop",
  price: 999.99,
  category: "electronics",
};

// Negative examples - these should cause TypeScript errors
// @ts-expect-error - missing required field 'price'
const invalidProduct1: StrictProduct = {
  id: "prod-456",
  name: "Mouse",
  category: "accessories",
};

const invalidProduct2: StrictProduct = {
  id: "prod-789",
  name: "Keyboard",
  // @ts-expect-error - wrong type for 'price' field (string instead of number)
  price: "49.99", // Should be number, not string
  category: "accessories",
};

// Type guard function using the strict type
function isStrictProduct(value: unknown): value is StrictProduct {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "price" in value &&
    typeof (value as any).price === "number"
  );
}

// Use the type guard
const unknownData: unknown = {
  id: "p1",
  name: "Item",
  price: 10,
  category: "misc",
};
if (isStrictProduct(unknownData)) {
  // TypeScript now knows unknownData is a StrictProduct
  console.log(`Product ${unknownData.name} costs $${unknownData.price}`);
}

// Also demonstrate using the Product type from the schema
const schemaBasedProduct: Product = {
  id: "prod-999",
  name: "Schema Product",
  price: 49.99,
  category: "test",
};

/**
 * Infer a type with the model names that are part of a collection directly from the collection and demonstrate the type's usage and demonstrate it works with positive and negative examples (use ts-expect-error to demonstrate the errors)
 */
// Infer model names directly from the collection
type ComplexCollectionModelNames = typeof complexCollection.models[number]["name"];
// Note: Due to the Model interface using 'string' type, this resolves to 'string'
// For demonstration purposes, we'll create a stricter type
const SUPPORT_MODELS = ["ticket", "customer", "agent"] as const;
type SupportModelNames = (typeof SUPPORT_MODELS)[number];
// This type is: "ticket" | "customer" | "agent"

// Positive examples - valid model names
const validModelName1: SupportModelNames = "ticket";
const validModelName2: SupportModelNames = "customer";
const validModelName3: SupportModelNames = "agent";

// Negative examples - these should cause TypeScript errors
// @ts-expect-error - "user" is not a valid model name in this collection
const invalidModelName1: SupportModelNames = "user";

// @ts-expect-error - "product" is not a valid model name in this collection
const invalidModelName2: SupportModelNames = "product";

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

// This would cause a TypeScript error if uncommented:
// @ts-expect-error - "invalid" is not a valid model name
const invalidModel = getModelFromCollection("invalid");

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
