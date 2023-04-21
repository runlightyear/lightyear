import {
  defineAction,
  RunFuncProps,
  setVariable,
  SKIPPED,
} from "@runlightyear/lightyear";
import { Zoom } from "../Zoom";
import { RecordingMeeting } from "../types/RecordingMeeting";
import { AppName } from "@runlightyear/lightyear/src/base/action";
import { RecordingStatus } from "../types/RecordingStatus";
import { FileType } from "../types/FileType";

export interface DefinePollRecordingsActionRunFuncProps extends RunFuncProps {
  data: Array<RecordingMeeting>;
}

export interface DefinePollRecordingsActionProps {
  name: string;
  title: string;
  /**
   * How often to run the action, in minutes.
   */
  pollingFrequency: number;

  /**
   * Only return when this file type is present
   *
   * Default: "MP4"
   */
  fileType?: FileType;

  /**
   * Only return when this status is set
   *
   * Default: "completed"
   */
  status?: RecordingStatus;
  customAppName?: string;
  authName?: string;
  apps?: Array<AppName>;
  customApps?: Array<string>;
  variables?: Array<string>;
  secrets?: Array<string>;
  run: (props: DefinePollRecordingsActionRunFuncProps) => void;
}

export const definePollRecordingsAction = (
  props: DefinePollRecordingsActionProps
) => {
  const {
    name,
    title,
    pollingFrequency,
    fileType = "MP4",
    status = "completed",
    customAppName,
    authName = "zoom",
    apps = [],
    customApps = [],
    variables = [],
    secrets = [],
    run,
  } = props;

  const combinedApps: AppName[] = customAppName ? apps : ["zoom", ...apps];
  const combinedCustomApps = customAppName
    ? [customAppName, ...customApps]
    : customApps;

  console.warn("In definePollRecordingsAction");

  return defineAction({
    name,
    title,
    apps: combinedApps,
    customApps: combinedCustomApps,
    variables: [...variables, "recordings"],
    secrets,
    trigger: {
      pollingFrequency: pollingFrequency,
    },
    run: async (runProps) => {
      const { auths, variables } = runProps;

      const previousRecordings = variables.recordings
        ? JSON.parse(variables.recordings)
        : [];

      const zoom = new Zoom({ auth: auths[authName] });

      const response = await zoom.listRecordings();

      const recordings = response.data.meetings;

      console.debug("recordings", JSON.stringify(recordings, null, 2));

      const newRecordings = recordings.filter((recording) => {
        if (previousRecordings.includes(recording.id)) {
          return false;
        }

        const recordingFile = recording.recordingFiles.find(
          (file) => file.fileType === fileType
        );

        return recordingFile && recordingFile.status === status;
      });

      console.debug("newRecordings", JSON.stringify(newRecordings, null, 2));

      if (newRecordings.length > 0) {
        console.info(`Found ${newRecordings.length} new recording(s)`);

        await run({ ...runProps, data: newRecordings });

        const allRecordings = [
          ...previousRecordings,
          ...newRecordings.map((recording) => recording.id),
        ];

        await setVariable("recordings", JSON.stringify(allRecordings));
      } else {
        console.info("Found no new recordings, skipping");
        throw SKIPPED;
      }
    },
  });
};
