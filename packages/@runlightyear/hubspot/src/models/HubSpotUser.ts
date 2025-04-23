import { HubSpotModel, HubSpotModelProps } from "./HubSpotModel";
import {
  zod as z,
  CrmUserType,
  ListProps,
  ObjectList,
  CreateBatchProps,
  UpdateBatchProps,
  DeleteBatchProps,
  CrmUserDataType,
} from "@runlightyear/lightyear";
export interface HubSpotUserProps extends HubSpotModelProps {}

type HubSpotOwnerDataType = z.infer<typeof HubSpotUser.OwnerDataSchema>;
type HubSpotOwnerType = z.infer<typeof HubSpotUser.OwnerSchema>;
type HubSpotOwnerListResponse = z.infer<
  typeof HubSpotUser.OwnerListResponseSchema
>;

export class HubSpotUser extends HubSpotModel<
  CrmUserDataType,
  HubSpotOwnerDataType,
  HubSpotOwnerType,
  HubSpotOwnerListResponse
> {
  static OwnerDataSchema = z.object({
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });

  static OwnerSchema = HubSpotModel.ExternalSchema.merge(
    HubSpotUser.OwnerDataSchema
  );

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

  mapObjectDataToExternalData(data: CrmUserDataType): HubSpotOwnerDataType {
    throw new Error("Write operations not supported for owners");
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

  async createBatch(props: CreateBatchProps<CrmUserDataType>): Promise<void> {
    throw new Error(
      "HubSpot does not support creating new users/owners from the API"
    );
  }

  async updateBatch(props: UpdateBatchProps<CrmUserDataType>): Promise<void> {
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
