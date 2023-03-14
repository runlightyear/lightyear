import { WebhookDeliveryData } from "@runlightyear/lightyear";
import commonPayload, { CommonPayload } from "./commonPayload";
import { Repository } from "../../types/Repository";
import { User } from "../../types/User";

export interface RepositoryArchivedPayload extends CommonPayload {
  action: "archived";
  repository: Repository;
}

export interface RepositoryCreatedPayload extends CommonPayload {
  action: "created";
  repository: Repository;
}

export interface RepositoryDeletedPayload extends CommonPayload {
  action: "deleted";
  repository: Repository;
}

export interface RepositoryEditedPayload extends CommonPayload {
  action: "edited";
  changes: {
    default_branch: {
      from: string;
    };
    description: {
      from: string | null;
    };
    homepage: {
      from: string | null;
    };
    topics: {
      from: string[] | null;
    };
  };
  repository: Repository;
}

export interface RepositoryPrivatizedPayload extends CommonPayload {
  action: "privatized";
  repository: Repository;
}

export interface RepositoryPublicizedPayload extends CommonPayload {
  action: "publicized";
  repository: Repository;
}

export interface RepositoryRenamedPayload extends CommonPayload {
  action: "renamed";
  changes: {
    repository: {
      name: {
        from: string;
      };
    };
  };
  repository: Repository;
}

export interface RepositoryTransferredPayload extends CommonPayload {
  action: "transferred";
  changes: {
    owner: {
      from: {
        organization: {
          avatarUrl: string;
          description: string | null;
          eventsUrl: string;
          hooksUrl: string;
          htmlUrl?: string;
          id: number;
          issuesUrl: string;
          login: string;
          membersUrl: string;
          nodeId: string;
          publicMembersUrl: string;
          reposUrl: string;
          url: string;
        };
        user: User | null;
      };
      name: {
        from: string;
      };
    };
  };
  repository: Repository;
}

export interface RepositoryUnarchivedPayload extends CommonPayload {
  action: "unarchived";
  repository: Repository;
}

/**
 * Documentation: https://docs.github.com/webhooks-and-events/webhooks/webhook-events-and-payloads#repository
 */
export type RepositoryPayload =
  | RepositoryArchivedPayload
  | RepositoryCreatedPayload
  | RepositoryDeletedPayload
  | RepositoryEditedPayload
  | RepositoryPrivatizedPayload
  | RepositoryPublicizedPayload
  | RepositoryRenamedPayload
  | RepositoryTransferredPayload
  | RepositoryUnarchivedPayload;

export function repositoryPayload(
  data: WebhookDeliveryData
): RepositoryPayload {
  const payload = commonPayload("repository", data) as unknown;
  return payload as RepositoryPayload;
}
