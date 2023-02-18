/**
 * This is the doc comment for the slack package
 *
 * @packageDocumentation
 */
import { RestConnector } from "@runlightyear/lightyear";
import { Slack } from "./Slack";
import { SlackOauth } from "./SlackOauth";

import type { PostMessageProps } from "./chat/postMessage";
import type {
  HttpProxyRequestProps,
  HttpProxyResponse,
} from "@runlightyear/lightyear";

export { Slack, SlackOauth, RestConnector };
export type { PostMessageProps, HttpProxyRequestProps, HttpProxyResponse };
