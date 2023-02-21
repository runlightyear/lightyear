import baseRequest from "./baseRequest";

/**
 * @alpha
 */
export interface SmtpProxyRequestProps {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
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

/**
 * @alpha
 */
export type SmtpProxyResponse = {
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
 * @param props
 */
export async function smtpRequest(
  props: SmtpProxyRequestProps
): Promise<SmtpProxyResponse> {
  console.debug("httpRequest with props", JSON.stringify(props, null, 2));

  const response = await baseRequest({
    uri: "/api/v1/smtp-request",
    data: props,
  });

  console.debug(`response.status`, response.status);
  console.debug(`response.statusText`, response.statusText);
  const proxyResponse = (await response.json()) as SmtpProxyResponse;

  console.debug("proxyResponse", proxyResponse);

  return proxyResponse;
}
