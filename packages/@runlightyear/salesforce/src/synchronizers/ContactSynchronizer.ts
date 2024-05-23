import { Salesforce } from "../Salesforce";
import {
  CreateObjectProps,
  ModelSynchronizer,
  ModelSynchronizerProps,
  UpdateObjectProps,
} from "@runlightyear/lightyear/src/synchronizers/ModelSynchronizer";
import { AuthConnector } from "@runlightyear/lightyear";

export interface ContactSynchronizerProps extends ModelSynchronizerProps {
  salesforce: Salesforce;
}

export class ContactSynchronizer<T = object> extends ModelSynchronizer<T> {
  salesforce: Salesforce;

  constructor(props: ContactSynchronizerProps) {
    const { salesforce, ...rest } = props;
    super(rest);
    this.salesforce = props.salesforce;
  }

  getConnector(): AuthConnector {
    return this.salesforce;
  }

  getDefaultToObject() {
    return {
      firstName: "FirstName",
      lastName: "LastName",
      emailAddresses: (source: any) => {
        if (source.Email && source.Email.length > 0) {
          return [{ address: source.Email }];
        }
        return [];
      },
      phoneNumbers: (source: any) => {
        if (source.Phone && source.Phone.length > 0) {
          return [{ number: source.Phone }];
        }
        return [];
      },
      accountId: "AccountId",
    };
  }

  getDefaultToSource() {
    return {
      FirstName: "firstName",
      LastName: "lastName",
      Email: (object: any) => object.emailAddresses[0]?.address,
      Phone: (object: any) => object.phoneNumbers[0]?.number,
      AccountId: "accountId",
    };
  }

  async list() {
    const response = await this.salesforce.queryAll({
      q: `SELECT Id, LastModifiedDate, isDeleted, ${this.getSourceFields().join(
        ", "
      )} FROM Contact`,
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
      objectType: "Contact",
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
      updatedAt: response.data.LastModifiedDate,
      isDeleted: response.data.IsDeleted,
      data: this.mapToObject(response.data),
    };
  }

  async create(object: CreateObjectProps<T>) {
    const response = await this.salesforce.createRecord({
      objectType: "Contact",
      fieldValues: this.mapToSource(object.data),
    });

    return response.data.id;
  }

  async update(object: UpdateObjectProps<T>) {
    await this.salesforce.updateRecord({
      objectType: "Contact",
      objectId: object.id,
      fieldValues: this.mapToSource(object.data),
    });
  }

  async delete(id: string) {
    await this.salesforce.deleteRecord({
      objectType: "Contact",
      objectId: id,
    });
  }
}
