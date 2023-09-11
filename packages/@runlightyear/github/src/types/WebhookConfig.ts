export type WebhookConfig = {
  /** The URL to which the payloads will be delivered. */
  url: string;
  /** The media type used to serialize the payloads. Supported values
   * include json and form. The default is form.
   *
   * Note: we currently force this to be json for this connector.
   */
  contentType?: "json";
  /** If provided, the secret will be used as the key to generate the HMAC hex digest value for delivery signature headers.
   */
  secret?: string;
  /** Determines whether the SSL certificate of the host for url will be verified when delivering payloads. Supported values include 0 (verification is performed) and 1 (verification is not performed). The default is 0. We strongly recommend not setting this to 1 as you are subject to man-in-the-middle and other attacks.
   */
  insecureSSL?: string | number;
  token?: string;
  digest?: string;
};

export default WebhookConfig;
