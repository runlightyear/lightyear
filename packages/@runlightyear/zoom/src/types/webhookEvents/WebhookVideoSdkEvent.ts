export type WebhookVideoSdkEvent =
  | "session.alert"
  | "session.ended"
  | "session.live_streaming_started"
  | "session.live_streaming_stopped"
  | "session.recording_completed"
  | "session.recording_deleted"
  | "session.recording_paused"
  | "session.recording_recovered"
  | "session.recording_resumed"
  | "session.recording_started"
  | "session.recording_stopped"
  | "session.recording_transcript_completed"
  | "session.recording_transcript_failed"
  | "session.recording_trashed"
  | "session.sharing_ended"
  | "session.sharing_started"
  | "session.started"
  | "session.user_joined"
  | "session.user_left"
  | "session.user_phone_callout_accepted"
  | "session.user_phone_callout_missed"
  | "session.user_phone_callout_rejected"
  | "session.user_phone_callout_ringing"
  | "session.user_room_system_callout_accepted"
  | "session.user_room_system_callout_failed"
  | "session.user_room_system_callout_missed"
  | "session.user_room_system_callout_rejected"
  | "session.user_room_system_callout_ringing";
