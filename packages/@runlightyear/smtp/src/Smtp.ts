import { SmtpConnector, SmtpConnectorProps } from "@runlightyear/lightyear";
import invariant from "tiny-invariant";

/**
 * @alpha
 */
export interface SmtpProps extends SmtpConnectorProps {}

/**
 * @alpha
 *
 * Generic SMTP Connector
 *
 * @example Import
 * ```typescript
 * import { Smtp } from "@runlightyear/smtp";
 * ```
 *
 * @example Use in an action
 * ```typescript
 * defineAction({
 *   name: "smtpExample",
 *   title: "SMTP Example"
 *   apps: ["smtp"],
 *   run: async ({ auths }) => {
 *     const smtp = new Smtp({ auth: auths.smtp });
 *   }
 * }
 * ```
 *
 * @example Send an email
 * ```typescript
 * await smtp.sendMail({
 *   from: "<your email address>",
 *   to: "<your to line>"
 *   subject: "<your subject>",
 *   text: "<your plaintext email body>",
 *   html: "<your html email body>",
 * })
 * ```
 *
 */
export class Smtp extends SmtpConnector {
  /**
   * @example
   * ```typescript
   * defineAction({
   *   name: "smtpExample",
   *   title: "SMTP Example"
   *   apps: ["smtp"],
   *   run: async ({ auths }) => {
   *     const smtp = new Smtp({ auth: auths.smtp });
   *   }
   * }
   * ```
   *
   * @param props
   */
  constructor(props: SmtpProps) {
    super(props);
  }

  getUsernameAndPassword() {
    const { username, password } = this.getAuthData();

    invariant(username, "Missing username");
    invariant(password, "Missing password");

    return { username, password };
  }
}
