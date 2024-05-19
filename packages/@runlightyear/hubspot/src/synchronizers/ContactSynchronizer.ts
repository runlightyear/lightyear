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

export interface ContactSynchronizerProps extends ModelSynchronizerProps {
  hubspot: HubSpot;
}

export class ContactSynchronizer extends ModelSynchronizer<any> {
  hubspot: HubSpot;

  constructor(props: ContactSynchronizerProps) {
    const { hubspot, ...rest } = props;

    super(rest);

    this.hubspot = props.hubspot;
  }

  getConnector(): AuthConnector {
    return this.hubspot;
  }

  getDefaultToObject() {
    return {
      firstName: "firstname",
      lastName: "lastname",
      primaryEmail: "email",
      // accountId: "associatedcompanyid",
    };
  }

  getDefaultToSource() {
    return {
      firstname: "firstName",
      lastname: "lastName",
      email: "primaryEmail",
      // associatedcompanyid: "accountId",
    };
  }

  async list() {
    const response = await this.hubspot.get({
      url: "/crm/v3/objects/contacts",
      params: {
        limit: 100,
        properties: this.getSourceFields().join(","),
      },
    });

    return response.data.results.map((result: any) => ({
      id: result.id,
      updatedAt: result.updatedAt,
      data: this.mapToObject(result.properties),
    }));
  }

  async get(id: ObjectId) {
    const response = await this.hubspot.get({
      url: `/crm/v3/objects/contacts/${id}`,
      params: {
        properties: this.getSourceFields().join(","),
      },
    });

    return response.data;
  }

  async create(obj: CreateObjectProps<any>) {
    const response = await this.hubspot.post({
      url: "/crm/v3/objects/contacts",
      data: {
        properties: this.mapToSource(obj),
      },
    });

    return response.data.id;
  }

  async update(obj: UpdateObjectProps<any>) {
    const response = await this.hubspot.patch({
      url: `/crm/v3/objects/contacts/${obj.id}`,
      data: {
        properties: this.mapToSource(obj),
      },
    });

    return response.data.id;
  }

  async delete(id: ObjectId) {
    await this.hubspot.delete({
      url: `/crm/v3/objects/contacts/${id}`,
    });
  }
}
