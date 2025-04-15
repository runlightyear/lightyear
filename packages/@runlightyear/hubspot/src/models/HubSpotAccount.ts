import { HubSpotModel, HubSpotModelProps } from "./HubSpotModel";
import { zod as z, CrmAccountType } from "@runlightyear/lightyear";

export interface HubSpotAccountProps extends HubSpotModelProps {}

type HubSpotCompanyListResponse = z.infer<
  typeof HubSpotAccount.CompanyListResponseSchema
>;
type HubSpotCompanyType = z.infer<typeof HubSpotAccount.CompanySchema>;

export class HubSpotAccount extends HubSpotModel<
  CrmAccountType,
  HubSpotCompanyListResponse,
  HubSpotCompanyType
> {
  static CompanySchema = HubSpotModel.ExternalSchema.extend({
    properties: z.object({
      name: z.string().nullable(),
      website: z.string().nullable(),
      phone: z.string().nullable(),
      address: z.string().nullable(),
      address2: z.string().nullable(),
      city: z.string().nullable(),
      state: z.string().nullable(),
      zip: z.string().nullable(),
      country: z.string().nullable(),
      industry: z.string().nullable(),
      numberofemployees: z.string().nullable(),
      hubspot_owner_id: z.string().nullable(),
    }),
  });

  static CompanyListResponseSchema = HubSpotModel.ListResponseSchema.extend({
    results: z.array(HubSpotAccount.CompanySchema),
  });

  getNoun(): string {
    return "company";
  }

  getPluralNoun(): string {
    return "companies";
  }

  getProperties(): string[] {
    return [
      "name",
      "website",
      "phone",
      "address",
      "address2",
      "city",
      "state",
      "zip",
      "country",
      "industry",
      "numberofemployees",
      "hubspot_owner_id",
    ];
  }

  validateListResponse(response: unknown): HubSpotCompanyListResponse {
    return HubSpotAccount.CompanyListResponseSchema.parse(response);
  }

  mapExternalToObject(external: HubSpotCompanyType): CrmAccountType {
    return {
      ...super.mapExternalToObject(external),
      data: {
        name: external.properties.name,
        website: external.properties.website,
        phone: external.properties.phone,
        address: {
          street: external.properties.address,
          street2: external.properties.address2,
          city: external.properties.city,
          state: external.properties.state,
          postalCode: external.properties.zip,
          country: external.properties.country,
        },
        industry: external.properties.industry,
        numberOfEmployees: external.properties.numberofemployees,
        ownerId:
          external.properties.hubspot_owner_id === ""
            ? null
            : external.properties.hubspot_owner_id,
      },
    };
  }

  mapObjectToExternal(object: CrmAccountType) {
    return {
      id: object.id,
      updatedAt: object.updatedAt,
      properties: {
        name: object.data.name,
        website: object.data.website,
        phone: object.data.phone,
        address: object.data.address?.street,
        address2: object.data.address?.street2,
        city: object.data.address?.city,
        state: object.data.address?.state,
        zip: object.data.address?.postalCode,
        country: object.data.address?.country,
        industry: object.data.industry,
        numberofemployees: object.data.numberOfEmployees,
        hubspot_owner_id: object.data.ownerId,
      },
    };
  }
}
