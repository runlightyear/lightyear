import { Salesforce } from "../Salesforce";
import {
  ModelSyncConnector,
  ModelSyncConnectorProps,
} from "@runlightyear/lightyear/src/connectors/ModelSyncConnector";

export interface ContactSyncProps extends ModelSyncConnectorProps {
  salesforce: Salesforce;
}

export class ContactSync extends ModelSyncConnector {
  salesforce: Salesforce;

  constructor(props: ContactSyncProps) {
    super(props);
    this.salesforce = props.salesforce;
  }

  async listObjects(props?: { since: string }) {
    let response;

    if (props) {
      const { since } = props;
      response = await this.salesforce.queryAll({
        q: `SELECT Id, FirstName, LastName, Email, Phone, LastModifiedDate, IsDeleted FROM Contact WHERE LastModifiedDate > ${since} AND Email != null ORDER BY LastModifiedDate ASC`,
      });
    } else {
      response = await this.salesforce.queryAll({
        q: `SELECT Id, FirstName, LastName, Email, Phone, LastModifiedDate, IsDeleted FROM Contact WHERE Email != null ORDER BY LastModifiedDate ASC`,
      });
    }

    return response.data.records;
  }

  async getObject(props: { id: string }) {
    const { id } = props;

    const response = await this.salesforce.getRecord({
      objectType: "Contact",
      objectId: id,
      fields: ["FirstName", "LastName", "Email", "Phone", "LastModifiedDate"],
    });

    return response.data;
  }

  async createObject(data: any) {
    const response = await this.salesforce.createRecord({
      objectType: "Contact",
      fieldValues: {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.primaryEmail,
        Phone: data.primaryPhone,
      },
    });

    return response.data.id;
  }

  async updateObject(props: { id: string; data: any }) {
    const { id, data } = props;

    await this.salesforce.updateRecord({
      objectType: "Contact",
      objectId: id,
      fieldValues: {
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.primaryEmail,
        Phone: data.primaryPhone,
      },
    });
  }

  async deleteObject(props: { id: string }) {
    const { id } = props;

    await this.salesforce.deleteRecord({
      objectType: "Contact",
      objectId: id,
    });
  }

  async listRemainingIds() {
    const response = await this.salesforce.query({
      q: `SELECT Id, FirstName, LastName, Email, Phone, LastModifiedDate, IsDeleted FROM Contact WHERE Email != null ORDER BY LastModifiedDate ASC`,
    });

    return response.data.records.map((record) => this.getObjectId(record));
  }

  getObjectId(object: any) {
    return object["Id"];
  }

  getObjectUpdatedAt(object: any) {
    return object["LastModifiedDate"];
  }

  isObjectDeleted(object: any) {
    return object["IsDeleted"];
  }

  toModelData(object: any) {
    return {
      firstName: object.FirstName,
      lastName: object.LastName,
      primaryEmail: object.Email ?? undefined,
      primaryPhone: object.Phone ?? undefined,
    };
  }

  toSourceData(modelObject: any): any {
    return {
      FirstName: modelObject.firstName,
      LastName: modelObject.lastName,
      Email: modelObject.primaryEmail,
      Phone: modelObject.primaryPhone,
    };
  }
}
