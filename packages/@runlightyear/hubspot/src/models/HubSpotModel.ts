import {
  ModelConnector,
  ModelConnectorProps,
  ListObjectProps,
  GetObjectProps,
  GetObjectResponse,
  BaseObject,
  BaseExternal,
  ListObjectResponse,
  CreateObjectProps,
  UpdateObjectProps,
  UpdateObjectBatchProps,
  DeleteObjectProps,
  DeleteObjectBatchProps,
} from "@runlightyear/lightyear";
import { HubSpot } from "../HubSpot";

export interface HubSpotModelProps extends ModelConnectorProps {
  connector: HubSpot;
}

export abstract class HubSpotModel<
  Object extends BaseObject,
  External extends BaseExternal,
  ListResponse,
  GetResponse
> extends ModelConnector<Object, External, ListResponse, GetResponse> {
  hubspot: HubSpot;

  constructor(props: HubSpotModelProps) {
    super({
      connector: props.connector,
      collectionName: props.collectionName,
      modelName: props.modelName,
    });

    this.hubspot = props.connector;
  }

  abstract getProperties(): string[];

  getAssociationKeys(): string[] | undefined {
    return undefined;
  }

  async list(props: ListObjectProps): Promise<ListObjectResponse<Object>> {
    const { syncType, lastExternalId, lastUpdatedAt, cursor } = props;

    console.debug("list", syncType, lastExternalId, lastUpdatedAt, cursor);

    if (syncType === "FULL") {
      const response = await this.hubspot.get({
        url: `/crm/v3/objects/${this.getPluralNoun()}`,
        params: {
          limit: 100,
          properties: this.getProperties(),
          associations: this.getAssociationKeys(),
          after: (cursor || lastExternalId) ?? undefined,
        },
      });

      console.debug("response.data", response.data);

      const validatedResponse = this.validateListResponse(response.data);

      return {
        objects: this.getObjectsFromListResponse(validatedResponse),
        cursor: response.data.paging?.next?.after ?? undefined,
      };
    } else if (syncType === "INCREMENTAL") {
      const response = await this.hubspot.post({
        url: `/crm/v3/objects/${this.getPluralNoun()}/search`,
        data: {
          limit: 100,
          properties: this.getProperties(),
          associations: this.getAssociationKeys(),
          sorts: [
            { propertyName: "hs_lastmodifieddate", direction: "ASCENDING" },
          ],
          ...(lastUpdatedAt
            ? {
                filterGroups: [
                  {
                    filters: [
                      {
                        propertyName: "hs_lastmodifieddate",
                        operator: "GT",
                        value: lastUpdatedAt,
                      },
                    ],
                  },
                ],
              }
            : null),
          after: cursor ?? undefined,
        },
      });

      console.debug("response.data", response.data);

      const validatedResponse = this.validateListResponse(response.data);

      return {
        objects: this.getObjectsFromListResponse(validatedResponse),
        cursor: response.data.paging?.next?.after ?? undefined,
      };
    } else {
      throw new Error(`Unknown syncType: ${syncType}`);
    }
  }

  async get(props: GetObjectProps): Promise<GetObjectResponse<Object>> {
    const { id } = props;

    const response = await this.hubspot.get({
      url: `/crm/v3/objects/${this.getPluralNoun()}/${id}`,
      params: {
        properties: this.getProperties(),
        associations: this.getAssociationKeys(),
      },
    });

    const validatedResponse = this.validateGetResponse(response.data);

    return this.getObjectFromGetResponse(validatedResponse);
  }

  async create(props: CreateObjectProps<Object>) {
    // const { changeId, object } = props;

    // const response = await this.hubspot.post({
    //   url: `/crm/v3/objects/${this.getPluralNoun()}`,
    //   data: {
    //     properties: this.getProperties(),
    //   },
    //   async: true,
    //   confirm: {
    //     changeIds: [object.changeId],
    //     idPath: "$.id",
    //     updatedAtPath: "$.updatedAt",
    //   },
    // });
    throw new Error("Not implemented yet");
  }

  async createBatch(props: Array<{ changeId: string; data: any }>) {
    // await this.hubspot.requestBatch(
    //   changes.map((change) => ({
    //     method: "POST",
    //     url: `/crm/v3/objects/${this.getPluralNoun()}`,
    //     data: {
    //       properties: this.mapFromObject(change),
    //     },
    //     confirm: {
    //       changeIds: [change.changeId],
    //       idPath: "$.id",
    //       updatedAtPath: "$.updatedAt",
    //     },
    //   }))
    // );
    throw new Error("Not implemented yet");
  }

  async update(props: UpdateObjectProps<Object>) {
    // await this.hubspot.patch({
    //   url: `/crm/v3/objects/${this.getPluralNoun()}/${object.id}`,
    //   data: {
    //     properties: this.mapFromObject(object),
    //   },
    // });
    throw new Error("Not implemented yet");
  }

  async updateBatch(props: UpdateObjectBatchProps<Object>) {
    // await this.hubspot.patch({
    //   url: `/crm/v3/objects/${this.getPluralNoun()}/${object.id}`,
    //   data: {
    //     properties: this.mapFromObject(object),
    //   },
    // });
    throw new Error("Not implemented yet");
  }

  async delete(props: DeleteObjectProps) {
    // await this.hubspot.delete({
    //   url: `/crm/v3/objects/${this.getPluralNoun()}/${id}`,
    // });
    throw new Error("Not implemented yet");
  }

  async deleteBatch(props: DeleteObjectBatchProps) {
    throw new Error("Not implemented yet");
  }
}
