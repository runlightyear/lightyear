export type WebhookNotification =
  | WebhookNotificationFailure
  | WebhookNotificationSuccess;

export interface WebhookNotificationFailure {
  success: false;
  /**
   * Object containing the error message.
   */
  error: {
    message: string;
  };
  /**
   * The time of the most recent notification.
   */
  completionTimestamp: string;
  /**
   * The roundtrip duration of the network call.
   */
  durationMs: number;
  /**
   * The number of times the notification was retried. (0 = first try)
   */
  retryNumber: number;
  /**
   * Whether or not Airtable will attempt to deliver a notification again.
   */
  willBeRetried: boolean;
}

export interface WebhookNotificationSuccess {
  success: true;
  /**
   * The time of the most recent notification.
   */
  completionTimestamp: string;
  /**
   * The roundtrip duration of the network call.
   */
  durationMs: number;
  /**
   * The number of times the notification was retried. (0 = first try)
   */
  retryNumber: number;
}
