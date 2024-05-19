import { HubSpot } from "../HubSpot";
import {
  AuthConnector,
  ModelSynchronizer,
  ModelSynchronizerProps,
} from "@runlightyear/lightyear";
import {
  CreateObjectProps,
  ObjectId,
  UpdateObjectProps,
} from "@runlightyear/lightyear/src/synchronizers/ModelSynchronizer";

export interface AccountSyncProps extends ModelSynchronizerProps {
  hubspot: HubSpot;
}

export class AccountSynchronizer<T = any> extends ModelSynchronizer<T> {
  hubspot: HubSpot;

  constructor(props: AccountSyncProps) {
    super(props);
    this.hubspot = props.hubspot;
  }

  getConnector(): AuthConnector {
    return this.hubspot;
  }

  getDefaultToObject(): { [p: string]: string | ((source: any) => any) } {
    return {
      name: "name",
      domain: "domain",
    };
  }

  getDefaultToSource(): { [p: string]: string | ((model: any) => any) } {
    return {
      name: "name",
      domain: "domain",
    };
  }

  async list() {
    const response = await this.hubspot.get({
      url: "/crm/v3/objects/companies",
    });

    return response.data.results.map((result: any) => ({
      id: result.id,
      updatedAt: result.updatedAt,
      data: this.mapToObject(result.properties),
    }));
  }

  async get(id: string) {
    const response = await this.hubspot.get({
      url: `/crm/v3/objects/companies/${id}`,
    });

    return {
      id: response.data.id,
      updatedAt: response.data.updatedAt,
      data: {
        properties: this.mapToObject(response.data),
      },
    } as any;
  }

  async create(obj: CreateObjectProps<T>) {
    const response = await this.hubspot.post({
      url: "/crm/v3/objects/companies",
      data: {
        properties: this.mapToSource(obj.data),
      },
    });

    return response.data.id;
  }

  async update(obj: UpdateObjectProps<T>) {
    const response = await this.hubspot.patch({
      url: `/crm/v3/objects/companies/${obj.id}`,
      data: {
        properties: this.mapToSource(obj.data),
      },
    });

    return response.data.id;
  }

  async delete(id: ObjectId) {
    await this.hubspot.delete({
      url: `/crm/v3/objects/companies/${id}`,
    });
  }
}
