import { HubSpotModel, HubSpotModelProps } from "./HubSpotModel";
import {
  zod as z,
  CrmUserType,
  ListProps,
  ObjectList,
  CreateBatchProps,
  UpdateBatchProps,
  DeleteBatchProps,
} from "@runlightyear/lightyear";
export interface HubSpotUserProps extends HubSpotModelProps {}

type HubSpotOwnerListResponse = z.infer<
  typeof HubSpotUser.OwnerListResponseSchema
>;
type HubSpotOwnerType = z.infer<typeof HubSpotUser.OwnerSchema>;

export class HubSpotUser extends HubSpotModel<
  CrmUserType,
  HubSpotOwnerListResponse,
  HubSpotOwnerType
> {
  static OwnerSchema = HubSpotModel.ExternalSchema.extend({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });

  static OwnerListResponseSchema = HubSpotModel.ListResponseSchema.extend({
    results: z.array(HubSpotUser.OwnerSchema),
  });

  getProperties(): string[] {
    return ["email", "firstname", "lastname"];
  }

  getNoun(): string {
    return "owner";
  }

  validateListResponse(response: unknown): HubSpotOwnerListResponse {
    return HubSpotUser.OwnerListResponseSchema.parse(response);
  }

  mapExternalToObject(external: HubSpotOwnerType): CrmUserType {
    return {
      ...super.mapExternalToObject(external),
      data: {
        email: external.email,
        firstName: external.firstName,
        lastName: external.lastName,
      },
    };
  }

  async list(props: ListProps): Promise<ObjectList<CrmUserType>> {
    if (props.syncType === "INCREMENTAL") {
      console.info(
        "Incremental sync for owners not yet supported, skipping..."
      );
      return { objects: [] };
    }

    const responseActiveUsers = await this.hubspot.get({
      url: `/crm/v3/owners`,
    });

    const responseDeactivatedUsers = await this.hubspot.get({
      url: `/crm/v3/owners`,
      params: {
        archived: true,
      },
    });

    const validatedResponseActiveUsers = this.validateListResponse(
      responseActiveUsers.data
    );

    const validatedResponseDeactivatedUsers = this.validateListResponse(
      responseDeactivatedUsers.data
    );

    const objects = [
      ...validatedResponseActiveUsers.results.map((result) =>
        this.mapExternalToObject(result)
      ),
      ...validatedResponseDeactivatedUsers.results.map((result) =>
        this.mapExternalToObject(result)
      ),
    ];

    return {
      objects,
    };
  }

  async createBatch(props: CreateBatchProps<CrmUserType>): Promise<void> {
    throw new Error(
      "HubSpot does not support creating new users/owners from the API"
    );
  }

  async updateBatch(props: UpdateBatchProps<CrmUserType>): Promise<void> {
    throw new Error(
      "HubSpot does not support updating users/owners from the API"
    );
  }

  async deleteBatch(props: DeleteBatchProps): Promise<void> {
    throw new Error(
      "HubSpot does not support deleting users/owners from the API"
    );
  }
}
