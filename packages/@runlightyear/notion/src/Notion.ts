import {
  HttpProxyRequestProps,
  HttpProxyResponse,
  RestConnector,
  RestConnectorProps,
} from "@runlightyear/lightyear";
import {
  queryDatabase,
  QueryDatabaseProps,
} from "./methods/databases/queryDatabase";
import { retrievePage, RetrievePageProps } from "./methods/pages/retrievePage";
import { createPage, CreatePageProps } from "./methods/pages/createPage";
import {
  retrieveBlockChildren,
  RetrieveBlockChildrenProps,
} from "./methods/blocks/retrieveBlockChildren";
import {
  updatePageProperties,
  UpdatePagePropertiesProps,
} from "./methods/pages/updatePageProperties";
import {
  retrieveDatabase,
  RetrieveDatabaseProps,
} from "./methods/databases/retrieveDatabase";
import {
  createDatabase,
  CreateDatabaseProps,
} from "./methods/databases/createDatabase";
import { camelizeNotionData } from "./util/camelizeNotionData";
import {
  onNewDatabaseItems,
  OnNewDatabaseItemsProps,
} from "./methods/listeners/onNewDatabaseItems";
import {
  onUpdatedDatabaseItems,
  OnUpdatedDatabaseItemsProps,
} from "./methods/listeners/onUpdatedDatabaseItems";

export interface NotionProps extends RestConnectorProps {}

