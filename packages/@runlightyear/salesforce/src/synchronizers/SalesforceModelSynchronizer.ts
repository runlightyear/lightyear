import { Salesforce } from "../Salesforce";
import {
  ModelSynchronizer,
  ModelSynchronizerProps,
} from "@runlightyear/lightyear";

export interface SalesforceModelSynchronizerProps
  extends Omit<ModelSynchronizerProps, "collection"> {
  collection?: string;
}

export abstract class SalesforceModelSynchronizer extends ModelSynchronizer<any> {
  salesforce: Salesforce;

  constructor(props: SalesforceModelSynchronizerProps) {
    const { collection = "crm", ...rest } = props;
    super({ collection, ...rest });

    if (props.connector instanceof Salesforce) {
      this.salesforce = props.connector;
    } else {
      throw new Error(
        "SalesforceModelSynchronizer requires a Salesforce connector"
      );
    }
  }

  abstract getNoun(): string;

  getPluralNoun() {
    return `${this.getNoun()}s`;
  }

  getToObjectMeta() {
    return {
      id: "Id",
      updatedAt: "LastModifiedDate",
      isDeleted: "IsDeleted",
    };
  }

  getToObjectData() {
    return {};
  }

  getFromObjectMeta() {
    return {
      Id: "id",
      LastModifiedDate: "updatedAt",
      IsDeleted: "isDeleted",
    };
  }

  getFromObjectData() {
    return {};
  }

  async list() {
    const response = await this.salesforce.queryAll({
      q: `SELECT ${this.getExternalKeys().join(
        ", "
      )} FROM ${this.getNoun()} ORDER BY LastModifiedDate ASC`,
    });

    return response.data.records.map((record: any) => this.mapToObject(record));
  }

  async get(id: string) {
    const response = await this.salesforce.getRecord({
      objectType: this.getNoun(),
      objectId: id,
      fields: this.getExternalKeys(),
    });

    return this.mapToObject(response.data);
  }

  async create(object: any) {
    const response = await this.salesforce.createRecord({
      objectType: this.getNoun(),
      fieldValues: this.mapFromObject(object),
    });

    return response.data.id;
  }

  async update(object: any) {
    await this.salesforce.updateRecord({
      objectType: this.getNoun(),
      objectId: object.id,
      fieldValues: this.mapFromObject(object),
    });
  }

  async delete(id: string) {
    await this.salesforce.deleteRecord({
      objectType: this.getNoun(),
      objectId: id,
    });
  }
}
