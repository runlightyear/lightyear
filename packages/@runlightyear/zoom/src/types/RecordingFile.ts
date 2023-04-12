export interface RecordingFile {
  /**
   * The time at which recording was deleted. Returned in the response only for trash query.
   */
  deletedTime: string;

  /**
   * The URL at which to download the the recording.
   */
  downloadUrl: string;

  /**
   * The file path to the On-Premise account recording.
   *
   * Note: This API only returns this field for Zoom On-Premise accounts. It does not return the download_url field.
   */
  filePath: string;

  /**
   * The recording file size.
   */
  fileSize: number;

  /**
   *   The recording file type. The value of this field could be one of the following:
   *
   *   MP4: Video file of the recording.
   *   M4A Audio-only file of the recording.
   *   TIMELINE: Timestamp file of the recording in JSON file format. To get a timeline file, the "Add a timestamp to the recording" setting must be enabled in the recording settings. The time will display in the host's timezone, set on their Zoom profile.
   *   TRANSCRIPT: Transcription file of the recording in VTT format.
   *   CHAT: A TXT file containing in-meeting chat messages that were sent during the meeting.
   *   CC: File containing closed captions of the recording in VTT file format.
   *   CSV: File containing polling data in csv format.
   *
   *   A recording file object with file type of either CC or TIMELINE does not have the following properties:
   *     id, status, file_size, recording_type, and play_url.
   *
   *   SUMMARY: Summary file of the recording in JSON file format.
   */
  fileType:
    | "MP4"
    | "M4A"
    | "TIMELINE"
    | "TRANSCRIPT"
    | "CHAT"
    | "CC"
    | "CSV"
    | "SUMMARY";

  /**
   * The file extension type of the recording file.
   */
  fileExtension: "MP4" | "M4A" | "TXT" | "VTT" | "CSV" | "JSON" | "JPG";

  /**
   * The recording file ID. Included in the response of general query.
   */
  id: string;

  /**
   * The meeting ID.
   */
  meetingId: string;

  /**
   * The URL using which a recording file can be played.
   */
  playUrl: string;

  /**
   * The recording end time. Response in general query.
   */
  recordingEnd: string;

  /**
   * The recording start time.
   */
  recordingStart: string;

  /**
   * The recording type.
   */
  recordingType:
    | "shared_screen_with_speaker_view(CC)"
    | "shared_screen_with_speaker_view"
    | "shared_screen_with_gallery_view"
    | "active_speaker"
    | "gallery_view"
    | "shared_screen"
    | "audio_only"
    | "audio_transcript"
    | "chat_file"
    | "poll"
    | "host_video"
    | "closed_caption"
    | "timeline"
    | "thumbnail"
    | "audio_interpretation"
    | "summary"
    | "summary_next_steps"
    | "summary_smart_chapters"
    | "sign_interpretation";

  /**
   * The recording status.
   */
  status: "completed";
}