/**
 * Connector to the Notion API
 *
 * @example Create a database
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "createDatabase",
 *   title: "Create Database",
 *   apps: ["notion"],
 *   variables: ["parentPageId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({
 *       auth: auths.notion,
 *     });
 *     const response = await notion.createDatabase({
 *       parent: {
 *         pageId: variables.parentPageId!,
 *       },
 *       title: [
 *         {
 *           text: {
 *             content: "Grocery List",
 *           },
 *         },
 *       ],
 *       properties: {
 *         Name: {
 *           title: {},
 *         },
 *         Description: {
 *           richText: {},
 *         },
 *         "In Stock": {
 *           checkbox: {},
 *         },
 *         "Food Group": {
 *           select: {
 *             options: [
 *               {
 *                 name: "🥦 Vegetable",
 *                 color: "green",
 *               },
 *               {
 *                 name: "🍎 Fruit",
 *                 color: "red",
 *               },
 *               {
 *                 name: "🍞 Carbs",
 *                 color: "yellow",
 *               },
 *             ],
 *           },
 *         },
 *         Price: {
 *           number: {
 *             format: "dollar",
 *           },
 *         },
 *         "Last Ordered": {
 *           date: {},
 *         },
 *         "Store Availability": {
 *           multiSelect: {
 *             options: [
 *               {
 *                 name: "Duc Loi Market",
 *                 color: "blue",
 *               },
 *               {
 *                 name: "Rainbow Grocery",
 *                 color: "gray",
 *               },
 *               {
 *                 name: "Nijiya Market",
 *                 color: "purple",
 *               },
 *               {
 *                 name: "Gus's Community Market",
 *                 color: "yellow",
 *               },
 *             ],
 *           },
 *         },
 *         "+1": {
 *           people: {},
 *         },
 *         Photo: {
 *           files: {},
 *         },
 *       },
 *     });
 *     console.log("Database: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Create a database with items
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "createDatabaseItems",
 *   title: "Create Database Items",
 *   apps: ["notion"],
 *   variables: ["parentPageId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({ auth: auths.notion });
 *     const response = await notion.createDatabase({
 *       parent: {
 *         pageId: variables.parentPageId!,
 *       },
 *       title: [
 *         {
 *           text: {
 *             content: "Shopping List",
 *           },
 *         },
 *       ],
 *       properties: {
 *         Name: {
 *           title: {},
 *         },
 *         Description: {
 *           richText: {},
 *         },
 *         Quantity: {
 *           number: {
 *             format: "number",
 *           },
 *         },
 *       },
 *     });
 *
 *     const newDatabaseId = response.data.id;
 *
 *     await notion.createPage({
 *       parent: {
 *         databaseId: newDatabaseId,
 *       },
 *       properties: {
 *         Name: {
 *           title: [
 *             {
 *               text: {
 *                 content: "🥦 Broccoli",
 *               },
 *             },
 *           ],
 *         },
 *         Description: {
 *           richText: [
 *             {
 *               text: {
 *                 content: "A green vegetable",
 *               },
 *             },
 *           ],
 *         },
 *         Quantity: {
 *           number: 1,
 *         },
 *       },
 *     });
 *
 *     await notion.createPage({
 *       parent: {
 *         databaseId: newDatabaseId,
 *       },
 *       properties: {
 *         Name: {
 *           title: [
 *             {
 *               text: {
 *                 content: "🍎 Apple",
 *               },
 *             },
 *           ],
 *         },
 *         Description: {
 *           richText: [
 *             {
 *               text: {
 *                 content: "A red fruit",
 *               },
 *             },
 *           ],
 *         },
 *         Quantity: {
 *           number: 2,
 *         },
 *       },
 *     });
 *
 *     await notion.createPage({
 *       parent: {
 *         databaseId: newDatabaseId,
 *       },
 *       properties: {
 *         Name: {
 *           title: [
 *             {
 *               text: {
 *                 content: "🍞 Bread",
 *               },
 *             },
 *           ],
 *         },
 *         Description: {
 *           richText: [
 *             {
 *               text: {
 *                 content: "A yellow carb",
 *               },
 *             },
 *           ],
 *         },
 *         Quantity: {
 *           number: 3,
 *         },
 *       },
 *     });
 *   },
 * });
 * ```
 *
 * @example Query a database
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "queryDatabase",
 *   title: "Query Database",
 *   apps: ["notion"],
 *   variables: ["databaseId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({
 *       auth: auths.notion,
 *     });
 *     const response = await notion.queryDatabase({
 *       databaseId: variables.databaseId!,
 *     });
 *     console.log("Query result: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Query a database with filter
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "queryDatabaseWithFilter",
 *   title: "Query Database With Filter",
 *   apps: ["notion"],
 *   variables: ["databaseId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({
 *       auth: auths.notion,
 *     });
 *     const response = await notion.queryDatabase({
 *       databaseId: variables.databaseId!,
 *       filter: {
 *         property: "Name",
 *         richText: {
 *           isNotEmpty: true,
 *         },
 *       },
 *     });
 *     console.log("Result: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Update a database item
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "updateDatabaseItem",
 *   title: "Update Database Item",
 *   apps: ["notion"],
 *   variables: ["databaseItemId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({ auth: auths.notion });
 *     const response = await notion.updatePageProperties({
 *       pageId: variables.databaseItemId!,
 *       properties: {
 *         Name: {
 *           title: [
 *             {
 *               text: {
 *                 content: "Updated name",
 *               },
 *             },
 *           ],
 *         },
 *       },
 *     });
 *     console.log("Updated database item:", response.data);
 *   },
 * });
 * ```
 *
 * @example Retrieve a database
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "retrieveDatabase",
 *   title: "Retrieve Database",
 *   apps: ["notion"],
 *   variables: ["databaseId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({
 *       auth: auths.notion,
 *     });
 *     const response = await notion.retrieveDatabase({
 *       databaseId: variables.databaseId!,
 *     });
 *     console.log("Result: ", response.data);
 *   },
 * });
 * ```
 *
 * @example Create a page
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "createPage",
 *   title: "Create Page",
 *   apps: ["notion"],
 *   variables: ["existingPageId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({ auth: auths.notion });
 *
 *     const response = await notion.createPage({
 *       parent: {
 *         pageId: variables.existingPageId!,
 *       },
 *       properties: {
 *         title: {
 *           title: [
 *             {
 *               text: {
 *                 content: "Hello World",
 *               },
 *             },
 *           ],
 *         },
 *       },
 *     });
 *     console.log("Created page", response.data);
 *   },
 * });
 * ```
 *
 * @example Create a page with children
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "createPageWithChildren",
 *   title: "Create Page With Children",
 *   apps: ["notion"],
 *   variables: ["existingPageId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({ auth: auths.notion });
 *
 *     const response = await notion.createPage({
 *       parent: {
 *         pageId: variables.existingPageId!,
 *       },
 *       properties: {
 *         title: {
 *           title: [
 *             {
 *               text: {
 *                 content: "Hello World, I have children!",
 *               },
 *             },
 *           ],
 *         },
 *       },
 *       children: [
 *         {
 *           heading2: {
 *             richText: [
 *               {
 *                 text: {
 *                   content: "This is a heading",
 *                 },
 *               },
 *             ],
 *           },
 *         },
 *         {
 *           paragraph: {
 *             richText: [
 *               {
 *                 text: {
 *                   content: "This is a paragraph I just wrote",
 *                 },
 *               },
 *             ],
 *           },
 *         },
 *       ],
 *     });
 *     console.log("Created page", response.data);
 *   },
 * });
 * ```
 *
 * @example Retrieve a page
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "retrievePage",
 *   title: "Retrieve Page",
 *   apps: ["notion"],
 *   variables: ["pageId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({ auth: auths.notion });
 *     const response = await notion.retrievePage({
 *       pageId: variables.pageId!,
 *     });
 *     console.log("Page:", response.data);
 *   },
 * });
 * ```
 *
 * @example Retrieve a block's children
 * ```typescript
 * import { defineAction } from "@runlightyear/lightyear";
 * import { Notion } from "@runlightyear/notion";
 *
 * defineAction({
 *   name: "retrieveBlockChildren",
 *   title: "Retrieve Block Children",
 *   apps: ["notion"],
 *   variables: ["blockId"],
 *   run: async ({ auths, variables }) => {
 *     const notion = new Notion({
 *       auth: auths.notion,
 *     });
 *     const response = await notion.retrieveBlockChildren({
 *       blockId: variables.blockId!,
 *     });
 *     console.log("Block children:", response.data);
 *   },
 * });
 * ```
 *
 */
