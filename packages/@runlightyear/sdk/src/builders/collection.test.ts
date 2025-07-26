import { describe, it, expect } from "vitest";
import { defineCollection } from "./collection";
import { defineModel } from "./model";

describe("CollectionBuilder", () => {
  it("should create an empty collection", () => {
    const collection = defineCollection("test")
      .withTitle("Test Collection")
      .build();

    expect(collection.name).toBe("test");
    expect(collection.title).toBe("Test Collection");
    expect(collection.models).toEqual([]);
  });

  it("should create a collection with models", () => {
    const user = defineModel("user").build();
    const admin = defineModel("admin").build();

    const collection = defineCollection("users")
      .withModel(user)
      .withModel(admin)
      .build();

    expect(collection.name).toBe("users");
    expect(collection.models).toHaveLength(2);
    expect(collection.models[0].name).toBe("user");
    expect(collection.models[1].name).toBe("admin");
  });

  it("should create a collection using addModel helper", () => {
    const collection = defineCollection("crm")
      .addModel("customer", {
        title: "Customer",
        schema: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      })
      .addModel("lead")
      .build();

    expect(collection.models).toHaveLength(2);
    expect(collection.models[0].name).toBe("customer");
    expect(collection.models[0].title).toBe("Customer");
    expect(collection.models[1].name).toBe("lead");
    expect(collection.models[1].title).toBeUndefined();
  });

  it("should support adding multiple models at once", () => {
    const customer = defineModel("customer").build();
    const lead = defineModel("lead").build();

    const collection = defineCollection("crm")
      .withModels([customer, lead])
      .build();

    expect(collection.models).toHaveLength(2);
    expect(collection.models[0].name).toBe("customer");
    expect(collection.models[1].name).toBe("lead");
  });

  it("should support method chaining", () => {
    const user = defineModel("user").build();

    const collection = defineCollection("users")
      .withTitle("User Management")
      .withModel(user)
      .addModel("admin", { title: "Administrator" })
      .build();

    expect(collection.name).toBe("users");
    expect(collection.title).toBe("User Management");
    expect(collection.models).toHaveLength(2);
  });
});
