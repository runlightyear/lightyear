import { User } from "./User";

export type WebhookAction =
  | WebhookClientAction
  | WebhookPublicApiAction
  | WebhookFormSubmissionAction
  | WebhookAutomationAction
  | WebhookSystemAction
  | WebhookSyncAction
  | WebhookAnonymousUserAction;

export interface WebhookClientAction {
  source: "client";
  sourceMetadata: {
    user: User;
  };
}

export interface WebhookPublicApiAction {
  source: "publicApi";
  sourceMetadata: {
    user: User;
  };
}

export interface WebhookFormSubmissionAction {
  source: "formSubmission";
  sourceMetadata: {
    viewId: string;
  };
}

export interface WebhookAutomationAction {
  source: "automation";
  sourceMetadata: {
    automationId: string;
  };
}

export interface WebhookSystemAction {
  source: "system";
}

export interface WebhookSyncAction {
  source: "sync";
}

export interface WebhookAnonymousUserAction {
  source: "anonymousUser";
}
