import { HubSpotModelSynchronizer } from "./HubSpotModelSynchronizer";

export class CallSynchronizer extends HubSpotModelSynchronizer {
  getNoun() {
    return "call";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      subject: "properties.hs_call_title",
      content: "properties.hs_call_body",
      timestamp: "properties.hs_timestamp",
      duration: "properties.hs_call_duration",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      hs_call_title: "subject",
      hs_call_body: "content",
      hs_timestamp: "timestamp",
      hs_call_duration: "duration",
    };
  }
}
