import { AuthConnectorProps, RestConnector } from "@runlightyear/lightyear";
import { SendProps, send } from "./mail/send";

/**
 * @alpha
 */
export interface SendGridProps extends AuthConnectorProps {}

/**
 * SendGrid Connector
 *
 * @alpha
 *
 * @example Install
 * ```
 * npm install @runlightyear/sendgrid
 * ```
 *
 * @example Import
 * ```typescript
 * import { SendGrid } from "@runlightyear/sendgrid";
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "sendgrid-example",
 *   title: "SendGrid Example",
 *   apps: ["sendgrid"],
 *   run: async ({ auths }) => {
 *     const sendgrid = new SendGrid({
 *       auth: auths.sendgrid,
 *     });
 *   });
 * });
 * ```
 *
 * @example Send a a single email
 * ```typescript
 * // TODO
 * ```
 */
export class SendGrid extends RestConnector {
  constructor(props: SendGridProps) {
    super({
      ...props,
      baseUrl: "https://api.sendgrid.com/v3",
    });
  }

  async send(props: SendProps) {
    return send(this)(props);
  }
}
