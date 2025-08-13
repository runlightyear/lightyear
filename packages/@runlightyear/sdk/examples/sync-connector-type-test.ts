// This file tests that type inference is working correctly in sync connectors
// It should compile without errors if types are properly inferred

import { z } from "zod";
import { defineCollection, createRestConnector, createSyncConnector } from "../src";

// Define a schema and collection
const TestSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
});

type TestModel = z.infer<typeof TestSchema>;

const testCollection = defineCollection("test")
  .addModel("testModel", {
    schema: TestSchema as any,
  })
  .deploy();

const testRest = createRestConnector().build();
const testSync = createSyncConnector(testRest, testCollection)
  .with("testModel", {
    list: { endpoint: "/test" },
    create: { endpoint: "/test" },
  })
  .build();

// Test type inference
async function testTypes() {
  const connector = testSync.getModelConnector("testModel");
  
  if (connector?.list) {
    const { items } = await connector.list();
    // This should compile - items should be inferred as TestModel[]
    items.forEach(item => {
      const id: string = item.id;
      const name: string = item.name;
      const value: number = item.value;
    });
  }
  
  if (connector?.create) {
    // This should compile - create expects TestModel
    const created = await connector.create({
      id: "1",
      name: "test",
      value: 123,
    });
    
    // This should NOT compile - missing required field
    // @ts-expect-error - missing required field 'value'
    await connector.create({
      id: "2",
      name: "test2",
      // missing value
    });
  }
  
  // This should NOT compile - wrong model name
  // @ts-expect-error - 'wrongModel' is not a valid model name
  const wrongConnector = testSync.getModelConnector("wrongModel");
}