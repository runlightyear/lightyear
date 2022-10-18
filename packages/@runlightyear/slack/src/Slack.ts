import {
  RestConnector,
  AuthConnectorOptions,
  HttpProxyRequestOptions,
  HttpProxyResponse,
  defineAuth,
} from "@bigidea/integration";
import postMessage, { PostMessageOptions } from "./chat/postMessage";
import section from "./elements/blocks/section";
import plainText from "./elements/objects/plainText";
import markdownText from "./elements/objects/markdownText";
import actions from "./elements/blocks/actions";
import context from "./elements/blocks/context";
import divider from "./elements/blocks/divider";
import file from "./elements/blocks/file";
import header from "./elements/blocks/header";
import image from "./elements/blocks/image";
import video from "./elements/blocks/video";
import confirmationDialog from "./elements/objects/confirmationDialog";
import { SlackScope } from "./types/SlackScope";

/**
 * Connector to the Slack API
 *
 * @example Import
 * ```typescript
 * import { Slack } from '@bigidea/slack';
 * ```
 *
 * @example Create an auth
 *
 * ```typescript
 * const slackAuth = Slack.defineAuth({ name: 'slack' })
 * ```
 *
 * @example Use in a task
 *
 * ```typescript
 * defineTask({
 *   name: 'helloSlack',
 *   auths: {
 *     slack: slackAuth,
 *   },
 *   run: async ({ auths }) => {
 *     const slack = new Slack({ auth: auths.slack });
 *     await slack.postMessage({ channel: '#general', text: 'Hello Slack'})
 *   }
 * })
 * ```
 */
export class Slack extends RestConnector {
  /**
   * Define a slack auth
   */
  static defineAuth(options: { name: string; scopes: SlackScope[] }) {
    const { name } = options;

    return defineAuth({ name, app: "slack" });
  }

  /**
   * Create a new slack connector
   *
   * @param options
   */
  constructor(options: AuthConnectorOptions) {
    super({ ...options, baseUrl: "https://slack.com/api/" });
  }

  /**
   * @internal
   */
  authorizationHeaders(): { [p: string]: string } {
    const { accessToken, apiKey } = this.getAuthData();

    console.log("got the apiKey", apiKey);

    return {
      Authorization: `Bearer ${accessToken || apiKey}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * @internal
   */
  async request(options: HttpProxyRequestOptions): Promise<HttpProxyResponse> {
    const response = await super.request(options);
    let data = response.data;

    if (!data.ok && data.error === "token_expired") {
      await this.refreshToken();
      const responseAfterRefresh = await super.request(options);
      data = responseAfterRefresh.data;
    }

    if (!data.ok) {
      throw new Error(data.error);
    }
    return response;
  }

  /**
   * Sends a message to a channel
   *
   * @group Chat
   *
   * @example Basic hello world as text
   *
   * ```typescript
   * slack.postMessage({ channel: "#general", text: "hello world" });
   * ```
   *
   * @example Use blocks to structure display
   *
   * ```typescript
   * slack.postMessage({
   *   channel: "#general",
   *   blocks: [
   *     Slack.blocks.section("Title section"),
   *     Slack.blocks.section({
   *       fields: [
   *         Slack.objects.markdownText("*Data 1*\nvalue A"),
   *         Slack.objects.markdownText("*Data 2*\nvalue B"),
   *       ]
   *     }),
   *   ],
   *   text: "Use text as a fallback for notifications that can't display blocks",
   * })
   * ```
   *
   * @param options
   */
  async postMessage(options: PostMessageOptions): Promise<HttpProxyResponse> {
    return postMessage(this)(options);
  }

  static blocks = {
    actions: actions,
    context: context,
    divider: divider,
    file: file,
    header: header,
    image: image,
    section: section,
    video: video,
  };

  static objects = {
    plainText: plainText,
    markdownText: markdownText,
    confirmationDialog: confirmationDialog,
  };
}
