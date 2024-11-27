import { HubSpotModelSynchronizer } from "./HubSpotModelSynchronizer";

export class OpportunitySynchronizer extends HubSpotModelSynchronizer {
  getNoun() {
    return "deal";
  }

  getAssociationKeys(): any {
    return [...super.getAssociationKeys(), "companies"];
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      name: "properties.dealname",
      amount: "properties.amount",
      closeDate: "properties.closedate",
      stage: "properties.dealstage",
      accountId: (source: any) => {
        if (
          "associations" in source &&
          "companies" in source.associations &&
          "results" in source.associations.companies &&
          source.associations.companies.results.length > 0
        ) {
          const primaryAssociation = source.associations.companies.results.find(
            (result: any) => result.type === "deal_to_company"
          );

          if (primaryAssociation) {
            return primaryAssociation.id;
          }
        }

        return null;
      },
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

  async list(props: {
    syncType: "FULL" | "INCREMENTAL";
    lastUpdatedAt?: string;
    cursor?: string;
  }): Promise<{ cursor: any; objects: any[] }> {
    const superList = await super.list(props);

    // associations aren't returned in incremental syncs, so we have to do gets for each object
    if (props.syncType === "INCREMENTAL") {
      const newObjects = [];
      for (const object of superList.objects) {
        const newObject = await this.get(object.id);
        newObjects.push(newObject);
      }
      return { ...superList, objects: newObjects };
    }

    return superList;
  }
}
