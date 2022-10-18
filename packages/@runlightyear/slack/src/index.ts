/**
 * This is the doc comment for the slack package
 *
 * @packageDocumentation
 */
import { RestConnector } from "@bigidea/integration";
import { Slack } from "./Slack";
import { SlackOauth } from "./SlackOauth";

import type { PostMessageOptions } from "./chat/postMessage";
import type {
  HttpProxyRequestOptions,
  HttpProxyResponse,
} from "@bigidea/integration";

export { Slack, SlackOauth, RestConnector };
export type { PostMessageOptions, HttpProxyRequestOptions, HttpProxyResponse };
