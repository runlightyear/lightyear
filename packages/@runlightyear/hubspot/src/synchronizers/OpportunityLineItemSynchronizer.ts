import { HubSpotModelSynchronizer } from "./HubSpotModelSynchronizer";

export class OpportunityLineItemSynchronizer extends HubSpotModelSynchronizer {
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
        return source.associations.deals.results[0].id;
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
}
