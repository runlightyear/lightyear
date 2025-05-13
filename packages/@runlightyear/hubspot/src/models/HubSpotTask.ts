// @ts-nocheck
// Will be reimplemented
import { HubSpotModel } from "./HubSpotModel";

export class TaskSynchronizer extends HubSpotModel {
  getNoun() {
    return "task";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      subject: "properties.hs_task_subject",
      content: "properties.hs_task_body",
      dueDate: "properties.hs_timestamp",
      status: "properties.hs_task_status",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      hs_task_subject: "subject",
      hs_task_body: "content",
      hs_timestamp: "dueDate",
      hs_task_status: "status",
    };
  }
}
