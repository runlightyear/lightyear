/**
 * Examples of the new connector syntax with fluent builder pattern
 *
 * Demonstrates createRestConnector, createSyncConnector, and createOAuthConnector
 * with extensible fluent APIs that require .build() to finish construction
 */

import {
  createRestConnector,
  createSyncConnector,
  createOAuthConnector,
  defineCollection,
  defineModel,
  PaginationStrategies,
} from "../src/builders";
import { z } from "zod";

// Example 1: Simple REST Connector
const simpleRestConnector = createRestConnector()
  .withBaseUrl("https://api.example.com")
  .build();

// Example 2: REST Connector with custom headers
const authenticatedRestConnector = createRestConnector()
  .withBaseUrl("https://api.github.com")
  .addHeader("Authorization", "Bearer ghp_xxxxxxxxxxxx")
  .addHeader("X-GitHub-Api-Version", "2022-11-28")
  .addHeader("Accept", "application/vnd.github+json")
  .build();

// Example 3: OAuth Connector with fluent API
const githubOAuthConnector = createOAuthConnector("github")
  .withAuthUrl("https://github.com/login/oauth/authorize")
  .withTokenUrl("https://github.com/login/oauth/access_token")
  .withScope(["repo", "user"])
  .addScope("gist") // Can add more scopes before building
  .withHeaders({
    Accept: "application/json",
  })
  .build();

// Example 4: Simple Sync Connector (no configuration)
const userSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
  },
  required: ["id", "name", "email"],
} as const;

const userModel = defineModel("user", userSchema).deploy();

const userCollection = defineCollection("users")
  .addModel(userModel)
  .deploy();

// Basic sync connector with model configurations
const basicSyncConnector = createSyncConnector(
  simpleRestConnector,
  userCollection
)
  .addModelConnector("user")
  .withList("/users", {
    responseSchema: z.object({ users: z.array(z.any()) }),
    transform: (response) => response.users,
  })
  .and()
  .build();

// Example 5: Configured Sync Connector
const apiResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      attributes: z.object({
        name: z.string(),
        email: z.string(),
      }),
    })
  ),
  meta: z.object({
    hasMore: z.boolean(),
    nextCursor: z.string().optional(),
  }),
});

const configuredSyncConnector = createSyncConnector(
  authenticatedRestConnector,
  userCollection
)
  .withDefaultPagination("cursor")
  .addModelConnector("user")
  .withList("/users", {
    responseSchema: apiResponseSchema,
    transform: (response) =>
      response.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
        email: item.attributes.email,
      })),
  })
  .withCreate("/users", {
    transform: (user) => ({
      data: {
        type: "users",
        attributes: {
          name: user.name,
          email: user.email,
        },
      },
    }),
    responseTransform: (response) => ({ id: response.data.id }),
  })
  .withUpdate((id) => `/users/${id}`, {
    transform: (user) => ({
      data: {
        type: "users",
        id: user.id,
        attributes: {
          name: user.name,
          email: user.email,
        },
      },
    }),
  })
  .withDelete((id) => `/users/${id}`)
  .and()
  .build();

// Example 6: HubSpot-style Sync Connector with multiple models
const crmSchema = {
  account: {
    type: "object",
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      domain: { type: "string" },
    },
    required: ["id", "name"],
  } as const,
  contact: {
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      firstName: { type: "string" },
      lastName: { type: "string" },
    },
    required: ["id", "email"],
  } as const,
};

const accountModel = defineModel("account", crmSchema.account).deploy();
const contactModel = defineModel("contact", crmSchema.contact).deploy();

const crmCollection = defineCollection("crm")
  .addModel(accountModel)
  .addModel(contactModel)
  .deploy();

const hubspotConnector = createRestConnector()
  .withBaseUrl("https://api.hubapi.com")
  .addHeader("Authorization", "Bearer YOUR_API_KEY")
  .build();

const hubspotSyncConnector = createSyncConnector(
  hubspotConnector,
  crmCollection
)
  .withDefaultPagination("hubspot")
  .addModelConnector("account")
  .withList("/crm/v3/objects/companies", {
    responseSchema: z.object({
      results: z.array(z.any()),
      paging: z
        .object({
          next: z
            .object({
              after: z.string(),
            })
            .optional(),
        })
        .optional(),
    }),
    transform: (response) =>
      response.results.map((company) => ({
        id: company.id,
        name: company.properties.name || "",
        domain: company.properties.domain || "",
      })),
  })
  .and()
  .addModelConnector("contact")
  .withList("/crm/v3/objects/contacts", {
    responseSchema: z.object({
      results: z.array(z.any()),
      paging: z
        .object({
          next: z
            .object({
              after: z.string(),
            })
            .optional(),
        })
        .optional(),
    }),
    transform: (response) =>
      response.results.map((contact) => ({
        id: contact.id,
        email: contact.properties.email || "",
        firstName: contact.properties.firstname || "",
        lastName: contact.properties.lastname || "",
      })),
  })
  .withCreate("/crm/v3/objects/contacts", {
    transform: (contact) => ({
      properties: {
        email: contact.email,
        firstname: contact.firstName,
        lastname: contact.lastName,
      },
    }),
  })
  .and()
  .build();

// Usage examples
async function demonstrateUsage() {
  // Using REST connector
  const response = await simpleRestConnector.get({ url: "/users" });
  console.log("Users:", response.data);

  // Using OAuth connector - the build() method returns a factory function
  const githubConnector = githubOAuthConnector({
    getAuthCredentials: async () => ({
      accessToken: "gho_xxxxxxxxxxxx",
    }),
  });
  const repos = await githubConnector.get({ url: "/user/repos" });
  console.log("Repos:", repos.data);

  // Using Sync connector
  const userConnector = configuredSyncConnector.getModelConnector("user");
  if (userConnector) {
    const users = await userConnector.list();
    console.log(`Found ${users.data.length} users`);

    const newUser = await userConnector.create({
      id: "temp",
      name: "John Doe",
      email: "john@example.com",
    });
    console.log("Created user:", newUser);
  }

  // Using HubSpot sync connector
  const accountConnector = hubspotSyncConnector.getModelConnector("account");
  if (accountConnector) {
    const accounts = await accountConnector.listAll({ maxPages: 5 });
    console.log(`Synced ${accounts.length} accounts`);
  }
}

export {
  simpleRestConnector,
  authenticatedRestConnector,
  githubOAuthConnector,
  basicSyncConnector,
  configuredSyncConnector,
  hubspotSyncConnector,
};
