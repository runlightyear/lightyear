import { HubSpotModelSynchronizer } from "./HubSpotModelSynchronizer";

export class OpportunitySynchronizer extends HubSpotModelSynchronizer {
  getNoun() {
    return "deal";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      name: "properties.dealname",
      amount: "properties.amount",
      closeDate: "properties.closedate",
      stage: "properties.dealstage",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      dealname: "name",
      amount: "amount",
      closedate: "closeDate",
      dealstage: "stage",
    };
  }
}
