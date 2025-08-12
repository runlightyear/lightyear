/**
 * Simple Sync Connector Example
 *
 * This example shows the most basic usage of the sync connector.
 * Simple things should be simple!
 */

import { z } from "zod";
import {
  defineTypedCollection,
  defineRestConnector,
  defineSyncConnector,
  match,
} from "../src";

// 1. Define a simple collection with one model
const todoCollection = defineTypedCollection("todos")
  .addModel(
    "todo",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        completed: { type: "boolean" },
        createdAt: { type: "string", format: "date-time" },
      },
      required: ["id", "title", "completed", "createdAt"],
    } as const,
    (model) => model.withTitle("Todo Item")
  )
  .deploy();

// 2. Create a REST connector
const apiConnector = defineRestConnector()
  .withBaseUrl("https://api.example.com")
  .addHeader("Authorization", "Bearer token123")
  .build();

// 3. Create sync connector - initialized with REST connector and collection
const syncConnector = defineSyncConnector(apiConnector, todoCollection)
  // 4. Add a simple model connector for todos
  .addModelConnector("todo").withList("/todos", {
  // Define the API response schema
  responseSchema: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      completed: z.boolean(),
      created_at: z.string(),
    })
  ),
  // Transform from API format to model format
  transform: (apiTodo) => ({
    id: apiTodo.id,
    title: apiTodo.title,
    completed: apiTodo.completed,
    createdAt: apiTodo.created_at,
  }),
})
  .build();

// Usage is simple
async function syncTodos() {
  const todoConnector = syncConnector.getModelConnector("todo");
  if (!todoConnector) return;

  // List todos
  const response = await todoConnector.list();
  console.log(`Synced ${response.data.length} todos`);

  response.data.forEach((todo) => {
    console.log(`- ${todo.title} (${todo.completed ? "✓" : "○"})`);
  });
}

// TypeScript prevents errors
// This would cause a TypeScript error:
// syncConnector.addModelConnector("invalid"); // Error: Argument of type '"invalid"' is not assignable

export { todoCollection, syncConnector, syncTodos };
