/**
 * WEBHOOK
 * workspace.created
 * WEBHOOK
 * workspace.deleted
 * WEBHOOK
 * workspace.reservation_checked_in
 * WEBHOOK
 * workspace.reservation_checked_out
 * WEBHOOK
 * workspace.reservation_created
 * WEBHOOK
 * workspace.reservation_deleted
 * WEBHOOK
 * workspace.reservation_update
 * WEBHOOK
 * workspace.updated
 * Zoomroom
 * WEBHOOK
 * zoomroom.alert
 * WEBHOOK
 * zoomroom.checked_in
 * WEBHOOK
 * zoomroom.checked_out
 * WEBHOOK
 * zoomroom.created
 * WEBHOOK
 * zoomroom.delayed_alert
 * WEBHOOK
 * zoomroom.deleted
 * WEBHOOK
 * zoomroom.digital_signage_app_ended
 * WEBHOOK
 * zoomroom.digital_signage_app_started
 * WEBHOOK
 * zoomroom.location_created
 * WEBHOOK
 * zoomroom.location_deleted
 * WEBHOOK
 * zoomroom.location_updated
 * WEBHOOK
 * zoomroom.sensor_data
 * WEBHOOK
 * zoomroom.thirdparty_meeting_attempted
 * WEBHOOK
 * zoomroom.updated
 */

export type WebhookZoomRoomsEvent =
  | "workspace.created"
  | "workspace.deleted"
  | "workspace.reservation_checked_in"
  | "workspace.reservation_checked_out"
  | "workspace.reservation_created"
  | "workspace.reservation_deleted"
  | "workspace.reservation_update"
  | "workspace.updated"
  | "zoomroom.alert"
  | "zoomroom.checked_in"
  | "zoomroom.checked_out"
  | "zoomroom.created"
  | "zoomroom.delayed_alert"
  | "zoomroom.deleted"
  | "zoomroom.digital_signage_app_ended"
  | "zoomroom.digital_signage_app_started"
  | "zoomroom.location_created"
  | "zoomroom.location_deleted"
  | "zoomroom.location_updated"
  | "zoomroom.sensor_data"
  | "zoomroom.thirdparty_meeting_attempted"
  | "zoomroom.updated";
