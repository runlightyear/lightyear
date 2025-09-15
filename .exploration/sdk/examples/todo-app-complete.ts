import { defineCollection, match } from '../builders';
import { defineCustomApp } from '../app-builder';
import { defineIntegration } from '../integration-builder-final';
import { defineRestConnector } from '../rest-connector';
import { defineMultiModelSync } from '../sync-connector-multi-model';

/**
 * Complete example: Todo App Integration
 * Syncs users and tasks from "Other Todo App" to our platform
 */

// Step 1: Define the collection with schemas
const todoCollection = defineCollection('todo_data')
  .withTitle('Todo Application Data')
  
  // User model
  .addModel('user', {
    title: 'User',
    matchPattern: match.or('email', 'userId'),
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        role: { type: 'string', enum: ['admin', 'member', 'guest'] },
        active: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        lastLogin: { type: 'string', format: 'date-time' }
      },
      required: ['userId', 'email', 'name']
    }
  })
  
  // Task model
  .addModel('task', {
    title: 'Task',
    matchPattern: 'taskId',
    schema: {
      type: 'object',
      properties: {
        taskId: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string', enum: ['todo', 'in_progress', 'done', 'archived'] },
        priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
        assigneeId: { type: 'string' },
        creatorId: { type: 'string' },
        dueDate: { type: 'string', format: 'date' },
        tags: { type: 'array', items: { type: 'string' } },
        completedAt: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      },
      required: ['taskId', 'title', 'status', 'creatorId']
    }
  })
  
  .build();

// Step 2: Define the custom app
const todoApp = defineCustomApp('other_todo_app', 'OAUTH2')
  .withTitle('Other Todo App')
  .withVariables('clientId', 'clientSecret', 'subdomain')
  .withSecrets('clientSecret')
  .build();

// Step 3: Create the REST connector
const todoRestConnector = defineRestConnector()
  .withBaseUrl('https://${subdomain}.othertodoapp.com/api/v2') // Subdomain will be replaced
  .withAuthHeader('Authorization')
  .withDefaultHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Version': '2.0'
  })
  .build(httpProxy, batchProxy);

// Step 4: Create the sync connector
const todoSyncConnector = defineMultiModelSync()
  .withCollection(todoCollection)
  .withConnector(todoRestConnector)
  
  // Common sync logic for both models
  .withCommonList(async (mode, state, api) => {
    // The API returns both users and tasks in a single endpoint
    if (mode === 'full' || !state.lastSyncTime) {
      // Full sync - get everything
      const response = await api.get('/sync/full', {
        page: state.page || 1,
        per_page: 100,
        include: 'users,tasks'
      });
      
      return {
        items: [
          ...response.data.users.map((u: any) => ({ ...u, _type: 'user' })),
          ...response.data.tasks.map((t: any) => ({ ...t, _type: 'task' }))
        ],
        nextState: {
          page: (state.page || 1) + 1,
          total_pages: response.data.meta.total_pages
        },
        hasMore: (state.page || 1) < response.data.meta.total_pages
      };
    } else {
      // Incremental sync - get changes since last sync
      const response = await api.get('/sync/changes', {
        since: state.lastSyncTime.toISOString(),
        cursor: state.cursor
      });
      
      return {
        items: [
          ...response.data.created.map((item: any) => ({ ...item, _change: 'create' })),
          ...response.data.updated.map((item: any) => ({ ...item, _change: 'update' })),
          ...response.data.deleted.map((item: any) => ({ ...item, _change: 'delete' }))
        ],
        nextState: {
          cursor: response.data.next_cursor,
          lastSyncTime: new Date()
        },
        hasMore: !!response.data.next_cursor
      };
    }
  })
  
  // User model configuration
  .forModel('user', {
    extractItems: response => 
      response.items.filter((item: any) => 
        item._type === 'user' || item.object_type === 'user'
      ),
    
    mapFromApi: (item: any) => {
      // Handle deletes
      if (item._change === 'delete') {
        return {
          id: item.id,
          data: null
        };
      }
      
      // Map from Other Todo App format to our format
      return {
        id: item.id,
        data: {
          userId: item.id,
          email: item.email_address,
          name: item.full_name,
          role: mapUserRole(item.permission_level),
          active: item.status === 'active',
          createdAt: item.created_at,
          lastLogin: item.last_seen_at
        }
      };
    },
    
    mapToApi: (data: any, operation) => {
      if (operation === 'delete') return null;
      
      // Map from our format to Other Todo App format
      return {
        email_address: data.email,
        full_name: data.name,
        permission_level: mapToApiRole(data.role),
        status: data.active ? 'active' : 'inactive'
      };
    },
    
    getEndpoint: (data, operation) => {
      switch (operation) {
        case 'create':
          return { path: '/users', method: 'POST' };
        case 'update':
          return { path: `/users/${data.userId}`, method: 'PUT' };
        case 'delete':
          return { path: `/users/${data.userId}`, method: 'DELETE' };
      }
    },
    
    // Only sync active users
    shouldSync: (item: any) => item.status !== 'deleted'
  })
  
  // Task model configuration
  .forModel('task', {
    extractItems: response => 
      response.items.filter((item: any) => 
        item._type === 'task' || item.object_type === 'task'
      ),
    
    mapFromApi: (item: any) => {
      if (item._change === 'delete') {
        return {
          id: item.id,
          data: null
        };
      }
      
      return {
        id: item.id,
        data: {
          taskId: item.id,
          title: item.name,
          description: item.details || '',
          status: mapTaskStatus(item.state),
          priority: mapTaskPriority(item.priority_level),
          assigneeId: item.assigned_to_id,
          creatorId: item.created_by_id,
          dueDate: item.due_on,
          tags: item.labels || [],
          completedAt: item.completed_at,
          createdAt: item.created_at,
          updatedAt: item.modified_at
        }
      };
    },
    
    mapToApi: (data: any, operation) => {
      if (operation === 'delete') return null;
      
      return {
        name: data.title,
        details: data.description,
        state: mapToApiStatus(data.status),
        priority_level: mapToApiPriority(data.priority),
        assigned_to_id: data.assigneeId,
        due_on: data.dueDate,
        labels: data.tags
      };
    },
    
    getEndpoint: (data, operation) => {
      switch (operation) {
        case 'create':
          return { path: '/tasks', method: 'POST' };
        case 'update':
          return { path: `/tasks/${data.taskId}`, method: 'PATCH' };
        case 'delete':
          return { path: `/tasks/${data.taskId}`, method: 'DELETE' };
      }
    },
    
    // Don't sync archived tasks in incremental syncs
    shouldSync: (item: any) => 
      item._change === 'delete' || item.state !== 'archived'
  })
  
  .build();

