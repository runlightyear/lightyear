import { defineRestConnector } from "../src/builders/restConnector";

/**
 **## REST Connector Usage Examples**
 *
 * This file demonstrates how to use the REST connector with the fluent API
 * to make HTTP requests through the Lightyear proxy.
 */

// Example 1: Basic REST connector with default headers
const basicConnector = defineRestConnector()
  .withBaseUrl("https://api.example.com")
  .build();

// Example 2: Connector with custom headers
const connectorWithHeaders = defineRestConnector()
  .withBaseUrl("https://api.github.com")
  .addHeader("Authorization", "Bearer your-token-here")
  .addHeader("User-Agent", "MyApp/1.0")
  .build();

// Example 3: Connector with completely custom headers (overriding defaults)
const customHeadersConnector = defineRestConnector()
  .withBaseUrl("https://api.example.com")
  .withHeaders({
    "Content-Type": "application/xml",
    Accept: "application/xml",
    Authorization: "Bearer token123",
  })
  .build();

// Example 4: Adding multiple headers at once
const bulkHeadersConnector = defineRestConnector()
  .withBaseUrl("https://jsonplaceholder.typicode.com")
  .addHeaders({
    "X-API-Key": "abc123",
    "X-Client-Version": "1.0.0",
    "Cache-Control": "no-cache",
  })
  .build();

// Example usage in an action
async function exampleAction() {
  // Using the connector to make various HTTP requests

  // GET request
  const getUsersResponse = await basicConnector.get({
    url: "/users",
    params: { page: 1, limit: 10 },
  });

  // POST request with JSON data
  const createUserResponse = await basicConnector.post({
    url: "/users",
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  });

  // PUT request to update a resource
  const updateUserResponse = await basicConnector.put({
    url: "/users/123",
    data: {
      name: "Jane Doe",
      email: "jane@example.com",
    },
  });

  // DELETE request
  const deleteUserResponse = await basicConnector.delete({
    url: "/users/123",
  });

  // Custom request with additional headers for this specific call
  const customResponse = await basicConnector.get({
    url: "/protected-endpoint",
    headers: {
      Authorization: "Bearer specific-token-for-this-request",
    },
    redactKeys: ["access_token"], // Keys to redact from logs
  });

  console.log("Responses:", {
    users: getUsersResponse.data,
    created: createUserResponse.data,
    updated: updateUserResponse.data,
    deleted: deleteUserResponse.status,
    custom: customResponse.data,
  });
}
