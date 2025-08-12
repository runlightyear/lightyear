/**
 * JSON Schema to TypeScript Example
 *
 * This example demonstrates how the SDK now uses json-schema-to-ts
 * for automatic type inference from JSON schemas.
 */

import { defineTypedCollection, match } from "../src";
import type { FromSchema } from "json-schema-to-ts";

// Define schemas as const for better type inference
const customerSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
    isActive: { type: "boolean" },
    tags: {
      type: "array",
      items: { type: "string" },
    },
    metadata: {
      type: "object",
      properties: {
        source: { type: "string" },
        referredBy: { type: ["string", "null"] },
      },
      required: ["source"],
    },
  },
  required: ["id", "name", "email", "isActive"],
  additionalProperties: false,
} as const;

const orderSchema = {
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
          name: { type: "string" },
          quantity: { type: "integer", minimum: 1 },
          price: { type: "number", minimum: 0 },
        },
        required: ["productId", "name", "quantity", "price"],
        additionalProperties: false,
      },
    },
    status: {
      type: "string",
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ] as const,
    },
    total: { type: "number", minimum: 0 },
    createdAt: { type: "string", format: "date-time" },
  },
  required: ["id", "customerId", "items", "status", "total", "createdAt"],
  additionalProperties: false,
} as const;

// json-schema-to-ts automatically infers these types
type Customer = FromSchema<typeof customerSchema>;
type Order = FromSchema<typeof orderSchema>;

// Create a typed collection
const ecommerceCollection = defineTypedCollection("ecommerce")
  .withTitle("E-commerce Data")
  .addModel("customer", customerSchema, (model) =>
    model.withTitle("Customer").withMatchPattern(match.property("email"))
  )
  .addModel("order", orderSchema, (model) =>
    model.withTitle("Order").withMatchPattern(match.property("status"))
  )
  .deploy();

// Example usage with full type safety
const customer: Customer = {
  id: "cust-123",
  name: "Jane Doe",
  email: "jane@example.com",
  isActive: true,
  tags: ["premium", "early-adopter"],
  metadata: {
    source: "website",
    referredBy: null,
  },
};

const order: Order = {
  id: "order-456",
  customerId: "cust-123",
  items: [
    {
      productId: "prod-789",
      name: "Widget Pro",
      quantity: 2,
      price: 29.99,
    },
  ],
  status: "processing",
  total: 59.98,
  createdAt: new Date().toISOString(),
};

// TypeScript enforces all constraints
function validateOrder(order: Order): boolean {
  // TypeScript knows status must be one of the enum values
  const validStatuses: Order["status"][] = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  // TypeScript knows items is an array with specific properties
  const hasValidItems = order.items.every(
    (item) => item.quantity > 0 && item.price >= 0
  );

  return validStatuses.includes(order.status) && hasValidItems;
}

// Type errors are caught at compile time
// const invalidCustomer: Customer = {
//   id: "123",
//   name: "Test",
//   // Missing required field: email
//   isActive: "yes" // Type error: should be boolean
// };

// Benefits of json-schema-to-ts:
// 1. Handles complex types like unions, arrays, nested objects
// 2. Respects required fields and additionalProperties
// 3. Supports JSON Schema features like format, minimum, maximum
// 4. Provides accurate type inference without manual type definitions

console.log("Customer:", customer);
console.log("Order:", order);
console.log("Order is valid:", validateOrder(order));

export { ecommerceCollection, type Customer, type Order };
