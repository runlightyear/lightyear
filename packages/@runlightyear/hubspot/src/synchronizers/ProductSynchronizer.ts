import { HubSpotModelSynchronizer } from "./HubSpotModelSynchronizer";

export class ProductSynchronizer extends HubSpotModelSynchronizer {
  getNoun() {
    return "product";
  }

  getToObjectData(): any {
    return {
      ...super.getToObjectData(),
      name: "properties.name",
      description: "properties.description",
      price: "properties.price",
      code: "properties.code",
    };
  }

  getFromObjectData(): any {
    return {
      ...super.getFromObjectData(),
      name: "name",
      description: "description",
      price: "price",
      code: "code",
    };
  }
}