export class Notion extends RestConnector {
  constructor(props: NotionProps) {
    super({ ...props, camelize: false });
  }

  getBaseUrl(): string {
    return "https://api.notion.com/v1";
  }

  /**
   * @internal
   */
  authorizationHeaders(): { [p: string]: string } {
    return { ...super.authorizationHeaders(), "Notion-Version": "2022-06-28" };
  }

  /**
   * @internal
   *
   * @param props
   */
  async request(props: HttpProxyRequestProps): Promise<HttpProxyResponse> {
    const response = await super.request(props);
    return {
      ...response,
      data: camelizeNotionData(response.data),
    };
  }

  /**
   * Query a database
   *
   * @group Databases
   *
   * Gets a list of Pages and/or Databases contained in the database, filtered and ordered according to the filter conditions and sort criteria provided in the request. The response may contain fewer than page_size of results. If the response includes a next_cursor value, refer to the pagination reference for details about how to use a cursor to iterate through the list.
   *
   * 📘
   * Wiki databases can contain both pages and databases as children.
   *
   * Filters are similar to the filters provided in the Notion UI where the set of filters and filter groups chained by "And" in the UI is equivalent to having each filter in the array of the compound "and" filter. Similar a set of filters chained by "Or" in the UI would be represented as filters in the array of the "or" compound filter.
   * Filters operate on database properties and can be combined. If no filter is provided, all the pages in the database will be returned with pagination.
   *
   * @example Query a database
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "queryDatabase",
   *   title: "Query Database",
   *   apps: ["notion"],
   *   variables: ["databaseId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({
   *       auth: auths.notion,
   *     });
   *     const response = await notion.queryDatabase({
   *       databaseId: variables.databaseId!,
   *     });
   *     console.log("Query result: ", response.data);
   *   },
   * });
   * ```
   *
   * @example Query a database with filter
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "queryDatabaseWithFilter",
   *   title: "Query Database With Filter",
   *   apps: ["notion"],
   *   variables: ["databaseId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({
   *       auth: auths.notion,
   *     });
   *     const response = await notion.queryDatabase({
   *       databaseId: variables.databaseId!,
   *       filter: {
   *         property: "Name",
   *         richText: {
   *           isNotEmpty: true,
   *         },
   *       },
   *     });
   *     console.log("Result: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async queryDatabase(props: QueryDatabaseProps) {
    return queryDatabase(this)(props);
  }

  /**
   * Create a page
   *
   * @group Pages
   *
   * Creates a new page that is a child of an existing page or database.
   *
   * If the new page is a child of an existing page,title is the only valid property in the properties body param.
   *
   * If the new page is a child of an existing database, the keys of the properties object body param must match the parent database's properties.
   *
   * This endpoint can be used to create a new page with or without content using the children option. To add content to a page after creating it, use the Append block children endpoint.
   *
   * Returns a new page object.
   *
   * Note: Some page properties are not supported via the API.
   *
   * A request body that includes rollup, created_by, created_time, last_edited_by, or last_edited_time values in the properties object returns an error. These Notion-generated values cannot be created or updated via the API. If the parent contains any of these properties, then the new page’s corresponding values are automatically created.
   *
   * Note: Requirements
   *
   *
   * Your integration must have update content capabilities on the target parent page or database in order to call this endpoint. To update your integrations capabilities, navigation to the My integrations dashboard, select your integration, go to the Capabilities tab, and update your settings as needed.
   *
   * Attempting a query without update content capabilities returns an HTTP response with a 403 status code.
   *
   * @example Create a page
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "createPage",
   *   title: "Create Page",
   *   apps: ["notion"],
   *   variables: ["existingPageId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({ auth: auths.notion });
   *
   *     const result = await notion.createPage({
   *       parent: {
   *         pageId: variables.existingPageId!,
   *       },
   *       properties: {
   *         title: {
   *           title: [
   *             {
   *               text: {
   *                 content: "Hello World",
   *               },
   *             },
   *           ],
   *         },
   *       },
   *     });
   *     const page = result.data;
   *     console.log("Created page", page);
   *   },
   * });
   * ```
   *
   * @example Create a database with items
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "createDatabaseItems",
   *   title: "Create Database Items",
   *   apps: ["notion"],
   *   variables: ["parentPageId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({ auth: auths.notion });
   *     const response = await notion.createDatabase({
   *       parent: {
   *         pageId: variables.parentPageId!,
   *       },
   *       title: [
   *         {
   *           text: {
   *             content: "Shopping List",
   *           },
   *         },
   *       ],
   *       properties: {
   *         Name: {
   *           title: {},
   *         },
   *         Description: {
   *           richText: {},
   *         },
   *         Quantity: {
   *           number: {
   *             format: "number",
   *           },
   *         },
   *       },
   *     });
   *
   *     const newDatabaseId = response.data.id;
   *
   *     await notion.createPage({
   *       parent: {
   *         databaseId: newDatabaseId,
   *       },
   *       properties: {
   *         Name: {
   *           title: [
   *             {
   *               text: {
   *                 content: "🥦 Broccoli",
   *               },
   *             },
   *           ],
   *         },
   *         Description: {
   *           richText: [
   *             {
   *               text: {
   *                 content: "A green vegetable",
   *               },
   *             },
   *           ],
   *         },
   *         Quantity: {
   *           number: 1,
   *         },
   *       },
   *     });
   *
   *     await notion.createPage({
   *       parent: {
   *         databaseId: newDatabaseId,
   *       },
   *       properties: {
   *         Name: {
   *           title: [
   *             {
   *               text: {
   *                 content: "🍎 Apple",
   *               },
   *             },
   *           ],
   *         },
   *         Description: {
   *           richText: [
   *             {
   *               text: {
   *                 content: "A red fruit",
   *               },
   *             },
   *           ],
   *         },
   *         Quantity: {
   *           number: 2,
   *         },
   *       },
   *     });
   *
   *     await notion.createPage({
   *       parent: {
   *         databaseId: newDatabaseId,
   *       },
   *       properties: {
   *         Name: {
   *           title: [
   *             {
   *               text: {
   *                 content: "🍞 Bread",
   *               },
   *             },
   *           ],
   *         },
   *         Description: {
   *           richText: [
   *             {
   *               text: {
   *                 content: "A yellow carb",
   *               },
   *             },
   *           ],
   *         },
   *         Quantity: {
   *           number: 3,
   *         },
   *       },
   *     });
   *   },
   * });
   * ```
   *
   * @param props
   */
  async createPage(props: CreatePageProps) {
    return createPage(this)(props);
  }

