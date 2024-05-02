import { Salesforce } from "../Salesforce";
import {
  ModelSyncConnector,
  ModelSyncConnectorProps,
} from "@runlightyear/lightyear/src/connectors/ModelSyncConnector";

export interface AccountSyncProps extends ModelSyncConnectorProps {
  salesforce: Salesforce;
}

export class AccountSync extends ModelSyncConnector {
  salesforce: Salesforce;

  constructor(props: AccountSyncProps) {
    super({ ...props, model: "account" });
    this.salesforce = props.salesforce;
  }

  async listObjects(props?: { since: string }) {
    let response;

    if (props) {
      const { since } = props;
      response = await this.salesforce.queryAll({
        q: `SELECT Id, Name, LastModifiedDate, IsDeleted FROM Account WHERE LastModifiedDate > ${since} ORDER BY LastModifiedDate ASC`,
      });
    } else {
      response = await this.salesforce.queryAll({
        q: `SELECT Id, Name, LastModifiedDate, IsDeleted FROM Account ORDER BY LastModifiedDate ASC`,
      });
    }

    return response.data.records;
  }

  async getObject(props: { id: string }) {
    const { id } = props;

    const response = await this.salesforce.getRecord({
      objectType: "Account",
      objectId: id,
      fields: ["Name", "LastModifiedDate"],
    });

    return response.data;
  }

  async createObject(props: { data: any }) {
    const { data } = props;
    console.log("in AccountSync.createObject data:", data);
    const response = await this.salesforce.createRecord({
      objectType: "Account",
      fieldValues: data,
    });

    return response.data.id;
  }

  async updateObject(props: { id: string; data: any }) {
    const { id, data } = props;

    await this.salesforce.updateRecord({
      objectType: "Account",
      objectId: id,
      fieldValues: data,
    });
  }

  async deleteObject(props: { id: string }) {
    const { id } = props;

    await this.salesforce.deleteRecord({
      objectType: "Account",
      objectId: id,
    });
  }

  async listRemainingIds() {
    const response = await this.salesforce.queryAll({
      q: `SELECT Id, Name, LastModifiedDate, IsDeleted FROM Account ORDER BY LastModifiedDate ASC`,
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
      name: object.Name,
    };
  }

  toSourceData(modelObject: any): any {
    return {
      Name: modelObject.name,
    };
  }
}
