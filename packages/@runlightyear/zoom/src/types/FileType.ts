export type FileType =
  /**
   *  Video file of the recording.
   */
  | "MP4"
  /**
   * Audio-only file of the recording.
   */
  | "M4A"
  /**
   * Timestamp file of the recording in JSON file format. To get a timeline file, the "Add a timestamp to the recording" setting must be enabled in the recording settings. The time will display in the host's timezone, set on their Zoom profile.
   */
  | "TIMELINE"
  /**
   * Transcription file of the recording in VTT format.
   */
  | "TRANSCRIPT"
  /**
   * A TXT file containing in-meeting chat messages that were sent during the meeting.
   */
  | "CHAT"
  /**
   * File containing closed captions of the recording in VTT file format.
   */
  | "CC"
  /**
   * File containing polling data in csv format.
   */
  | "CSV"
  /**
   * Summary file of the recording in JSON file format.
   */
  | "SUMMARY";
