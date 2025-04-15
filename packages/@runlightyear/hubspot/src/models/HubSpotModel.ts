import {
  zod as z,
  ModelConnector,
  ModelConnectorProps,
  ListProps,
  CreateBatchProps,
  UpdateBatchProps,
  DeleteBatchProps,
  BaseObject,
  ObjectList,
} from "@runlightyear/lightyear";
import { HubSpot } from "../HubSpot";

export interface HubSpotModelProps extends ModelConnectorProps {
  hubspot: HubSpot;
}

export abstract class HubSpotModel<
  ModelObject extends BaseObject,
  ModelListResponse extends z.infer<typeof HubSpotModel.ListResponseSchema>,
  ModelExternal extends z.infer<typeof HubSpotModel.ExternalSchema>
> extends ModelConnector<ModelObject, ModelListResponse, ModelExternal> {
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

  mapExternalToObject(external: ModelExternal): ModelObject {
    return {
      id: external.id,
      updatedAt: external.updatedAt,
      isDeleted: false,
      data: {},
    } as ModelObject;
  }

  async list(props: ListProps): Promise<ObjectList<ModelObject>> {
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
        objects: validatedResponse.results.map((result) =>
          this.mapExternalToObject(result as ModelExternal)
        ),
        cursor: response.data.paging?.next?.after ?? undefined,
      };
    } else {
      throw new Error(`Unknown syncType: ${syncType}`);
    }
  }

  async createBatch(props: CreateBatchProps<ModelObject>) {
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

  async updateBatch(props: UpdateBatchProps<ModelObject>) {
    throw new Error("Not implemented yet");
  }

  async deleteBatch(props: DeleteBatchProps) {
    throw new Error("Not implemented yet");
  }
}
