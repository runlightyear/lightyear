import { HttpProxyResponse } from "@runlightyear/lightyear";
import { SendGrid } from "../SendGrid";

/**
 * @alpha
 */
export interface SendProps {
  /**
   * An array of messages and their metadata. Each object within personalizations can be thought of as an envelope - it defines who should receive an individual message and how that message should be handled. See our Personalizations documentation for examples.
   */
  personalizations: Array<{
    /**
     * An array of recipients. Each object within this array may contain the recipient’s name, but must always contain the recipient’s email.
     */
    to: Array<{
      email: string;
      name?: string;
    }>;
    /**
     * An array of recipients who will receive a copy of your email. Each object within this array may contain the recipient’s name, but must always contain the recipient’s email.
     */
    cc?: Array<{
      email: string;
      name?: string;
    }>;
    /**
     * An array of recipients who will receive a blind carbon copy of your email. Each object within this array may contain the recipient’s name, but must always contain the recipient’s email.
     */
    bcc?: Array<{
      email: string;
      name?: string;
    }>;
    /**
     * A key/value store of data that you can use to add dynamic content to your emails.
     * See our Personalizations documentation for more information.
     */
    substitutions?: {
      [key: string]: string;
    };
    /**
     * Dynamic template data is available using Handlebars syntax in Dynamic Transactional Templates. This field should be used in combination with a Dynamic Transactional Template, which can be identified by a template_id starting with d-. This field is a collection of key/value pairs following the pattern "variable_name":"value to insert".
     */
    dynamicTemplateData?: {
      [key: string]: string;
    };
    /**
     * A key/value store of data that is specific to this personalization that you can use to add dynamic content to your emails.
     * See our Personalizations documentation for more information.
     * This may be overridden by custom_args set at the message level.
     * Total custom_args size may not exceed 10,000 bytes.
     */
    customArgs?: {
      [key: string]: string;
    };
    /**
     * A unix timestamp allowing you to specify when you want your email to be delivered.
     */
    sendAt?: number;
  }>;

  from: {
    /**
     * The 'From' email address used to deliver the message. This address should be a verified sender in your Twilio SendGrid account.
     */
    email: string;
    /**
     * A name or title associated with the email address.
     */
    name?: string;
  };

  replyTo?: {
    /**
     * The email address where any replies or bounces will be returned.
     */
    email: string;
    /**
     * A name or title associated with the replyTo email address.
     */
    name?: string;
  };

  /**
   * An array of recipients who will receive replies and/or bounces. Each object in this array must contain the recipient's email address. Each object in the array may optionally contain the recipient's name. You can either choose to use “replyTo” field or “replyToList” but not both.
   */
  reployToList?: Array<{
    /**
     * The email address where any replies or bounces will be returned.
     */
    email: string;
    /**
     * A name or title associated with the replyToList email address.
     */
    name?: string;
  }>;

  /**
   * The global or 'message level' subject of your email. This may be overridden by subject lines set in personalizations.
   *
   */
  subject: string;

  /**
   * An array where you can specify the content of your email. You can include multiple MIME types of content, but you must specify at least one MIME type. To include more than one MIME type, add another object to the array containing the type and value parameters.
   */
  content: Array<{
    /**
     * The MIME type of the content you are including in your email. For example, “text/plain” or “text/html”.
     */
    type: string;
    /**
     * The actual content of the specified MIME type that you are including in your email.
     */
    value: string;
  }>;

