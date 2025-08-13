/**
 * Simple Todo List Sync Connector Example
 *
 * This example demonstrates how to create a basic sync connector
 * for a todo list application with CRUD operations.
 */

import { z } from "zod";
import {
  defineCollection,
  defineModel,
  defineRestConnector,
  defineSyncConnector,
  PaginationStrategies,
} from "../src/builders";

// Define the todo schema
const todoSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    completed: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id", "title", "completed"],
  additionalProperties: false,
} as const;

// Create the collection with a todo model
const todoCollection = defineCollection("todos")
  .withTitle("Todo Collection")
  .addModel("todo", todoSchema, (builder) => builder.withTitle("Todo Item"))
  .deploy();

// Create the REST connector
const restConnector = defineRestConnector()
  .withBaseUrl("https://api.todoapp.com/v1")
  .addHeader("Authorization", "Bearer YOUR_API_KEY")
  .build();

// Define API response schema for list operation
const listResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      completed: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  page: z.number(),
  hasMore: z.boolean(),
});

// Create the sync connector
const todoSyncConnector = defineSyncConnector(restConnector, todoCollection)
  .withDefaultPagination("page")
  .addModelConnector("todo")
  .withList("/todos", {
    responseSchema: listResponseSchema,
    transform: (response) => response.data,
  })
  .withCreate("/todos", {
    transform: (todo) => ({
      title: todo.title,
      completed: todo.completed || false,
    }),
  })
  .withUpdate((id) => `/todos/${id}`, {
    transform: (todo) => ({
      title: todo.title,
      completed: todo.completed,
    }),
  })
  .withDelete((id) => `/todos/${id}`)
  .and() // Return to builder
  .build();

// Example usage
async function exampleUsage() {
  const todoConnector = todoSyncConnector.getModelConnector("todo");
  if (!todoConnector) return;

  // List todos
  console.log("Listing todos...");
  const todos = await todoConnector.list({ type: "page", page: 1, limit: 10 });
  console.log(`Found ${todos.data.length} todos`);

  // Create a new todo
  console.log("\nCreating a new todo...");
  const newTodo = await todoConnector.create({
    id: "temp-id", // Will be replaced by server
    title: "Buy groceries",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("Created todo:", newTodo.title);

  // Update the todo
  console.log("\nUpdating todo...");
  const updatedTodo = await todoConnector.update({
    ...newTodo,
    completed: true,
  });
  console.log("Todo completed:", updatedTodo.completed);

  // Delete the todo
  console.log("\nDeleting todo...");
  await todoConnector.delete(updatedTodo);
  console.log("Todo deleted");

  // List all todos (pagination handled automatically)
  console.log("\nFetching all todos...");
  const allTodos = await todoConnector.listAll({ pageSize: 50 });
  console.log(`Total todos: ${allTodos.length}`);
}

// Export the connector for use in other parts of your application
export { todoSyncConnector, todoCollection };
