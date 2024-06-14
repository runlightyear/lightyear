import {
  ModelSynchronizer,
  ModelSynchronizerProps,
  RestConnector,
} from "@runlightyear/lightyear";

export interface HubSpotModelSynchronizerProps
  extends Omit<ModelSynchronizerProps, "collection"> {
  collection?: string;
}

export abstract class HubSpotModelSynchronizer extends ModelSynchronizer<any> {
  hubspot: RestConnector;

  constructor(props: HubSpotModelSynchronizerProps) {
    const { collection = "crm", ...rest } = props;
    super({ collection, ...rest });

    if (props.connector instanceof RestConnector) {
      this.hubspot = props.connector;
    } else {
      throw new Error("HubSpotModelSynchronizer requires a HubSpot connector");
    }
  }

  abstract getNoun(): string;

  getPluralNoun() {
    return `${this.getNoun()}s`;
  }

  getToObjectMeta() {
    return {
      id: "id",
      updatedAt: "updatedAt",
      isDeleted: false,
    };
  }

  getToObjectData(): any {
    return {};
  }

  getFromObjectMeta() {
    return {};
  }

  getFromObjectData(): any {
    return {};
  }

  async list() {
    const response = await this.hubspot.get({
      url: `/crm/v3/objects/${this.getPluralNoun()}`,
      params: {
        limit: 100,
        properties: this.getExternalKeys().join(","),
      },
    });

    return response.data.results.map((result: any) => this.mapToObject(result));
  }

  async get() {
    const response = await this.hubspot.get({
      url: `/crm/v3/objects/${this.getPluralNoun()}/{id}`,
      params: {
        properties: this.getExternalKeys().join(","),
      },
    });

    return this.mapToObject(response.data);
  }

  async create(object: any) {
    const response = await this.hubspot.post({
      url: `/crm/v3/objects/${this.getPluralNoun()}`,
      data: {
        properties: this.mapFromObject(object),
      },
    });

    return response.data.id;
  }

  async update(object: any) {
    await this.hubspot.patch({
      url: `/crm/v3/objects/${this.getPluralNoun()}/${object.id}`,
      data: {
        properties: this.mapFromObject(object),
      },
    });
  }

  async delete(id: string) {
    await this.hubspot.delete({
      url: `/crm/v3/objects/${this.getPluralNoun()}/${id}`,
    });
  }
}
