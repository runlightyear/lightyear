import { Salesforce } from "../Salesforce";
import {
  CreateObjectProps,
  ModelSynchronizer,
  ModelSynchronizerProps,
  UpdateObjectProps,
} from "@runlightyear/lightyear/src/synchronizers/ModelSynchronizer";

export interface AccountSynchronizerProps extends ModelSynchronizerProps {
  salesforce: Salesforce;
}

export class AccountSynchronizer<T = object> extends ModelSynchronizer<T> {
  salesforce: Salesforce;

  constructor(props: AccountSynchronizerProps) {
    const { salesforce, ...rest } = props;
    super(rest);
    this.salesforce = props.salesforce;
  }

  getConnector() {
    return this.salesforce;
  }

  getDefaultToObject(): { [p: string]: string | ((source: any) => any) } {
    return {
      name: "Name",
      domain: (source: any) =>
        source.Website?.replace("http://", "")
          .replace("https://", "")
          .replace("www.", "") ?? null,
      website: "Website",
    };
  }

  getDefaultToSource(): { [p: string]: string | ((model: any) => any) } {
    return {
      Name: "name",
      Website: "website",
    };
  }

  async list() {
    const response = await this.salesforce.queryAll({
      q: `SELECT Id, LastModifiedDate, IsDeleted, ${this.getSourceFields().join(
        ", "
      )} FROM Account ORDER BY LastModifiedDate ASC`,
    });

    return response.data.records.map((record: any) => ({
      id: record.Id,
      userId: record.Owner,
      updatedAt: record.LastModifiedDate,
      isDeleted: record.IsDeleted,
      data: this.mapToObject(record),
    }));
  }

  async get(id: string) {
    const response = await this.salesforce.getRecord({
      objectType: "Account",
      objectId: id,
      fields: [
        "Id",
        "LastModifiedDate",
        "IsDeleted",
        ...this.getSourceFields(),
      ],
    });

    return {
      id: response.data.Id,
      userId: response.data.Owner,
      updatedAt: response.data.LastModifiedDate,
      isDeleted: response.data.IsDeleted,
      data: this.mapToObject(response.data),
    };
  }

  async create(object: CreateObjectProps<T>) {
    const response = await this.salesforce.createRecord({
      objectType: "Account",
      fieldValues: this.mapToSource(object.data),
    });

    return response.data.id;
  }

  async update(object: UpdateObjectProps<T>) {
    await this.salesforce.updateRecord({
      objectType: "Account",
      objectId: object.id,
      fieldValues: this.mapToSource(object.data),
    });
  }

  async delete(id: string) {
    await this.salesforce.deleteRecord({
      objectType: "Account",
      objectId: id,
    });
  }
}
