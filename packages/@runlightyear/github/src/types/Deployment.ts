import { User } from "./User";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#deployment
 */
export type Deployment = {
  url: string;

  /**
   * Unique identifier of the deployment
   */
  id: number;

  nodeId: string;

  sha: string;

  /**
   * The ref to deploy. This can be a branch, tag, or sha.
   */
  ref: string;

  /**
   * Parameter to specify a task to execute
   */
  task: string;

  payload: object | string;

  originalEnvironment?: string;

  /**
   * Name for the target deployment environment.
   */
  environment: string;

  description: string | null;
  creator: User;

  createdAt: string;

  updatedAt: string;

  statusesUrl: string;

  repositoryUrl: string;

  /**
   * Specifies if the given environment is will no longer exist at some point in the future. Default: false.
   */
  transientEnvironment: boolean;

  /**
   * Specifies if the given environment is one that end-users directly interact with. Default: false.
   */
  productionEnvironment: boolean;

  /**
   * GitHub apps are a new way to extend GitHub. They can be installed directly on organizations and user accounts and granted access to specific repositories. They come with granular permissions and built-in webhooks. GitHub apps are first class actors within GitHub.
   */
  performedViaGithubApp: object;
};
