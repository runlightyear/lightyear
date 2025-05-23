import {
  zod as z,
  ModelConnector,
  ModelConnectorProps,
  ListProps,
  CreateBatchProps,
  UpdateBatchProps,
  DeleteBatchProps,
  ObjectList,
  Object,
} from "@runlightyear/lightyear";
import { HubSpot } from "../HubSpot";

export interface HubSpotModelProps extends ModelConnectorProps {
  hubspot: HubSpot;
}

type External = z.infer<typeof HubSpotModel.ExternalSchema>;
type ListResponse = z.infer<typeof HubSpotModel.ListResponseSchema>;

export abstract class HubSpotModel<
  ModelObjectData extends { [key: string]: unknown },
  ModelExternalData extends { [key: string]: unknown },
  ModelExternal extends External,
  ModelListResponse extends ListResponse
> extends ModelConnector<
  ModelObjectData,
  ModelExternalData,
  ModelExternal,
  ModelListResponse
> {
  hubspot: HubSpot;

  static ExternalSchema = z.object({
    id: z.string(),
    updatedAt: z.string(),
    properties: z.unknown(),
  });

  static ListResponseSchema = z.object({
    results: z.array(HubSpotModel.ExternalSchema),
    paging: z
      .object({
        next: z.object({
          after: z.string(),
        }),
      })
      .optional(),
  });

  constructor(props: HubSpotModelProps) {
    const { hubspot, ...rest } = props;
    super(rest);
    this.hubspot = props.hubspot;
  }

  abstract getProperties(): string[];

  getAssociationKeys(): string[] | undefined {
    return undefined;
  }

  mapExternalToObject(external: ModelExternal): Object<ModelObjectData> {
    return {
      id: external.id,
      updatedAt: external.updatedAt,
      isDeleted: false,
      data: {},
    } as Object<ModelObjectData>;
  }

  abstract mapObjectDataToExternalData(
    data: ModelObjectData
  ): ModelExternalData;

  async list(props: ListProps): Promise<ObjectList<Object<ModelObjectData>>> {
    const { syncType, lastExternalId, lastExternalUpdatedAt, cursor } = props;

    console.debug(
      "list",
      syncType,
      lastExternalId,
      lastExternalUpdatedAt,
      cursor
    );

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
        objects: validatedResponse.results.map((result) =>
          this.mapExternalToObject(result as ModelExternal)
        ),
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
          ...(lastExternalUpdatedAt
            ? {
                filterGroups: [
                  {
                    filters: [
                      {
                        propertyName: "hs_lastmodifieddate",
                        operator: "GT",
                        value: lastExternalUpdatedAt,
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
        objects: validatedResponse.results.map((result) =>
          this.mapExternalToObject(result as ModelExternal)
        ),
        cursor: response.data.paging?.next?.after ?? undefined,
      };
    } else {
      throw new Error(`Unknown syncType: ${syncType}`);
    }
  }

  async createBatch(props: CreateBatchProps<ModelObjectData>) {
    await this.hubspot.requestBatch(
      props.changes.map((change) => ({
        method: "POST",
        url: `/crm/v3/objects/${this.getPluralNoun()}`,
        data: this.mapObjectDataToExternalData(change.data),
        confirm: {
          changeIds: [change.changeId],
          idPath: "$.id",
          updatedAtPath: "$.updatedAt",
        },
      }))
    );
  }

  async updateBatch(props: UpdateBatchProps<ModelObjectData>) {
    throw new Error("Not implemented yet");
  }

  async deleteBatch(props: DeleteBatchProps) {
    throw new Error("Not implemented yet");
  }
}
