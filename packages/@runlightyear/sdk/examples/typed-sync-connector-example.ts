/**
 * Typed Sync Connector Example
 * 
 * This example shows how typed collections integrate with sync connectors,
 * providing end-to-end type safety from schema definition to data synchronization.
 */

import { defineTypedCollection, defineRestConnector, match } from "../src";
import type { ExtractModelTypes } from "../src";

// Define a typed collection for a project management system
const projectCollection = defineTypedCollection("projects")
  .withTitle("Project Management")
  
  .addModel("project", {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      status: {
        type: "string",
        enum: ["planning", "active", "on-hold", "completed", "cancelled"] as const,
      },
      startDate: { type: "string", format: "date" },
      endDate: { type: "string", format: "date" },
      budget: { type: "number", minimum: 0 },
      team: {
        type: "array",
        items: {
          type: "object",
          properties: {
            userId: { type: "string" },
            role: { type: "string" },
          },
          required: ["userId", "role"],
        },
      },
    },
    required: ["id", "name", "status"],
  } as const, (model) =>
    model
      .withTitle("Project")
      .withMatchPattern(match.property("status"))
  )
  
  .addModel("task", {
    type: "object",
    properties: {
      id: { type: "string" },
      projectId: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      assigneeId: { type: "string" },
      status: {
        type: "string",
        enum: ["todo", "in-progress", "review", "done"] as const,
      },
      priority: {
        type: "string",
        enum: ["low", "medium", "high", "critical"] as const,
      },
      dueDate: { type: "string", format: "date-time" },
      tags: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["id", "projectId", "title", "status", "priority"],
  } as const, (model) =>
    model
      .withTitle("Task")
      .withMatchPattern(
        match.and(
          match.property("status"),
          match.property("priority")
        )
      )
  )
  
  .deploy();

// Extract types from the collection
type ProjectTypes = ExtractModelTypes<typeof projectCollection>;
type Project = ProjectTypes["project"];
type Task = ProjectTypes["task"];

// Define a REST connector with type-safe sync methods
const projectConnector = defineRestConnector({
  name: "project-management-api",
  baseUrl: "https://api.projectmanagement.com",
})
  .withAuth({
    type: "bearer",
    token: process.env.PROJECT_API_TOKEN || "",
  })
  
  // Sync projects with full type safety
  .defineSyncMethod<Project>("syncProjects", {
    endpoint: "/projects",
    method: "GET",
    responseMapping: (response: any) => {
      // TypeScript ensures the mapped data matches the Project type
      return response.projects.map((p: any): Project => ({
        id: p.id,
        name: p.name,
        description: p.description || "",
        status: p.status,
        startDate: p.start_date,
        endDate: p.end_date,
        budget: p.budget || 0,
        team: p.team_members || [],
      }));
    },
  })
  
  // Sync tasks with full type safety
  .defineSyncMethod<Task>("syncTasks", {
    endpoint: "/tasks",
    method: "GET",
    params: {
      include: "project,assignee",
    },
    responseMapping: (response: any) => {
      // TypeScript ensures the mapped data matches the Task type
      return response.tasks.map((t: any): Task => ({
        id: t.id,
        projectId: t.project_id,
        title: t.title,
        description: t.description || "",
        assigneeId: t.assignee_id || "",
        status: t.status,
        priority: t.priority,
        dueDate: t.due_date,
        tags: t.tags || [],
      }));
    },
  })
  
  .deploy();

// Example: Type-safe sync operation
async function performSync() {
  try {
    // Sync projects - returns Project[]
    const projects = await projectConnector.syncProjects();
    
    // TypeScript knows the exact shape of each project
    projects.forEach(project => {
      console.log(`Project: ${project.name} - ${project.status}`);
      
      if (project.budget && project.budget > 100000) {
        console.log(`High-budget project: $${project.budget}`);
      }
    });
    
    // Sync tasks - returns Task[]
    const tasks = await projectConnector.syncTasks();
    
    // Filter high-priority tasks with full type safety
    const criticalTasks = tasks.filter(task => task.priority === "critical");
    
    // Group tasks by project
    const tasksByProject = tasks.reduce((acc, task) => {
      if (!acc[task.projectId]) {
        acc[task.projectId] = [];
      }
      acc[task.projectId].push(task);
      return acc;
    }, {} as Record<string, Task[]>);
    
    // Calculate project completion rates
    projects.forEach(project => {
      const projectTasks = tasksByProject[project.id] || [];
      const completedTasks = projectTasks.filter(t => t.status === "done");
      const completionRate = projectTasks.length > 0
        ? (completedTasks.length / projectTasks.length) * 100
        : 0;
      
      console.log(`${project.name}: ${completionRate.toFixed(1)}% complete`);
    });
    
  } catch (error) {
    console.error("Sync failed:", error);
  }
}

// Example: Type-safe data transformation
function transformProjectForExport(project: Project) {
  // TypeScript ensures we're accessing valid properties
  return {
    projectName: project.name,
    currentStatus: project.status,
    teamSize: project.team?.length || 0,
    budgetFormatted: project.budget 
      ? `$${project.budget.toLocaleString()}`
      : "No budget set",
    duration: project.startDate && project.endDate
      ? calculateDuration(project.startDate, project.endDate)
      : "Dates not set",
  };
}

function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return `${days} days`;
}

export { 
  projectCollection, 
  projectConnector,
  performSync,
  type Project, 
  type Task 
};