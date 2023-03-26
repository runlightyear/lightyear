import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { Member } from "../../types/Member";

export interface MemberAddedPayload extends CommonPayload {
  action: "added";
  changes: {
    permission?: {
      to: "write" | "admin" | "read";
    };
  };
  member: Member;
}

export interface MemberEditedPayload extends CommonPayload {
  action: "edited";
  changes: {
    oldPermission: {
      from: string;
    };
    permission: {
      from: string | null;
      to: string | null;
    };
  };
  member: Member;
}

export interface MemberRemovedPayload extends CommonPayload {
  action: "removed";
  member: Member;
}

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#member
 */
export type MemberPayload =
  | MemberAddedPayload
  | MemberEditedPayload
  | MemberRemovedPayload;

export function asMemberPayload(data: WebhookDeliveryData) {
  return commonPayload<MemberPayload>("member", data);
}
