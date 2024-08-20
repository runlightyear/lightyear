import { HubSpotModelSynchronizer } from "./HubSpotModelSynchronizer";

export class NoteSynchronizer extends HubSpotModelSynchronizer {
  getNoun() {
    return "note";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      content: "properties.hs_note_body",
      timestamp: "properties.hs_timestamp",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      hs_note_body: "content",
      hs_timestamp: "timestamp",
    };
  }
}