// Step 5: Define the integration
const todoIntegration = defineIntegration('other_todo_sync')
  .withTitle('Other Todo App Sync')
  .withCustomApp(todoApp)
  .withCollections({
    todo_data: todoCollection
  })
  .build();

// Helper functions for mapping between data models
function mapUserRole(apiRole: string): string {
  const roleMap: Record<string, string> = {
    'administrator': 'admin',
    'standard_user': 'member',
    'limited_user': 'guest'
  };
  return roleMap[apiRole] || 'guest';
}

function mapToApiRole(role: string): string {
  const roleMap: Record<string, string> = {
    'admin': 'administrator',
    'member': 'standard_user',
    'guest': 'limited_user'
  };
  return roleMap[role] || 'limited_user';
}

function mapTaskStatus(apiState: string): string {
  const statusMap: Record<string, string> = {
    'new': 'todo',
    'started': 'in_progress',
    'completed': 'done',
    'archived': 'archived'
  };
  return statusMap[apiState] || 'todo';
}

function mapToApiStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'todo': 'new',
    'in_progress': 'started',
    'done': 'completed',
    'archived': 'archived'
  };
  return statusMap[status] || 'new';
}

function mapTaskPriority(apiPriority: number): string {
  if (apiPriority >= 4) return 'urgent';
  if (apiPriority === 3) return 'high';
  if (apiPriority === 2) return 'medium';
  return 'low';
}

function mapToApiPriority(priority: string): number {
  const priorityMap: Record<string, number> = {
    'urgent': 4,
    'high': 3,
    'medium': 2,
    'low': 1
  };
  return priorityMap[priority] || 1;
}

// Usage example
async function runTodoSync() {
  try {
    // Run full sync initially
    console.log('Starting full sync...');
    const fullSyncResult = await todoSyncConnector.sync('full');
    console.log('Full sync completed:', {
      usersCreated: fullSyncResult.read.created,
      usersUpdated: fullSyncResult.read.updated,
      errors: fullSyncResult.read.errors
    });
    
    // Run incremental syncs periodically
    console.log('Starting incremental sync...');
    const incrementalResult = await todoSyncConnector.sync('incremental');
    console.log('Incremental sync completed:', incrementalResult);
    
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Export everything for use
export {
  todoCollection,
  todoApp,
  todoIntegration,
  todoRestConnector,
  todoSyncConnector,
  runTodoSync
};