import { Postmark } from "../Postmark";
import { HttpProxyResponse } from "@runlightyear/lightyear";

export interface SendSingleEmailProps {
  /**
   * The sender email address. Must have a registered and confirmed Sender Signature.
   *
   * To include a name, use the format "Full Name <sender@domain.com>" for the address.
   */
  from: string;

  /**
   * Recipient email address. Multiple addresses are comma separated. Max 50.
   */
  to: string;

  /**
   * Cc recipient email address. Multiple addresses are comma separated. Max 50.
   */
  cc?: string;
  /**
   * Bcc recipient email address. Multiple addresses are comma separated. Max 50.
   */
  bcc?: string;

  /**
   * Email subject
   */
  subject?: string;

  /**
   * Email tag that allows you to categorize outgoing emails and get detailed statistics.
   */
  tag?: string;

  /**
   * If no textBody specified HTML email message
   */
  htmlBody: string;

  /**
   * If no htmlBody specified Plain text email message
   */
  textBody: string;

  /**
   * Reply To override email address. Defaults to the Reply To set in the sender signature. Multiple addresses are comma separated.
   */
  replyTo?: string;

  /**
   * List of custom headers to include.
   */
  headers?: Array<{ name: string; value: string }>;

  /**
   * Activate open tracking for this email.
   */
  trackOpens?: boolean;

  /**
   * Activate link tracking for links in the HTML or Text bodies of this email. Possible options: None HtmlAndText HtmlOnly TextOnly
   */
  trackLinks?: "None" | "HtmlAndText" | "HtmlOnly" | "TextOnly";

  /**
   * Custom metadata key/value pairs.
   */
  metadata: {
    [name: string]: string;
  };

  /**
   * List of attachments
   */
  attachments: Array<{
    name: string;
    content: string;
    contentType: string;
  }>;

  /**
   * Set message stream ID that's used for sending. If not provided, message will default to the "outbound" transactional stream.
   */
  messageStream: string;
}

export interface SendSingleEmailResponse extends HttpProxyResponse {
  data: {
    /**
     * Recipient email address
     */
    to: string;

    /**
     * Timestamp
     */
    submittedAt: string;

    /**
     * ID of message
     */
    messageId: string;

    /**
     * API Error Codes
     */
    errorCode: number;

    /**
     * Response message
     */
    message: string;
  };
}

export const sendSingleEmail =
  (self: Postmark) =>
  async (props: SendSingleEmailProps): Promise<SendSingleEmailResponse> => {
    const {
      from,
      to,
      cc,
      bcc,
      subject,
      tag,
      htmlBody,
      textBody,
      replyTo,
      headers,
      trackOpens,
      trackLinks,
      metadata,
      attachments,
      messageStream,
    } = props;

    const response = await self.post({
      url: "/email",
      data: {
        From: from,
        To: to,
        Cc: cc,
        Bcc: bcc,
        Subject: subject,
        Tag: tag,
        HtmlBody: htmlBody,
        TextBody: textBody,
        ReplyTo: replyTo,
        Headers: headers,
        TrackOpens: trackOpens,
        TrackLinks: trackLinks,
        Metadata: metadata,
        Attachments: attachments,
        MessageStream: messageStream,
      },
    });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: {
        to: response.data.To,
        submittedAt: response.data.SubmittedAt,
        messageId: response.data.MessageID,
        errorCode: response.data.ErrorCode,
        message: response.data.Message,
      },
    };
  };
