import { HubSpotModel } from "./HubSpotModel";

export class OpportunityLineItemSynchronizer extends HubSpotModel {
  getNoun() {
    return "line_item";
  }

  getAssociationKeys(): any {
    return [...super.getAssociationKeys(), "deals"];
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      name: "properties.name",
      quantity: "properties.quantity",
      price: "properties.price",
      productId: "properties.hs_product_id",
      opportunityId: (source: any) => {
        if (
          "associations" in source &&
          "deals" in source.associations &&
          "results" in source.associations.deals &&
          source.associations.deals.results.length > 0
        ) {
          return source.associations.deals.results[0].id;
        }

        return undefined;
      },
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      name: "name",
      quantity: "quantity",
      price: "price",
      hs_product_id: "productId",
      deal_id: "opportunityId",
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