  /**
   * An array of objects where you can specify any attachments you want to include.
   */
  attachments?: Array<{
    /**
     * The Base64 encoded content of the attachment.
     */
    content: string;
    /**
     * The mime type of the content you are attaching. For example, “text/plain” or “text/html”.
     */
    type: string;
    /**
     * The attachment's filename.
     */
    filename: string;
    /**
     * The attachment's content-disposition, specifying how you would like the attachment to be displayed. For example, “inline” results in the attached file are displayed automatically within the message while “attachment” results in the attached file require some action to be taken before it is displayed, such as opening or downloading the file.
     *
     * default: attachment
     * Allowed Values: inline, attachment
     */
    disposition?: string;
    /**
     * The attachment's content id. This is used when the disposition is set to "inline" and the attachment is an image, allowing the file to be displayed within the body of your email.
     */
    contentId?: string;
  }>;
  /**
   * An email template ID. A template that contains a subject and content — either text or html — will override any subject and content values specified at the personalizations or message level.
   */
  templateId?: string;
  /**
   * An object containing key/value pairs of header names and the value to substitute for them. The key/value pairs must be strings. You must ensure these are properly encoded if they contain unicode characters. These headers cannot be one of the reserved headers.
   */
  headers?: {
    [key: string]: string;
  };
  /**
   * An array of category names for this message. Each category name may not exceed 255 characters.
   * maxItems: 10
   * uniqueItems: True
   */
  categories?: string[];
  /**
   * Values that are specific to the entire send that will be carried along with the email and its activity data. Key/value pairs must be strings. Substitutions will not be made on custom arguments, so any string that is entered into this parameter will be assumed to be the custom argument that you would like to be used. This parameter is overridden by custom_args set at the personalizations level. Total custom_args size may not exceed 10,000 bytes.
   */
  customArgs?: string;
  /**
   * A unix timestamp allowing you to specify when you want your email to be delivered. This may be overridden by the send_at parameter set at the personalizations level. Delivery cannot be scheduled more than 72 hours in advance. If you have the flexibility, it's better to schedule mail for off-peak times. Most emails are scheduled and sent at the top of the hour or half hour. Scheduling email to avoid peak times — for example, scheduling at 10:53 — can result in lower deferral rates due to the reduced traffic during off-peak times.
   */
  sendAt?: number;
  /**
   * An ID representing a batch of emails to be sent at the same time. Including a batch_id in your request allows you include this email in that batch. It also enables you to cancel or pause the delivery of that batch. For more information, see the Cancel Scheduled Sends API.
   */
  batchId?: string;
  /**
   * An object allowing you to specify how to handle unsubscribes.
   */
  asm?: {
    /**
     * The unsubscribe group to associate with this email.
     */
    groupId: number;
    /**
     * An array containing the unsubscribe groups that you would like to be displayed on the unsubscribe preferences page.
     * maxItems: 25
     */
    groupsToDisplay?: number[];
  };
  /**
   * The IP Pool that you would like to send this email from.
   */
  ipPoolName?: string;
  /**
   * A collection of different mail settings that you can use to specify how you would like this email to be handled.
   */
  mailSettings?: {
    /**
     * Allows you to bypass all unsubscribe groups and suppressions to ensure that the email is delivered to every single recipient. This should only be used in emergencies when it is absolutely necessary that every recipient receives your email. This filter cannot be combined with any other bypass filters.
     */
    bypassListManagement?: {
      enable?: boolean;
    };
    /**
     * Allows you to bypass the spam report list to ensure that the email is delivered to recipients. Bounce and unsubscribe lists will still be checked; addresses on these other lists will not receive the message. This filter cannot be combined with the bypass_list_management filter.
     */
    bypassSpamManagement?: {
      enable?: boolean;
    };
    /**
     * Allows you to bypass the bounce list to ensure that the email is delivered to recipients. Spam report and unsubscribe lists will still be checked; addresses on these other lists will not receive the message. This filter cannot be combined with the bypass_list_management filter.
     */
    bypassBounceManagement?: {
      enable?: boolean;
    };
    /**
     * Allows you to bypass the global unsubscribe list to ensure that the email is delivered to recipients. Bounce and spam report lists will still be checked; addresses on these other lists will not receive the message. This filter applies only to global unsubscribes and will not bypass group unsubscribes. This filter cannot be combined with the bypass_list_management filter.
     */
    bypassUnsubscribeManagement?: {
      enable?: boolean;
    };
    /**
     * The default footer that you would like included on every email.
     */
    footer?: {
      enable?: boolean;
      /**
       * The plain text content of your footer.
       */
      text?: string;
      /**
       * The HTML content of your footer.
       */
      html?: string;
    };
    /**
     * Sandbox Mode allows you to send a test email to ensure that your request body is valid and formatted correctly.
     */
    sandboxMode?: {
      enable?: boolean;
    };
  };
  /**
   * Settings to determine how you would like to track the metrics of how your recipients interact with your email.
   */
  trackingSettings?: {
    /**
     * Allows you to track whether a recipient clicked a link in your email.
     */
    clickTracking?: {
      /**
       * Indicates if this setting is enabled.
       */
      enable?: boolean;
      /**
       * Indicates if this setting should be included in the text/plain portion of your email.
       */
      enableText?: boolean;
    };
    /**
     * Allows you to track if the email was opened by including a single pixel image in the body of the content. When the pixel is loaded, Twilio SendGrid can log that the email was opened.
     */
    openTracking?: {
      enable?: boolean;
      /**
       * Allows you to specify a substitution tag that you can insert in the body of your email at a location that you desire. This tag will be replaced by the open tracking pixel.
       */
      substitutionTag?: string;
    };
    /**
     * Allows you to insert a subscription management link at the bottom of the text and HTML bodies of your email. If you would like to specify the location of the link within your email, you may use the substitution_tag.
     */
    subscriptionTracking?: {
      enable?: boolean;
      /**
       * Text to be appended to the email, with the subscription tracking link. You may control where the link is by using the tag <% %>.
       */
      text?: string;
      /**
       * HTML to be appended to the email, with the subscription tracking link. You may control where the link is by using the tag <% %>.
       */
      html?: string;
      /**
       * A tag that will be replaced with the unsubscribe URL. for example: [unsubscribe_url]. If this parameter is used, it will override both the text and html parameters. The URL of the link will be placed at the substitution tag’s location, with no additional formatting.
       */
      substitutionTag?: string;
    };
  };

