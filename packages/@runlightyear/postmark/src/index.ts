/**
 * @alpha
 *
 * @packageDocumentation
 */

/** Postmark **/
import { Postmark } from "./Postmark";
import type { PostmarkProps } from "./Postmark";

/** Send Single Email **/
import type {
  SendSingleEmailProps,
  SendSingleEmailResponse,
} from "./sending/sendSingleEmail";

export { Postmark };
export type { PostmarkProps, SendSingleEmailProps, SendSingleEmailResponse };
