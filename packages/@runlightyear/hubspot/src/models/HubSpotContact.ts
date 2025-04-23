import { HubSpotModel, HubSpotModelProps } from "./HubSpotModel";
import {
  CrmContactDataType,
  CrmContactType,
  zod as z,
} from "@runlightyear/lightyear";

export interface HubSpotContactProps extends HubSpotModelProps {}

type HubSpotContactDataType = z.infer<
  typeof HubSpotContact.HubSpotContactDataSchema
>;
type HubSpotContactType = z.infer<typeof HubSpotContact.HubSpotContactSchema>;
type HubSpotContactListResponse = z.infer<
  typeof HubSpotContact.HubSpotContactListResponseSchema
>;

export class HubSpotContact extends HubSpotModel<
  CrmContactDataType,
  HubSpotContactDataType,
  HubSpotContactType,
  HubSpotContactListResponse
> {
  constructor(props: HubSpotContactProps) {
    super(props);
  }

  static HubSpotContactDataSchema = z.object({
    properties: z.object({
      firstname: z.string().nullable(),
      lastname: z.string().nullable(),
      jobtitle: z.string().nullable(),
      email: z.string().nullable(),
      phone: z.string().nullable(),
      mobilephone: z.string().nullable(),
      address: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      zip: z.string().nullable(),
      country: z.string().nullable(),
      associatedcompanyid: z.string().nullable(),
      hubspot_owner_id: z.string().nullable(),
    }),
  });

  static HubSpotContactSchema = HubSpotModel.ExternalSchema.merge(
    HubSpotContact.HubSpotContactDataSchema
  );

  static HubSpotContactListResponseSchema =
    HubSpotModel.ListResponseSchema.extend({
      results: z.array(HubSpotContact.HubSpotContactSchema),
    });

  getNoun() {
    return "contact";
  }

  getProperties(): string[] {
    return [
      "firstname",
      "lastname",
      "jobtitle",
      "email",
      "phone",
      "mobilephone",
      "address",
      "city",
      "state",
      "zip",
      "country",
      "associatedcompanyid",
      "hubspot_owner_id",
    ];
  }

  validateListResponse(response: unknown): HubSpotContactListResponse {
    return HubSpotContact.HubSpotContactListResponseSchema.parse(response);
  }

  mapExternalToObject(external: HubSpotContactType): CrmContactType {
    return {
      ...super.mapExternalToObject(external),
      data: {
        firstName: external.properties.firstname,
        lastName: external.properties.lastname,
        title: external.properties.jobtitle,
        email: external.properties.email,
        phone: external.properties.phone,
        mobile: external.properties.mobilephone,
        address: {
          street: external.properties.address,
          city: external.properties.city,
          state: external.properties.state,
          postalCode: external.properties.zip,
          country: external.properties.country,
        },
        accountId:
          external.properties.associatedcompanyid === ""
            ? null
            : external.properties.associatedcompanyid,
        ownerId:
          external.properties.hubspot_owner_id === ""
            ? null
            : external.properties.hubspot_owner_id,
      },
    };
  }

  mapObjectDataToExternalData(
    data: CrmContactDataType
  ): HubSpotContactDataType {
    return {
      properties: {
        firstname: data.firstName ?? null,
        lastname: data.lastName ?? null,
        jobtitle: data.title ?? null,
        email: data.email ?? null,
        phone: data.phone ?? null,
        mobilephone: data.mobile ?? null,
        address: data.address?.street ?? null,
        city: data.address?.city ?? null,
        state: data.address?.state ?? null,
        zip: data.address?.postalCode ?? null,
        country: data.address?.country ?? null,
        associatedcompanyid: data.accountId ?? null,
        hubspot_owner_id: data.ownerId ?? null,
      },
    };
  }
}
