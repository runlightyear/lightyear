import { describe, it, expect, beforeEach } from "vitest";
import { defineModel, defineCollection } from "../builders";
import {
  getRegistry,
  clearRegistry,
  getModels,
  getCollections,
  getAllItems,
  exportRegistry,
  getRegistryStats,
} from "./index";

describe("Registry", () => {
  beforeEach(() => {
    // Clear registry before each test
    clearRegistry();
  });

  describe("Model registration", () => {
    it("should automatically register models when built", () => {
      expect(getModels()).toHaveLength(0);

      const customer = defineModel("customer")
        .withTitle("Customer Model")
        .build();

      const models = getModels();
      expect(models).toHaveLength(1);
      expect(models[0].name).toBe("customer");
      expect(models[0].model).toEqual(customer);
      expect(models[0].type).toBe("model");
      expect(models[0].metadata?.builderType).toBe("ModelBuilder");
    });

    it("should register multiple models", () => {
      defineModel("customer").build();
      defineModel("order").build();
      defineModel("product").build();

      const models = getModels();
      expect(models).toHaveLength(3);
      expect(models.map((m) => m.name)).toEqual([
        "customer",
        "order",
        "product",
      ]);
    });

    it("should generate unique IDs for models", () => {
      defineModel("customer").build();
      defineModel("customer").build();

      const models = getModels();
      expect(models).toHaveLength(2);
      expect(models[0].id).not.toBe(models[1].id);
    });
  });

  describe("Collection registration", () => {
    it("should automatically register collections when built", () => {
      expect(getCollections()).toHaveLength(0);

      const crm = defineCollection("crm").withTitle("CRM Collection").build();

      const collections = getCollections();
      expect(collections).toHaveLength(1);
      expect(collections[0].name).toBe("crm");
      expect(collections[0].collection).toEqual(crm);
      expect(collections[0].type).toBe("collection");
      expect(collections[0].metadata?.builderType).toBe("CollectionBuilder");
    });

    it("should track model count in collection metadata", () => {
      const collection = defineCollection("crm")
        .addModel("customer")
        .addModel("lead")
        .build();

      const collections = getCollections();
      expect(collections[0].metadata?.modelCount).toBe(2);
    });

    it("should register collection with models inside", () => {
      const customer = defineModel("customer").build();

      const crm = defineCollection("crm")
        .withModel(customer)
        .addModel("lead")
        .build();

      // Should have 2 models (1 from defineModel, 1 from addModel)
      // and 1 collection
      expect(getModels()).toHaveLength(2);
      expect(getCollections()).toHaveLength(1);
      expect(getAllItems()).toHaveLength(3);
    });
  });

  describe("Registry querying", () => {
    it("should get all items across types", () => {
      defineModel("customer").build();
      defineCollection("crm").build();

      const allItems = getAllItems();
      expect(allItems).toHaveLength(2);
      expect(allItems.map((item) => item.type)).toEqual([
        "model",
        "collection",
      ]);
    });

    it("should provide registry statistics", () => {
      defineModel("customer").build();
      defineModel("order").build();
      defineCollection("crm").build();

      const stats = getRegistryStats();
      expect(stats.totalItems).toBe(3);
      expect(stats.byType.model).toBe(2);
      expect(stats.byType.collection).toBe(1);
      expect(stats.createdAt).toBeInstanceOf(Date);
    });

    it("should export registry data for deployment", () => {
      defineModel("customer").build();
      defineCollection("crm").build();

      const exported = exportRegistry();
      expect(exported.items).toHaveLength(2);
      expect(exported.stats.totalItems).toBe(2);
      expect(exported.exportedAt).toBeInstanceOf(Date);
    });
  });

  describe("Registry management", () => {
    it("should clear all items", () => {
      defineModel("customer").build();
      defineCollection("crm").build();

      expect(getAllItems()).toHaveLength(2);

      clearRegistry();

      expect(getAllItems()).toHaveLength(0);
      expect(getModels()).toHaveLength(0);
      expect(getCollections()).toHaveLength(0);
    });

    it("should track creation timestamps", () => {
      const beforeTime = new Date();

      defineModel("customer").build();

      const afterTime = new Date();
      const models = getModels();

      expect(models[0].createdAt).toBeInstanceOf(Date);
      expect(models[0].createdAt.getTime()).toBeGreaterThanOrEqual(
        beforeTime.getTime()
      );
      expect(models[0].createdAt.getTime()).toBeLessThanOrEqual(
        afterTime.getTime()
      );
    });
  });

  describe("Complex scenarios", () => {
    it("should handle mixed operations correctly", () => {
      // Create standalone model
      const customer = defineModel("customer").withTitle("Customer").build();

      // Create collection with models
      const crm = defineCollection("crm")
        .withModel(customer)
        .addModel("lead", { title: "Lead" })
        .addModel("opportunity")
        .build();

      // Verify counts
      expect(getModels()).toHaveLength(3); // customer + lead + opportunity
      expect(getCollections()).toHaveLength(1); // crm
      expect(getAllItems()).toHaveLength(4); // total

      // Verify the collection has the right models
      const collections = getCollections();
      expect(collections[0].collection.models).toHaveLength(3);
      expect(collections[0].metadata?.modelCount).toBe(3);
    });

    it("should maintain registry across multiple collection builds", () => {
      defineCollection("crm").addModel("customer").build();
      defineCollection("ecommerce").addModel("product").build();
      defineCollection("analytics").addModel("event").build();

      expect(getCollections()).toHaveLength(3);
      expect(getModels()).toHaveLength(3);

      const stats = getRegistryStats();
      expect(stats.byType.collection).toBe(3);
      expect(stats.byType.model).toBe(3);
    });
  });
});
