/**
 * Meeting
 * WEBHOOK
 * meeting.participant_data
 * WEBHOOK
 * meeting.participant_data_summary
 * WEBHOOK
 * meeting.participant_qos
 * WEBHOOK
 * meeting.participant_qos_summary
 * Phone
 * WEBHOOK
 * phone.call_qos
 * Session
 * WEBHOOK
 * session.user_qos_summary
 * Webinar
 * WEBHOOK
 * webinar.participant_data
 * WEBHOOK
 * webinar.participant_data_summary
 * WEBHOOK
 * webinar.participant_qos
 * WEBHOOK
 * webinar.participant_qos_summary
 * Docs
 * /
 * API
 * /
 * Zoom API Events - QSS
 * Zoom API Events - QSS 1.0.0
 */

export type WebhookQssEvent =
  | "meeting.participant_data"
  | "meeting.participant_data_summary"
  | "meeting.participant_qos"
  | "meeting.participant_qos_summary"
  | "phone.call_qos"
  | "session.user_qos_summary"
  | "webinar.participant_data"
  | "webinar.participant_data_summary"
  | "webinar.participant_qos"
  | "webinar.participant_qos_summary";
