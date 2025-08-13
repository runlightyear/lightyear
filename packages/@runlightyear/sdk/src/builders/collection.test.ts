import { describe, it, expect } from "vitest";
import { defineCollection, defineModel } from "./collection";

describe("CollectionBuilder", () => {
  it("should create an empty collection", () => {
    const collection = defineCollection("test")
      .withTitle("Test Collection")
      .deployLegacy();

    expect(collection.name).toBe("test");
    expect(collection.title).toBe("Test Collection");
    expect(collection.models).toEqual([]);
  });

  it("should create a collection with models", () => {
    const user = defineModel("user", { type: "object" }).build();
    const admin = defineModel("admin", { type: "object" }).build();

    const collection = defineCollection("users")
      .withModel(user)
      .withModel(admin)
      .deployLegacy();

    expect(collection.name).toBe("users");
    expect(collection.models).toHaveLength(2);
    expect(collection.models[0].name).toBe("user");
    expect(collection.models[1].name).toBe("admin");
  });

  it("should create a collection using addModel helper", () => {
    const collection = defineCollection("crm")
      .addModelLegacy("customer", {
        title: "Customer",
        schema: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      })
      .addModelLegacy("lead")
      .deployLegacy();

    expect(collection.models).toHaveLength(2);
    expect(collection.models[0].name).toBe("customer");
    expect(collection.models[0].title).toBe("Customer");
    expect(collection.models[1].name).toBe("lead");
    expect(collection.models[1].title).toBeUndefined();
  });

  it("should support adding multiple models at once", () => {
    const customer = defineModel("customer", { type: "object" }).build();
    const lead = defineModel("lead", { type: "object" }).build();

    const collection = defineCollection("crm")
      .withModels([customer, lead])
      .deployLegacy();

    expect(collection.models).toHaveLength(2);
    expect(collection.models[0].name).toBe("customer");
    expect(collection.models[1].name).toBe("lead");
  });

  it("should support method chaining", () => {
    const user = defineModel("user", { type: "object" }).build();

    const collection = defineCollection("users")
      .withTitle("User Management")
      .withModel(user)
      .addModelLegacy("admin", { title: "Administrator" })
      .deployLegacy();

    expect(collection.name).toBe("users");
    expect(collection.title).toBe("User Management");
    expect(collection.models).toHaveLength(2);
  });
});
