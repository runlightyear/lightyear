/**
 * Simple CRUD Sync Connector Example
 * 
 * This example shows basic CRUD operations (Create, Read, Update, Delete)
 * with the sync connector in a simple, straightforward way.
 */

import { z } from "zod";
import {
  defineTypedCollection,
  defineRestConnector,
  defineSyncConnector,
  match,
} from "../src";
import type { ExtractModelTypes } from "../src";

// 1. Define a collection with a task model
const taskCollection = defineTypedCollection("tasks")
  .addModel(
    "task",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string", minLength: 1 },
        description: { type: ["string", "null"] },
        status: { 
          type: "string",
          enum: ["todo", "in-progress", "done"] as const
        },
        priority: { 
          type: "string",
          enum: ["low", "medium", "high"] as const
        },
        dueDate: { type: ["string", "null"], format: "date" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: ["id", "title", "status", "priority", "createdAt", "updatedAt"],
    } as const,
    (model) => model.withTitle("Task")
  )
  .deploy();

// Extract the Task type
type Task = ExtractModelTypes<typeof taskCollection>["task"];

// 2. Create REST connector
const apiConnector = defineRestConnector()
  .withBaseUrl("https://api.taskmanager.com/v1")
  .addHeader("Authorization", `Bearer ${process.env.API_TOKEN || "demo-token"}`)
  .build();

// 3. Create sync connector
const taskSyncBuilder = defineSyncConnector(apiConnector, taskCollection);

// 4. Configure the task model connector with all CRUD operations
taskSyncBuilder
  .addModelConnector("task")
  
  // LIST - Get all tasks
  .withList("/tasks", {
    responseSchema: z.object({
      tasks: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
        due_date: z.string().nullable(),
        created_at: z.string(),
        updated_at: z.string(),
      })),
      total: z.number()
    }),
    transform: (apiTask) => ({
      id: apiTask.id,
      title: apiTask.title,
      description: apiTask.description,
      status: apiTask.status.toLowerCase().replace("_", "-") as Task["status"],
      priority: apiTask.priority.toLowerCase() as Task["priority"],
      dueDate: apiTask.due_date,
      createdAt: apiTask.created_at,
      updatedAt: apiTask.updated_at,
    })
  })
  
  // CREATE - Add a new task
  .withCreate("/tasks", {
    transform: (task) => ({
      title: task.title,
      description: task.description || undefined,
      status: task.status.toUpperCase().replace("-", "_"),
      priority: task.priority.toUpperCase(),
      due_date: task.dueDate || undefined,
    }),
    responseTransform: (response) => ({
      id: response.id,
      createdAt: response.created_at,
      updatedAt: response.updated_at,
    })
  })
  
  // UPDATE - Modify an existing task
  .withUpdate((id) => `/tasks/${id}`, {
    transform: (task) => ({
      title: task.title,
      description: task.description,
      status: task.status.toUpperCase().replace("-", "_"),
      priority: task.priority.toUpperCase(),
      due_date: task.dueDate,
    }),
    responseTransform: (response) => ({
      updatedAt: response.updated_at,
    })
  })
  
  // DELETE - Remove a task
  .withDelete((id) => `/tasks/${id}`);

// Build the sync connector
const taskSync = taskSyncBuilder.build();

// Usage example showing all operations
async function demonstrateCRUD() {
  const taskConnector = taskSync.getModelConnector("task");
  if (!taskConnector) return;

  console.log("=== Task Manager CRUD Demo ===\n");

  // 1. LIST - Get all tasks
  console.log("1. Listing all tasks:");
  const listResult = await taskConnector.list();
  console.log(`   Found ${listResult.data.length} tasks`);
  listResult.data.forEach(task => {
    console.log(`   - [${task.priority}] ${task.title} (${task.status})`);
  });

  // 2. CREATE - Add a new task
  console.log("\n2. Creating a new task:");
  const newTask: Task = {
    id: "", // Will be set by API
    title: "Complete project documentation",
    description: "Write comprehensive API docs and user guide",
    status: "todo",
    priority: "high",
    dueDate: "2024-12-31",
    createdAt: "", // Will be set by API
    updatedAt: "", // Will be set by API
  };
  
  const created = await taskConnector.create(newTask);
  console.log(`   Created task: "${created.title}" with ID: ${created.id}`);

  // 3. UPDATE - Modify the task
  console.log("\n3. Updating the task:");
  const updated = await taskConnector.update({
    ...created,
    status: "in-progress",
    description: "Writing documentation - 50% complete"
  });
  console.log(`   Updated task status to: ${updated.status}`);

  // 4. DELETE - Remove a task
  console.log("\n4. Deleting a task:");
  if (listResult.data.length > 0) {
    const taskToDelete = listResult.data[0];
    await taskConnector.delete(taskToDelete);
    console.log(`   Deleted task: "${taskToDelete.title}"`);
  }

  console.log("\n=== Demo Complete ===");
}

// Simple utility functions
async function getHighPriorityTasks() {
  const taskConnector = taskSync.getModelConnector("task");
  if (!taskConnector) return [];

  const result = await taskConnector.list();
  return result.data.filter(task => task.priority === "high");
}

async function completeTask(taskId: string) {
  const taskConnector = taskSync.getModelConnector("task");
  if (!taskConnector) return;

  // First, get the task
  const allTasks = await taskConnector.list();
  const task = allTasks.data.find(t => t.id === taskId);
  
  if (task) {
    // Update status to done
    return taskConnector.update({
      ...task,
      status: "done",
      updatedAt: new Date().toISOString()
    });
  }
}

export { 
  taskCollection, 
  taskSync, 
  demonstrateCRUD,
  getHighPriorityTasks,
  completeTask,
  type Task 
};