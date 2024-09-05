import { HubSpotModelSynchronizer } from "./HubSpotModelSynchronizer";

export class MeetingSynchronizer extends HubSpotModelSynchronizer {
  getNoun() {
    return "meeting";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      subject: "properties.hs_meeting_title",
      content: "properties.hs_meeting_body",
      startTime: "properties.hs_meeting_start_time",
      endTime: "properties.hs_meeting_end_time",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      hs_meeting_title: "subject",
      hs_meeting_body: "content",
      hs_meeting_start_time: "startTime",
      hs_meeting_end_time: "endTime",
    };
  }
}
