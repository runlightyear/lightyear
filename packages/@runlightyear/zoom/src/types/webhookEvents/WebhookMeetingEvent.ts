export type WebhookMeetingEvent =
  | "account.created"
  | "account.disassociated"
  | "account.lock_settings_updated"
  | "account.settings_updated"
  | "account.updated"
  | "account.vanity_url_approved"
  | "account.vanity_url_rejected"
  | "group.admin_added"
  | "group.admin_deleted"
  | "group.created"
  | "group.deleted"
  | "group.lock_settings_updated"
  | "group.member_added"
  | "group.member_deleted"
  | "group.settings_updated"
  | "group.updated"
  | "information_barriers.policy_created"
  | "information_barriers.policy_deleted"
  | "information_barriers.policy_updated"
  | "meeting.alert"
  | "meeting.breakout_room_sharing_ended"
  | "meeting.breakout_room_sharing_started"
  | "meeting.chat_message_file_sent"
  | "meeting.chat_message_sent"
  | "meeting.created"
  | "meeting.deleted"
  | "meeting.device_tested"
  | "meeting.ended"
  | "meeting.live_streaming_started"
  | "meeting.live_streaming_stopped"
  | "meeting.participant_admitted"
  | "meeting.participant_feedback"
  | "meeting.participant_jbh_joined"
  | "meeting.participant_jbh_waiting"
  | "meeting.participant_jbh_waiting_left"
  | "meeting.participant_joined"
  | "meeting.participant_joined_breakout_room"
  | "meeting.participant_joined_waiting_room"
  | "meeting.participant_left"
  | "meeting.participant_left_breakout_room"
  | "meeting.participant_left_waiting_room"
  | "meeting.participant_phone_callout_accepted"
  | "meeting.participant_phone_callout_missed"
  | "meeting.participant_phone_callout_rejected"
  | "meeting.participant_phone_callout_ringing"
  | "meeting.participant_put_in_waiting_room"
  | "meeting.participant_role_changed"
  | "meeting.participant_room_system_callout_accepted"
  | "meeting.participant_room_system_callout_failed"
  | "meeting.participant_room_system_callout_missed"
  | "meeting.participant_room_system_callout_rejected"
  | "meeting.participant_room_system_callout_ringing"
  | "meeting.permanently_deleted"
  | "meeting.recovered"
  | "meeting.registration_approved"
  | "meeting.registration_cancelled"
  | "meeting.registration_created"
  | "meeting.registration_denied"
  | "meeting.risk_alert"
  | "meeting.sharing_ended"
  | "meeting.sharing_started"
  | "meeting.started"
  | "meeting.summary_completed"
  | "meeting.updated"
  | "recording.archive_files_completed"
  | "recording.batch_deleted"
  | "recording.batch_recovered"
  | "recording.batch_trashed"
  | "recording.cloud_storage_usage_updated"
  | "recording.completed"
  | "recording.deleted"
  | "recording.paused"
  | "recording.recovered"
  | "recording.registration_approved"
  | "recording.registration_created"
  | "recording.registration_denied"
  | "recording.renamed"
  | "recording.resumed"
  | "recording.started"
  | "recording.stopped"
  | "recording.transcript_completed"
  | "recording.trashed"
  | "user.activated"
  | "user.created"
  | "user.deactivated"
  | "user.deleted"
  | "user.disassociated"
  | "user.invitation_accepted"
  | "user.personal_notes_updated"
  | "user.presence_status_updated"
  | "user.settings_updated"
  | "user.signed_in"
  | "user.signed_out"
  | "user.tsp_created"
  | "user.tsp_deleted"
  | "user.tsp_updated"
  | "user.updated"
  | "webinar.alert"
  | "webinar.chat_message_file_sent"
  | "webinar.chat_message_sent"
  | "webinar.created"
  | "webinar.deleted"
  | "webinar.ended"
  | "webinar.participant_feedback"
  | "webinar.participant_joined"
  | "webinar.participant_left"
  | "webinar.participant_role_changed"
  | "webinar.permanently_deleted"
  | "webinar.recovered"
  | "webinar.registration_approved"
  | "webinar.registration_cancelled"
  | "webinar.registration_created"
  | "webinar.registration_denied"
  | "webinar.sharing_ended"
  | "webinar.sharing_started"
  | "webinar.started"
  | "webinar.updated";