  /**
   * Retrieve a page
   *
   * @group Pages
   *
   * Retrieves a Page object using the ID specified.
   *
   * Responses contains page properties, not page content. To fetch page content, use the Retrieve block children endpoint.
   *
   * Page properties are limited to up to 25 references per page property. To retrieve data related to properties that have more than 25 references, use the Retrieve a page property endpoint. (See Limits below for additional information.)
   *
   * Parent objects: Pages vs. databases
   * If a page’s Parent object is a database, then the property values will conform to the database property schema.
   *
   * If a page object is not part of a database, then the only property value available for that page is its title.
   *
   * Limits
   * The endpoint returns a maximum of 25 page or person references per page property. If a page property includes more than 25 references, then the 26th reference and beyond might be returned as Untitled, Anonymous, or not be returned at all.
   *
   * This limit affects the following properties:
   *
   * people: response object can’t be guaranteed to return more than 25 people.
   * relation: the has_more value of the relation in the response object is true if a relation contains more than 25 related pages. Otherwise, has_more is false.
   * rich_text: response object includes a maximum of 25 populated inline page or person mentions.
   * title: response object includes a maximum of 25 inline page or person mentions.
   *
   * @example Retrieve a page
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "retrievePage",
   *   title: "Retrieve Page",
   *   apps: ["notion"],
   *   variables: ["pageId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({ auth: auths.notion });
   *     const response = await notion.retrievePage({
   *       pageId: variables.pageId!,
   *     });
   *     console.log("Page:", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async retrievePage(props: RetrievePageProps) {
    return retrievePage(this)(props);
  }

  /**
   * Update page properties
   *
   * @group Pages
   *
   * Updates the properties of a page in a database. The properties body param of this endpoint can only be used to update the properties of a page that is a child of a database. The page’s properties schema must match the parent database’s properties.
   *
   * This endpoint can be used to update any page icon or cover, and can be used to archive or restore any page.
   *
   * To add page content instead of page properties, use the append block children endpoint. The page_id can be passed as the block_id when adding block children to the page.
   *
   * Returns the updated page object.
   *
   * Note: Requirements
   *
   * Your integration must have update content capabilities on the target page in order to call this endpoint. To update your integrations capabilities, navigation to the My integrations dashboard, select your integration, go to the Capabilities tab, and update your settings as needed.
   *
   * Attempting a query without update content capabilities returns an HTTP response with a 403 status code.
   *
   *
   * Note: Limitations
   *
   *   * Updating rollup property values is not supported.
   *   * A page’s parent cannot be changed.
   *
   * @example Update a database item
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "updateDatabaseItem",
   *   title: "Update Database Item",
   *   apps: ["notion"],
   *   variables: ["databaseItemId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({ auth: auths.notion });
   *     const response = await notion.updatePageProperties({
   *       pageId: variables.databaseItemId!,
   *       properties: {
   *         Name: {
   *           title: [
   *             {
   *               text: {
   *                 content: "Updated name",
   *               },
   *             },
   *           ],
   *         },
   *       },
   *     });
   *     console.log("Updated database item:", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async updatePageProperties(props: UpdatePagePropertiesProps) {
    return updatePageProperties(this)(props);
  }

  /**
   * Retrieve block children
   *
   * @group Blocks
   *
   * Returns a paginated array of child block objects contained in the block using the ID specified. In order to receive a complete representation of a block, you may need to recursively retrieve the block children of child blocks.
   *
   * 👍
   * Page content is represented by block children. See the Working with page content guide for more information.
   *
   * Returns only the first level of children for the specified block. See block objects for more detail on determining if that block has nested children.
   *
   * The response may contain fewer than page_size of results.
   *
   * See Pagination for details about how to use a cursor to iterate through the list.
   *
   * Note: Integration capabilities
   *
   * This endpoint requires an integration to have read content capabilities. Attempting to call this API without read content capabilities will return an HTTP response with a 403 status code. For more information on integration capabilities, see the capabilities guide.
   *
   * @example Retrieve a block's children
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "retrieveBlockChildren",
   *   title: "Retrieve Block Children",
   *   apps: ["notion"],
   *   variables: ["blockId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({
   *       auth: auths.notion,
   *     });
   *     const response = await notion.retrieveBlockChildren({
   *       blockId: variables.blockId!,
   *     });
   *     console.log("Block children:", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async retrieveBlockChildren(props: RetrieveBlockChildrenProps) {
    return retrieveBlockChildren(this)(props);
  }

  /**
   * Create a database
   *
   * @group Databases
   *
   * Creates a database as a subpage in the specified parent page, with the specified properties schema. Currently, the parent of a new database must be a Notion page or a wiki database.
   *
   * @example Create a database
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "createDatabase",
   *   title: "Create Database",
   *   apps: ["notion"],
   *   variables: ["parentPageId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({
   *       auth: auths.notion,
   *     });
   *     const result = await notion.createDatabase({
   *       parent: {
   *         pageId: variables.parentPageId!,
   *       },
   *       title: [
   *         {
   *           text: {
   *             content: "Grocery List",
   *           },
   *         },
   *       ],
   *       properties: {
   *         Name: {
   *           title: {},
   *         },
   *         Description: {
   *           richText: {},
   *         },
   *         "In Stock": {
   *           checkbox: {},
   *         },
   *         "Food Group": {
   *           select: {
   *             options: [
   *               {
   *                 name: "🥦 Vegetable",
   *                 color: "green",
   *               },
   *               {
   *                 name: "🍎 Fruit",
   *                 color: "red",
   *               },
   *               {
   *                 name: "🍞 Carbs",
   *                 color: "yellow",
   *               },
   *             ],
   *           },
   *         },
   *         Price: {
   *           number: {
   *             format: "dollar",
   *           },
   *         },
   *         "Last Ordered": {
   *           date: {},
   *         },
   *         "Store Availability": {
   *           multiSelect: {
   *             options: [
   *               {
   *                 name: "Duc Loi Market",
   *                 color: "blue",
   *               },
   *               {
   *                 name: "Rainbow Grocery",
   *                 color: "gray",
   *               },
   *               {
   *                 name: "Nijiya Market",
   *                 color: "purple",
   *               },
   *               {
   *                 name: "Gus's Community Market",
   *                 color: "yellow",
   *               },
   *             ],
   *           },
   *         },
   *         "+1": {
   *           people: {},
   *         },
   *         Photo: {
   *           files: {},
   *         },
   *       },
   *     });
   *     console.log("Database: ", result.data);
   *   },
   * });
   * ```
   *
   * @example Create a database with items
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "createDatabaseItems",
   *   title: "Create Database Items",
   *   apps: ["notion"],
   *   variables: ["parentPageId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({ auth: auths.notion });
   *     const response = await notion.createDatabase({
   *       parent: {
   *         pageId: variables.parentPageId!,
   *       },
   *       title: [
   *         {
   *           text: {
   *             content: "Shopping List",
   *           },
   *         },
   *       ],
   *       properties: {
   *         Name: {
   *           title: {},
   *         },
   *         Description: {
   *           richText: {},
   *         },
   *         Quantity: {
   *           number: {
   *             format: "number",
   *           },
   *         },
   *       },
   *     });
   *
   *     const newDatabaseId = response.data.id;
   *
   *     await notion.createPage({
   *       parent: {
   *         databaseId: newDatabaseId,
   *       },
   *       properties: {
   *         Name: {
   *           title: [
   *             {
   *               text: {
   *                 content: "🥦 Broccoli",
   *               },
   *             },
   *           ],
   *         },
   *         Description: {
   *           richText: [
   *             {
   *               text: {
   *                 content: "A green vegetable",
   *               },
   *             },
   *           ],
   *         },
   *         Quantity: {
   *           number: 1,
   *         },
   *       },
   *     });
   *
   *     await notion.createPage({
   *       parent: {
   *         databaseId: newDatabaseId,
   *       },
   *       properties: {
   *         Name: {
   *           title: [
   *             {
   *               text: {
   *                 content: "🍎 Apple",
   *               },
   *             },
   *           ],
   *         },
   *         Description: {
   *           richText: [
   *             {
   *               text: {
   *                 content: "A red fruit",
   *               },
   *             },
   *           ],
   *         },
   *         Quantity: {
   *           number: 2,
   *         },
   *       },
   *     });
   *
   *     await notion.createPage({
   *       parent: {
   *         databaseId: newDatabaseId,
   *       },
   *       properties: {
   *         Name: {
   *           title: [
   *             {
   *               text: {
   *                 content: "🍞 Bread",
   *               },
   *             },
   *           ],
   *         },
   *         Description: {
   *           richText: [
   *             {
   *               text: {
   *                 content: "A yellow carb",
   *               },
   *             },
   *           ],
   *         },
   *         Quantity: {
   *           number: 3,
   *         },
   *       },
   *     });
   *   },
   * });
   * ```
   *
   * @param props
   */
  async createDatabase(props: CreateDatabaseProps) {
    return createDatabase(this)(props);
  }

