export type WebhookZoomEventsEvent =
  | "zoom_events.event_cancelled"
  | "zoom_events.event_published"
  | "zoom_events.event_updated"
  | "zoom_events.exhibitor_created"
  | "zoom_events.exhibitor_deleted"
  | "zoom_events.exhibitor_updated"
  | "zoom_events.session_created"
  | "zoom_events.session_deleted"
  | "zoom_events.session_ended"
  | "zoom_events.session_updated"
  | "zoom_events.speaker_created"
  | "zoom_events.speaker_deleted"
  | "zoom_events.speaker_updated"
  | "zoom_events.ticket_created"
  | "zoom_events.ticket_deleted"
  | "zoom_events.ticket_type_created"
  | "zoom_events.ticket_type_deleted"
  | "zoom_events.ticket_type_updated"
  | "zoom_events.ticket_updated";
