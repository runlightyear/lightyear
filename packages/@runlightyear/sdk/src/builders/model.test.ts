import { describe, it, expect } from "vitest";
import { defineModel } from "./model";

describe("ModelBuilder", () => {
  it("should create a basic model", () => {
    const model = defineModel("user").withTitle("User Model").build();

    expect(model.name).toBe("user");
    expect(model.title).toBe("User Model");
    expect(model.schema).toBeUndefined();
    expect(model.matchPattern).toBeUndefined();
  });

  it("should create a model with schema and match pattern", () => {
    const schema = {
      type: "object" as const,
      properties: {
        id: { type: "string" as const },
        email: { type: "string" as const, format: "email" },
      },
    };

    const model = defineModel("customer")
      .withTitle("Customer")
      .withSchema(schema)
      .withMatchPattern("email")
      .build();

    expect(model.name).toBe("customer");
    expect(model.title).toBe("Customer");
    expect(model.schema).toEqual(schema);
    expect(model.matchPattern).toBe("email");
  });

  it("should support method chaining", () => {
    const model = defineModel("product")
      .withTitle("Product")
      .withSchema({
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
      })
      .withMatchPattern("id")
      .build();

    expect(model.name).toBe("product");
    expect(model.title).toBe("Product");
    expect(model.matchPattern).toBe("id");
  });
});
