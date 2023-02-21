import { AuthConnector, AuthConnectorProps } from "./AuthConnector";
import { smtpRequest } from "../base/smtp";
import invariant from "tiny-invariant";

/**
 * @alpha
 */
export interface SmtpConnectorProps extends AuthConnectorProps {
  /**
   * The SMTP Host
   */
  host: string;
  /**
   * The SMTP port. Defaults to 587.
   */
  port?: number;
}

/**
 * @alpha
 */
export interface SendMailRequestProps {
  from: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text: string;
  html: string;
}

export type EmailAddress = {
  name: string;
  address: string;
};

export type SendMailResponse = {
  accepted: Array<string | EmailAddress>;
  pending: Array<string | EmailAddress>;
  rejected: Array<string | EmailAddress>;
  messageId: string;
  envelope: {
    from: string | false;
    /** includes an array of address objects */
    to: string[];
  };
  response: string;
};

/**
 * @alpha
 *
 * Smtp Connector
 *
 * @param props
 */
export abstract class SmtpConnector extends AuthConnector {
  host: string;
  port: number;

  protected constructor(props: SmtpConnectorProps) {
    const { host, port = 587, ...rest } = props;
    super(rest);
    this.host = host;
    this.port = port;
  }

  abstract getUsernameAndPassword(): { username: string; password: string };

  /**
   * Make a proxied smtp request
   */
  async sendMail(props: SendMailRequestProps): Promise<SendMailResponse> {
    const { from, to, cc, bcc, subject, text, html } = props;

    const { username, password } = this.getUsernameAndPassword();

    return await smtpRequest({
      host: this.host,
      port: this.port,
      secure: true,
      username,
      password,
      from,
      to,
      cc,
      bcc,
      subject,
      text,
      html,
    });
  }
}
