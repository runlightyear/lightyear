/**
 * This is the doc comment for the slack package
 *
 * @packageDocumentation
 */
import { RestConnector } from "@runlightyear/lightyear";
import { Slack } from "./Slack";
import { SlackOAuth } from "./SlackOAuth";

import type { PostMessageProps } from "./chat/postMessage";
import type {
  HttpProxyRequestProps,
  HttpProxyResponse,
} from "@runlightyear/lightyear";

export { Slack, SlackOAuth, RestConnector };
export type { PostMessageProps, HttpProxyRequestProps, HttpProxyResponse };
