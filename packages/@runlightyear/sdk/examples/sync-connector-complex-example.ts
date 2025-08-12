/**
 * Complex Sync Connector Example
 *
 * This example demonstrates advanced features:
 * - Multiple models with relationships
 * - Bulk operations
 * - Custom pagination
 * - Extending collections
 * - Altering model connectors
 */

import { z } from "zod";
import {
  defineTypedCollection,
  defineRestConnector,
  createSyncConnector,
  match,
} from "../src";
import type { ExtractModelTypes } from "../src";

// 1. Define a CRM collection
const crmCollection = defineTypedCollection("crm")
  .addModel(
    "account",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        industry: { type: ["string", "null"] },
        annualRevenue: { type: ["number", "null"] },
        employeeCount: { type: ["integer", "null"] },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: ["id", "name", "createdAt", "updatedAt"],
    } as const,
    (model) =>
      model.withTitle("Account").withMatchPattern(match.property("name"))
  )
  .addModel(
    "contact",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        accountId: { type: "string" },
        email: { type: "string", format: "email" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        title: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
        lastContactDate: { type: ["string", "null"], format: "date-time" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: [
        "id",
        "accountId",
        "email",
        "firstName",
        "lastName",
        "createdAt",
        "updatedAt",
      ],
    } as const,
    (model) =>
      model.withTitle("Contact").withMatchPattern(match.property("email"))
  )
  .deploy();

// Extract types
type CRMTypes = ExtractModelTypes<typeof crmCollection>;
type Account = CRMTypes["account"];
type Contact = CRMTypes["contact"];

// 2. Create REST connector with custom configuration
const crmApiConnector = defineRestConnector()
  .withBaseUrl("https://api.crm-system.com/v2")
  .addHeader("X-API-Key", process.env.CRM_API_KEY || "demo-key")
  .addHeader("X-API-Version", "2024-01")
  .build();

// 3. Create sync connector
const crmSync = createSyncConnector(crmApiConnector, crmCollection);

// 4. Configure account model connector with all operations
crmSync
  .addModelConnector("account")
  // List with cursor-based pagination
  .withList(
    (pagination) => {
      if (pagination.type === "cursor" && pagination.cursor) {
        return `/accounts?cursor=${pagination.cursor}&limit=${pagination.limit}`;
      }
      return `/accounts?limit=${pagination.limit}`;
    },
    {
      responseSchema: z.object({
        accounts: z.array(
          z.object({
            account_id: z.string(),
            company_name: z.string(),
            industry_type: z.string().nullable(),
            annual_revenue_usd: z.number().nullable(),
            employee_count: z.number().nullable(),
            created_timestamp: z.string(),
            updated_timestamp: z.string(),
          })
        ),
        pagination: z.object({
          has_more: z.boolean(),
          next_cursor: z.string().optional(),
        }),
      }),
      transform: (apiAccount) => ({
        id: apiAccount.account_id,
        name: apiAccount.company_name,
        industry: apiAccount.industry_type,
        annualRevenue: apiAccount.annual_revenue_usd,
        employeeCount: apiAccount.employee_count,
        createdAt: apiAccount.created_timestamp,
        updatedAt: apiAccount.updated_timestamp,
      }),
      getNextPage: (response, current) => {
        if (response.pagination.has_more && response.pagination.next_cursor) {
          return {
            type: "cursor",
            cursor: response.pagination.next_cursor,
            limit: current.limit,
          };
        }
        return null;
      },
    }
  )
  // Create operation
  .withCreate("/accounts", {
    transform: (account) => ({
      company_name: account.name,
      industry_type: account.industry,
      annual_revenue_usd: account.annualRevenue,
      employee_count: account.employeeCount,
    }),
    responseTransform: (response) => ({
      id: response.account_id,
      createdAt: response.created_timestamp,
      updatedAt: response.updated_timestamp,
    }),
  })
  // Update operation
  .withUpdate((id) => `/accounts/${id}`, {
    transform: (account, previous) => {
      const updates: any = {};
      if (!previous || account.name !== previous.name) {
        updates.company_name = account.name;
      }
      if (!previous || account.industry !== previous.industry) {
        updates.industry_type = account.industry;
      }
      if (!previous || account.annualRevenue !== previous.annualRevenue) {
        updates.annual_revenue_usd = account.annualRevenue;
      }
      if (!previous || account.employeeCount !== previous.employeeCount) {
        updates.employee_count = account.employeeCount;
      }
      return updates;
    },
    responseTransform: (response) => ({
      updatedAt: response.updated_timestamp,
    }),
  })
  // Delete operation
  .withDelete((id) => `/accounts/${id}`)
  // Bulk operations
  .withBulkCreate("/accounts/bulk", {
    maxBatchSize: 50,
    transform: (accounts) => ({
      accounts: accounts.map((account) => ({
        company_name: account.name,
        industry_type: account.industry,
        annual_revenue_usd: account.annualRevenue,
        employee_count: account.employeeCount,
      })),
    }),
    responseTransform: (response, accounts) => {
      return accounts.map((account, index) => ({
        ...account,
        id: response.created_ids[index],
        createdAt: response.timestamp,
        updatedAt: response.timestamp,
      }));
    },
  })
  .withBulkUpdate("/accounts/bulk-update", {
    maxBatchSize: 100,
    transform: (accounts) => ({
      updates: accounts.map((account) => ({
        account_id: account.id,
        company_name: account.name,
        industry_type: account.industry,
        annual_revenue_usd: account.annualRevenue,
        employee_count: account.employeeCount,
      })),
    }),
  })
  .withBulkDelete("/accounts/bulk-delete", {
    maxBatchSize: 200,
    transform: (accounts) => ({
      account_ids: accounts.map((a) => a.id),
    }),
  });

// 5. Configure contact model connector (showing chaining approach)
// Alternative: You could chain multiple models using .and() or .addModelConnector()
crmSync.addModelConnector("contact").withList("/contacts", {
  responseSchema: z.object({
    contacts: z.array(
      z.object({
        contact_id: z.string(),
        account_id: z.string(),
        email_address: z.string().email(),
        first_name: z.string(),
        last_name: z.string(),
        job_title: z.string().nullable(),
        phone_number: z.string().nullable(),
        last_contact_date: z.string().nullable(),
        created_at: z.string(),
        updated_at: z.string(),
      })
    ),
    total: z.number(),
  }),
  transform: (apiContact) => ({
    id: apiContact.contact_id,
    accountId: apiContact.account_id,
    email: apiContact.email_address,
    firstName: apiContact.first_name,
    lastName: apiContact.last_name,
    title: apiContact.job_title,
    phone: apiContact.phone_number,
    lastContactDate: apiContact.last_contact_date,
    createdAt: apiContact.created_at,
    updatedAt: apiContact.updated_at,
  }),
});

// 6. Extend collection with a new model
const extendedCrmCollection = defineTypedCollection("extended-crm")
  .withTitle("Extended CRM")
  // Include all existing models
  .addModel("account", crmCollection.models.account.schema, (m) => m)
  .addModel("contact", crmCollection.models.contact.schema, (m) => m)
  // Add new model
  .addModel(
    "opportunity",
    {
      type: "object",
      properties: {
        id: { type: "string" },
        accountId: { type: "string" },
        name: { type: "string" },
        value: { type: "number" },
        stage: { type: "string" },
        closeDate: { type: "string", format: "date" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
      required: [
        "id",
        "accountId",
        "name",
        "value",
        "stage",
        "closeDate",
        "createdAt",
        "updatedAt",
      ],
    } as const,
    (m) => m.withTitle("Opportunity")
  )
  .deploy();

// Create extended sync connector
const extendedSync = crmSync.withExtendedCollection(extendedCrmCollection);

// Add opportunity connector
extendedSync.addModelConnector("opportunity").withList("/opportunities", {
  responseSchema: z.array(
    z.object({
      id: z.string(),
      account_id: z.string(),
      name: z.string(),
      value: z.number(),
      stage: z.string(),
      close_date: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    })
  ),
  transform: (api) => ({
    id: api.id,
    accountId: api.account_id,
    name: api.name,
    value: api.value,
    stage: api.stage,
    closeDate: api.close_date,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  }),
});

// 7. Example: Alternative chaining approach for multiple models
// You could configure all models in a single chain:
const chainedCrmSync = createSyncConnector(crmApiConnector, crmCollection);

chainedCrmSync
  .withDefaultPagination("cursor")
  // Add all models upfront
  .withModelConnectors("account", "contact", "opportunity");

// Or chain them one by one:
const fluentCrmSync = createSyncConnector(crmApiConnector, crmCollection)
  .withDefaultPagination("page");

fluentCrmSync
  .addModelConnector("account")
  .withList("/accounts", {
    responseSchema: z.object({ accounts: z.array(z.any()) }),
    transform: (response) => response.accounts,
  })
  .and() // Return to sync builder
  .addModelConnector("contact")
  .withList("/contacts", {
    responseSchema: z.object({ contacts: z.array(z.any()) }),
    transform: (response) => response.contacts,
  })
  .addModelConnector("opportunity") // Or chain directly
  .withList("/opportunities", {
    responseSchema: z.object({ opportunities: z.array(z.any()) }),
    transform: (response) => response.opportunities,
  });

// 8. Alter existing model connector behavior
crmSync.alterModelConnector("account", (connector) => {
  // Add custom filtering to list operation
  const originalList = connector.list.bind(connector);
  connector.list = async (pagination) => {
    console.log("Custom logic: Filtering inactive accounts...");
    const result = await originalList(pagination);
    // Filter out inactive accounts (example)
    result.data = result.data.filter(
      (account) => account.annualRevenue === null || account.annualRevenue > 0
    );
    return result;
  };
});

// Usage examples
async function demonstrateComplexSync() {
  const accountConnector = crmSync.getModelConnector("account");
  const contactConnector = crmSync.getModelConnector("contact");

  if (!accountConnector || !contactConnector) return;

  // 1. List all accounts with pagination
  console.log("Fetching all accounts...");
  const allAccounts = await accountConnector.listAll({
    maxPages: 5,
    pageSize: 50,
  });
  console.log(`Total accounts: ${allAccounts.length}`);

  // 2. Bulk create accounts
  console.log("\nBulk creating accounts...");
  const newAccounts: Account[] = [
    {
      id: "",
      name: "Acme Corp",
      industry: "Technology",
      annualRevenue: 5000000,
      employeeCount: 50,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "",
      name: "Global Industries",
      industry: "Manufacturing",
      annualRevenue: 10000000,
      employeeCount: 200,
      createdAt: "",
      updatedAt: "",
    },
  ];

  const bulkResult = await accountConnector.bulkCreate(newAccounts);
  console.log(
    `Created: ${bulkResult.successful.length}, Failed: ${bulkResult.failed.length}`
  );

  // 3. Update account
  if (allAccounts.length > 0) {
    const accountToUpdate = allAccounts[0];
    const updated = await accountConnector.update(
      {
        ...accountToUpdate,
        annualRevenue: (accountToUpdate.annualRevenue || 0) * 1.1, // 10% increase
      },
      accountToUpdate
    );
    console.log(`Updated account: ${updated.name}`);
  }

  // 4. List contacts with custom pagination
  console.log("\nFetching contacts...");
  const contactsPage1 = await contactConnector.list({
    type: "page",
    page: 1,
    limit: 25,
  });
  console.log(`Contacts page 1: ${contactsPage1.data.length} items`);

  // 5. Use extended sync with opportunities
  const opportunityConnector = extendedSync.getModelConnector("opportunity");
  if (opportunityConnector) {
    const opportunities = await opportunityConnector.list();
    console.log(`Opportunities: ${opportunities.data.length}`);
  }

  // 6. Bulk delete (careful!)
  const accountsToDelete = allAccounts.slice(0, 2);
  if (accountsToDelete.length > 0) {
    const deleteResult = await accountConnector.bulkDelete(accountsToDelete);
    console.log(`Deleted: ${deleteResult.successful.length}`);
  }
}

// Type safety examples
function typeSafetyDemo() {
  // TypeScript error: model doesn't exist
  // crmSync.addModelConnector("invalid");

  // TypeScript knows the exact model types
  const accountConnector = crmSync.getModelConnector("account");
  if (accountConnector) {
    // Type is inferred as Account
    accountConnector.create({
      id: "",
      name: "Test",
      industry: "Tech",
      annualRevenue: 1000000,
      employeeCount: 10,
      createdAt: "",
      updatedAt: "",
    });
  }

  // Extended collection has all types
  const extOpportunityConnector = extendedSync.getModelConnector("opportunity");
  // TypeScript knows this exists only on extended collection
}

export {
  crmCollection,
  extendedCrmCollection,
  crmSync,
  extendedSync,
  demonstrateComplexSync,
};