  /**
   * Retrieve a database
   *
   * @group Databases
   *
   * Retrieves a database object — information that describes the structure and columns of a database — for a provided database ID. The response adheres to any limits to an integration’s capabilities.
   *
   * To fetch database rows rather than columns, use the Query a database endpoint.
   *
   * To find a database ID, navigate to the database URL in your Notion workspace. The ID is the string of characters in the URL that is between the slash following the workspace name (if applicable) and the question mark. The ID is a 32 characters alphanumeric string.
   *
   * @example Retrieve a database
   * ```typescript
   * import { defineAction } from "@runlightyear/lightyear";
   * import { Notion } from "@runlightyear/notion";
   *
   * defineAction({
   *   name: "retrieveDatabase",
   *   title: "Retrieve Database",
   *   apps: ["notion"],
   *   variables: ["databaseId"],
   *   run: async ({ auths, variables }) => {
   *     const notion = new Notion({
   *       auth: auths.notion,
   *     });
   *     const response = await notion.retrieveDatabase({
   *       databaseId: variables.databaseId!,
   *     });
   *     console.log("Result: ", response.data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  async retrieveDatabase(props: RetrieveDatabaseProps) {
    return retrieveDatabase(this)(props);
  }

  /**
   * On New Database Items
   *
   * @group Listeners
   *
   * @example On new database items
   * ```typescript
   * import { Notion } from "@runlightyear/notion";
   *
   * Notion.onNewDatabaseItems({
   *   name: "onNewDatabaseItems",
   *   title: "On New Database Items",
   *   pollingFrequency: 1,
   *   run: async ({ data }) => {
   *     console.log("New database items:", data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  static onNewDatabaseItems(props: OnNewDatabaseItemsProps) {
    return onNewDatabaseItems(props);
  }

  /**
   * On Updated Database Items
   *
   * @group Listeners
   *
   * @example On updated database items
   * ```typescript
   * import { Notion } from "@runlightyear/notion";
   *
   * Notion.onUpdatedDatabaseItems({
   *   name: "onUpdatedDatabaseItems",
   *   title: "On Updated Database Items",
   *   pollingFrequency: 1,
   *   run: async ({ data }) => {
   *     console.log("Updated database items:", data);
   *   },
   * });
   * ```
   *
   * @param props
   */
  static onUpdatedDatabaseItems(props: OnUpdatedDatabaseItemsProps) {
    return onUpdatedDatabaseItems(props);
  }
}
