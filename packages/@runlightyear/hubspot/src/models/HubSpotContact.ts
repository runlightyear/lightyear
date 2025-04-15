import { HubSpotModel, HubSpotModelProps } from "./HubSpotModel";
import { CrmContactType, zod as z } from "@runlightyear/lightyear";

export interface HubSpotContactProps extends HubSpotModelProps {}

type HubSpotContactListResponse = z.infer<
  typeof HubSpotContact.HubSpotContactListResponseSchema
>;

type HubSpotContactType = z.infer<typeof HubSpotContact.HubSpotContactSchema>;

export class HubSpotContact extends HubSpotModel<
  CrmContactType,
  HubSpotContactListResponse,
  HubSpotContactType
> {
  constructor(props: HubSpotContactProps) {
    super(props);
  }

  static HubSpotContactSchema = HubSpotModel.ExternalSchema.extend({
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
}
