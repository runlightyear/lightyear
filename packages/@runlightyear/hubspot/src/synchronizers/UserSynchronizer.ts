import {
  ModelSynchronizer,
  ModelSynchronizerProps,
  RestConnector,
} from "@runlightyear/lightyear";

export interface HubSpotModelSynchronizerProps
  extends Omit<ModelSynchronizerProps, "collection"> {
  collection?: string;
}

export class UserSynchronizer extends ModelSynchronizer<any> {
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

  getToObjectMeta() {
    return {
      id: "id",
      updatedAt: "updatedAt",
      isDeleted: false,
    };
  }

  getToObjectData(): any {
    return {
      email: "email",
      firstName: "firstName",
      lastName: "lastName",
    };
  }

  getFromObjectMeta() {
    return {};
  }

  getFromObjectData(): any {
    return {
      firstName: "firstName",
      lastName: "lastName",
    };
  }

  async list(props: {
    syncType: "FULL" | "INCREMENTAL";
    lastUpdatedAt?: string;
    cursor?: string;
  }) {
    if (props.lastUpdatedAt) {
      return { objects: [] };
    }

    const response = await this.hubspot.get({
      url: `/crm/v3/owners`,
    });

    return {
      objects: response.data.results.map((result: any) =>
        this.mapToObject(result)
      ),
    };
  }

  async get(id: string) {
    const response = await this.hubspot.get({
      url: `/crm/v3/owners/${id}`,
      params: {
        properties: this.getExternalKeys().join(","),
      },
    });

    return this.mapToObject(response.data);
  }

  async create(object: any): Promise<string> {
    throw new Error(
      "HubSpot does not support creating new users/owners from the API"
    );
  }

  async update(object: any) {
    throw new Error(
      "HubSpot does not support updating users/owners from the API"
    );
  }

  async delete(id: string) {
    throw new Error(
      "HubSpot does not support deleting users/owners from the API"
    );
  }
}
