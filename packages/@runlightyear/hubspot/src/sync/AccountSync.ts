import { HubSpot } from "../HubSpot";
import {
  ModelSyncConnector,
  type ModelSyncConnectorProps,
} from "@runlightyear/lightyear/src/connectors/ModelSyncConnector";

export interface AccountSyncProps extends ModelSyncConnectorProps {
  hubspot: HubSpot;
}

export class AccountSync extends ModelSyncConnector {
  hubspot: HubSpot;

  constructor(props: AccountSyncProps) {
    super(props);
    this.hubspot = props.hubspot;
  }

  async listObjects(props?: { since: string }) {
    let response;

    if (props) {
      const { since } = props;
      response = await this.hubspot.get({ url: "/crm/v3/objects/companies" });
    } else {
      response = await this.hubspot.get({ url: "/crm/v3/objects/companies" });
    }

    console.log("response", response);

    return response.data.results;
  }

  async getObject(props: { id: string }) {
    const { id } = props;

    const response = await this.hubspot.get({
      url: `/crm/v3/objects/companies/${id}`,
    });

    return response.data;
  }

  async createObject(props: { data: any }) {
    const { data } = props;
    console.log("in AccountSync.createObject data:", data);
    const response = await this.hubspot.post({
      url: "/crm/v3/objects/companies",
      data,
    });

    return response.data.id;
  }

  async updateObject(props: { id: string; data: any }) {
    const { id, data } = props;
    console.log("in AccountSync.updateObject id:", id, "data:", data);
    const response = await this.hubspot.patch({
      url: `/crm/v3/objects/companies/${id}`,
      data,
    });

    return response.data.id;
  }

  async deleteObject(props: { id: string }) {
    const { id } = props;
    console.log("in AccountSync.deleteObject id:", id);
    await this.hubspot.delete({
      url: `/crm/v3/objects/companies/${id}`,
    });
  }

  async listRemainingIds() {
    const response = await this.hubspot.get({
      url: "/crm/v3/objects/companies",
    });
    return response.data.results.map((company: any) => company.id);
  }

  getObjectId(object: any) {
    return object.id;
  }

  getObjectUpdatedAt(object: any): string {
    return object.updatedAt;
  }

  isObjectDeleted(object: unknown): boolean {
    return false;
  }

  toModelData(object: any) {
    return {
      name: object.properties.name,
      domain: object.properties.domain,
    };
  }

  toSourceData(modelObject: any): unknown {
    return {
      properties: {
        name: modelObject.name,
        domain: modelObject.domain,
      },
    };
  }
}
