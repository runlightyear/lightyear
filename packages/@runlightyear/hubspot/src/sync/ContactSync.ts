import { HubSpot } from "../HubSpot";
import {
  ModelSyncConnector,
  type ModelSyncConnectorProps,
} from "@runlightyear/lightyear/src/connectors/ModelSyncConnector";

export interface ContactSyncProps extends ModelSyncConnectorProps {
  hubspot: HubSpot;
}

export class ContactSync extends ModelSyncConnector {
  hubspot: HubSpot;

  constructor(props: ContactSyncProps) {
    super(props);
    this.hubspot = props.hubspot;
  }

  async listObjects(props?: { since: string }) {
    let response;

    if (props) {
      const { since } = props;
      response = await this.hubspot.get({ url: "/crm/v3/objects/contacts" });
    } else {
      response = await this.hubspot.get({ url: "/crm/v3/objects/contacts" });
    }

    console.log("response", response);

    return response.data.results;
  }

  async getObject(props: { id: string }) {
    const { id } = props;
    console.log("in ContactSync.getObject id:", id);

    const response = await this.hubspot.get({
      url: `/crm/v3/objects/contacts/${id}`,
    });

    return response.data;
  }

  async createObject(props: { data: any }) {
    const { data } = props;
    console.log("in ContactSync.createObject data:", data);

    const response = await this.hubspot.post({
      url: "/crm/v3/objects/contacts",
      data,
    });

    return response.data.id;
  }

  async updateObject(props: { id: string; data: any }) {
    const { id, data } = props;
    console.log("in ContactSync.updateObject id:", id, "data:", data);

    const response = await this.hubspot.patch({
      url: `/crm/v3/objects/contacts/${id}`,
      data,
    });

    return response.data.id;
  }

  async deleteObject(props: { id: string }) {
    const { id } = props;
    console.log("in ContactSync.deleteObject id:", id);

    await this.hubspot.delete({
      url: `/crm/v3/objects/contacts/${id}`,
    });
  }

  async listRemainingIds() {
    const response = await this.hubspot.get({
      url: "/crm/v3/objects/contacts",
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

  toModelData(sourceObject: any) {
    return {
      firstName: sourceObject.properties.firstname,
      lastName: sourceObject.properties.lastname,
      primaryEmail: sourceObject.properties.email,
    };
  }

  toSourceData(modelObject: any): unknown {
    return {
      properties: {
        firstname: modelObject.firstName,
        lastname: modelObject.lastName,
        email: modelObject.primaryEmail,
      },
    };
  }
}
