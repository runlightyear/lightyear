import { User } from "./User";

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#status
 */
export type Commit = {
  author: User | null;
  commentsUrl: string;
  commit: {
    author: User;
    commentCount: number;
    committer: User;
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    verification: {
      payload: string | null;

      reason:
        | "expired_key"
        | "not_signing_key"
        | "gpgverify_error"
        | "gpgverify_unavailable"
        | "unsigned"
        | "unknown_signature_type"
        | "no_user"
        | "unverified_email"
        | "bad_email"
        | "unknown_key"
        | "malformed_signature"
        | "invalid"
        | "valid"
        | "bad_cert"
        | "ocsp_pending";

      signature: string | null;

      verified: boolean;
    };
  };
  committer: User | null;
  htmlUrl: string;
  nodeId: string;
  parents: Array<{
    htmlUrl: string;
    sha: string;
    url: string;
  }>;
  sha: string;
  url: string;
};
