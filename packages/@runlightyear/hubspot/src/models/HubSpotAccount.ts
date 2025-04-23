import { HubSpotModel, HubSpotModelProps } from "./HubSpotModel";
import {
  zod as z,
  CrmAccountType,
  CrmAccountDataType,
} from "@runlightyear/lightyear";

export interface HubSpotAccountProps extends HubSpotModelProps {}

type HubSpotCompanyDataType = z.infer<
  typeof HubSpotAccount.HubSpotCompanyDataSchema
>;
type HubSpotCompanyType = z.infer<typeof HubSpotAccount.CompanySchema>;
type HubSpotCompanyListResponse = z.infer<
  typeof HubSpotAccount.CompanyListResponseSchema
>;

export class HubSpotAccount extends HubSpotModel<
  CrmAccountDataType,
  HubSpotCompanyDataType,
  HubSpotCompanyType,
  HubSpotCompanyListResponse
> {
  static HubSpotCompanyDataSchema = z.object({
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

  static CompanySchema = HubSpotModel.ExternalSchema.merge(
    HubSpotAccount.HubSpotCompanyDataSchema
  );

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

  mapObjectDataToExternalData(
    data: CrmAccountDataType
  ): HubSpotCompanyDataType {
    return {
      properties: {
        name: data.name ?? null,
        website: data.website ?? null,
        phone: data.phone ?? null,
        address: data.address?.street ?? null,
        address2: data.address?.street2 ?? null,
        city: data.address?.city ?? null,
        state: data.address?.state ?? null,
        zip: data.address?.postalCode ?? null,
        country: data.address?.country ?? null,
        industry: data.industry ?? null,
        numberofemployees: data.numberOfEmployees ?? null,
        hubspot_owner_id: data.ownerId ?? null,
      },
    };
  }
}