  /**
   * Allows you to enable tracking provided by Google Analytics.
   */
  ganalytics?: {
    /**
     * Indicates if this setting is enabled
     */
    enable?: boolean;
    /**
     * Name of the referrer source. (e.g. Google, SomeDomain.com, or Marketing Email)
     */
    utmSource?: string;
    /**
     * Name of the marketing medium. (e.g. Email)
     */
    utmMedium?: string;
    /**
     *  Used to identify any paid keywords.
     */
    utmTerm?: string;
    /**
     * Used to differentiate your campaign from advertisements.
     */
    utmContent?: string;
    /**
     * The name of the campaign.
     */
    utmCampaign?: string;
  };
}

/**
 * @alpha
 */
export interface SendResponse extends HttpProxyResponse {
  data: undefined;
}

export const send =
  (self: SendGrid) =>
  async (props: SendProps): Promise<SendResponse> => {
    const {
      personalizations,
      from,
      replyTo,
      reployToList,
      subject,
      content,
      attachments,
      templateId,
      headers,
      categories,
      customArgs,
      sendAt,
      batchId,
      asm,
      mailSettings,
      trackingSettings,
      ganalytics,
    } = props;

    const response = await self.post({
      url: "/mail/send",
      data: {
        personalizations: personalizations.map((personalization) => ({
          to: personalization.to.map((to) => ({
            email: to.email,
            name: to.name,
          })),
          cc: personalization.cc?.map((cc) => ({
            email: cc.email,
            name: cc.name,
          })),
          bcc: personalization.bcc?.map((bcc) => ({
            email: bcc.email,
            name: bcc.name,
          })),
          substitutions: personalization.substitutions,
          dynamic_template_data: personalization.dynamicTemplateData,
          custom_args: personalization.customArgs,
          send_at: personalization.sendAt,
        })),
        from: {
          email: from.email,
          name: from.name,
        },
        reply_to: replyTo
          ? {
              email: replyTo.email,
              name: replyTo.name,
            }
          : undefined,
        reply_to_list: reployToList
          ? reployToList.map((replyToList) => ({
              email: replyToList.email,
              name: replyToList.name,
            }))
          : undefined,
        subject,
        content: content.map((content) => ({
          type: content.type,
          value: content.value,
        })),
        attachments: attachments?.map((attachment) => ({
          content: attachment.content,
          type: attachment.type,
          filename: attachment.filename,
          disposition: attachment.disposition,
          content_id: attachment.contentId,
        })),
        template_id: templateId,
        headers,
        categories,
        custom_args: customArgs,
        send_at: sendAt,
        batch_id: batchId,
        asm: asm
          ? {
              group_id: asm.groupId,
              groups_to_display: asm.groupsToDisplay,
            }
          : undefined,
        ip_pool_name: props.ipPoolName,
        mail_settings: mailSettings
          ? {
              bypass_list_management: mailSettings.bypassListManagement
                ? {
                    enable: mailSettings.bypassListManagement.enable,
                  }
                : undefined,
              bypass_spam_management: mailSettings.bypassSpamManagement
                ? {
                    enable: mailSettings.bypassSpamManagement.enable,
                  }
                : undefined,
              bypass_bounce_management: mailSettings.bypassBounceManagement
                ? {
                    enable: mailSettings.bypassBounceManagement.enable,
                  }
                : undefined,
              bypass_unsubscribe_management:
                mailSettings.bypassUnsubscribeManagement
                  ? {
                      enable: mailSettings.bypassUnsubscribeManagement.enable,
                    }
                  : undefined,
              footer: mailSettings.footer
                ? {
                    enable: mailSettings.footer.enable,
                    text: mailSettings.footer.text,
                    html: mailSettings.footer.html,
                  }
                : undefined,
              sandbox_mode: mailSettings.sandboxMode
                ? {
                    enable: mailSettings.sandboxMode.enable,
                  }
                : undefined,
            }
          : undefined,
        tracking_settings: trackingSettings
          ? {
              click_tracking: trackingSettings.clickTracking
                ? {
                    enable: trackingSettings.clickTracking.enable,
                    enable_text: trackingSettings.clickTracking.enableText,
                  }
                : undefined,
              open_tracking: trackingSettings.openTracking
                ? {
                    enable: trackingSettings.openTracking.enable,
                    substitution_tag:
                      trackingSettings.openTracking.substitutionTag,
                  }
                : undefined,
              subscription_tracking: trackingSettings.subscriptionTracking
                ? {
                    enable: trackingSettings.subscriptionTracking.enable,
                    text: trackingSettings.subscriptionTracking.text,
                    html: trackingSettings.subscriptionTracking.html,
                    substitution_tag:
                      trackingSettings.subscriptionTracking.substitutionTag,
                  }
                : undefined,
            }
          : undefined,
        ganalytics: ganalytics
          ? {
              enable: ganalytics.enable,
              utm_source: ganalytics.utmSource,
              utm_medium: ganalytics.utmMedium,
              utm_term: ganalytics.utmTerm,
              utm_content: ganalytics.utmContent,
              utm_campaign: ganalytics.utmCampaign,
            }
          : undefined,
      },
    });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: undefined,
    };
  };
