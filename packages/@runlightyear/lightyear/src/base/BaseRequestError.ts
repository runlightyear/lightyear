import { Response } from "node-fetch";

export class BaseRequestError extends Error {
  response: Response;

  constructor(response: Response) {
    super(
      `BaseRequestError: Response: ${response.status} ${response.statusText}`
    );
    this.response = response;
  }
}
