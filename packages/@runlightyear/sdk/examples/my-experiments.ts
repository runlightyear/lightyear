import { z } from "zod";
import {
  defineSyncConnector,
  defineRestConnector,
  defineTypedCollection,
} from "../src";

const taskManagementCollection = defineTypedCollection("task-management")
  .addModel("task", {
    type: "object",
    properties: {
      id: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      completed: { type: "boolean" },
    },
    required: ["id", "title", "description", "completed"],
  })
  .deploy();

const otherTodoConnector = defineRestConnector()
  .withBaseUrl("https://todo.lightyear.dev/api")
  .addHeader("x-api-key", "{{ apiKey }}")
  .build();

const otherTodoSync = defineSyncConnector(
  otherTodoConnector,
  taskManagementCollection
)
  .addModelConnector("task")
  .withList("/todos", {
    responseSchema: z.object({
      todos: z.array(
        z.object({
          id: z.number(),
          title: z.string(),
          completed: z.boolean(),
        })
      ),
      hasMore: z.boolean(),
    }),
    transform: (response) =>
      response.todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      })),
  })
  .withCreate("/todos", {
    transform: (response) => ({
      id: response.id,
      title: response.title,
      completed: response.completed,
    }),
    responseTransform: (response) => ({
      id: response.id,
      updatedAt: response.updatedAt,
    }),
  })
  .build();
