import { HubSpotModel, HubSpotModelProps } from "./HubSpotModel";
import { zod as z } from "@runlightyear/lightyear";

export interface HubSpotContactProps extends HubSpotModelProps {}

export interface CrmContact {
  id: string;
  updatedAt: string;
  isDeleted: boolean;
  data: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    mobile: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    accountId: string;
    ownerId: string;
  };
}

const HubSpotContactSchema = z.object({
  id: z.string(),
  updatedAt: z.string(),
  properties: z.object({
    firstname: z.string(),
    lastname: z.string(),
    jobtitle: z.string(),
    email: z.string(),
    phone: z.string(),
    mobilephone: z.string(),
    address: z.string(),
    address2: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
    associatedcompanyid: z.string(),
    hubspot_owner_id: z.string(),
  }),
});

type HubSpotContact = z.infer<typeof HubSpotContactSchema>;

const HubSpotContactListResponseSchema = z.object({
  results: z.array(HubSpotContactSchema),
});

type HubSpotContactListResponse = z.infer<
  typeof HubSpotContactListResponseSchema
>;

export class HubSpotContact extends HubSpotModel {
  getNoun() {
    return "contact";
  }

  getListProperties(): string[] {
    return [
      "firstname",
      "lastname",
      "jobtitle",
      "email",
      "phone",
      "mobilephone",
      "address",
      "address2",
      "city",
      "state",
      "zip",
      "country",
      "associatedcompanyid",
      "hubspot_owner_id",
    ];
  }

  validateListResponse(response: unknown) {
    return HubSpotContactListResponseSchema.parse(response);
  }

  validateGetResponse(response: unknown) {
    return HubSpotContactSchema.parse(response);
  }

  getObjectsFromListResponse(
    response: HubSpotContactListResponse
  ): Array<CrmContact> {
    return response.results.map((result) => ({
      id: result.id,
      updatedAt: result.updatedAt,
      isDeleted: false,
      data: {
        firstName: result.properties.firstname,
        lastName: result.properties.lastname,
        title: result.properties.jobtitle,
        email: result.properties.email,
        phone: result.properties.phone,
        mobile: result.properties.mobilephone,
        address: result.properties.address,
        address2: result.properties.address2,
        city: result.properties.city,
        state: result.properties.state,
        zip: result.properties.zip,
        country: result.properties.country,
        accountId: result.properties.associatedcompanyid,
        ownerId: result.properties.hubspot_owner_id,
      },
    }));
  }
}
