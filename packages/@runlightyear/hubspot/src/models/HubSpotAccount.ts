import { HubSpotModel, HubSpotModelProps } from "./HubSpotModel";

export interface HubSpotAccountProps extends HubSpotModelProps {}

export interface CrmAccount {
  id: string;
  updatedAt: string;
  isDeleted: boolean;
  data: {
    name: string;
    website: string;
    phone: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    industry: string;
    numberOfEmployees: number;
    ownerId: string;
  };
}

const EmailJsonSchema  = { type: ["string", "null"] };

const PhoneJsonSchema = { type: ["string", "null"] };

const AddressJsonSchema = {
  anyOf: [
    {
      type: "object",
      properties: {
        type: { type: ["string", "null"] },
        street: { type: ["string", "null"] },
        street2: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        state: { type: ["string", "null"] },
        postalCode: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
      },
    },
    { type: "null" },
  ],
};


const CrmAccountJsonSchema =  {
  type: "object",
  properties: {
    name: { type: ["string", "null"] },
    website: { type: ["string", "null"] },
    phone: PhoneJsonSchema,
    address: AddressJsonSchema,
    billingAddress: AddressJsonSchema,
    shippingAddress: AddressJsonSchema,
    industry: { type: ["string", "null"] },
    numberOfEmployees: { type: ["string", "null"] },
    ownerId: {
      anyOf: [
        {
          type: "string",
          references: "user",
        },
        { type: "null" },
      ],
    },
  },
};

export type CrmAccount = FromSchema<typeof CrmAccountJsonSchema>;

export interface HubspotCompany {
  externalId: string;
  data: {
    name: string;
    website: string;
    phone: string;
    address: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    industry: string;
    numberofemployees: number;
    hubspot_owner_id: string;
  };
}

const HubSpotCompanySchema = z.object({
  id: z.string(),
  updatedAt: z.string(),
  properties: z.object({
    name: z.string(),
    website: z.string(),
    phone: z.string(),
    address: z.string(),
    address2: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
    industry: z.string(),
    numberofemployees: z.number(),
    hubspot_owner_id: z.string(),
  }),
});

const HubSpotCompanyListResponseSchema = z.object({
  results: z.array(HubSpotCompanySchema),
});

type HubSpotCompanyListResponse = z.infer<typeof HubSpotCompanyListResponseSchema>;

export class HubSpotAccount extends HubSpotModel<
  CrmAccount,
  HubspotCompany,
  HubSpotCompanyListResponse
> {
  getNoun(): string {
    return "company";
  }

  getPluralNoun(): string {
    return "companies";
  }

  getListProperties(): string[] {
    return ["name", "website", "phone", "address", "address2", "city", "state", "zip", "country", "industry", "numberofemployees", "hubspot_owner_id"];
  }

  validateListResponse(response: unknown) {
    return HubSpotCompanyListResponseSchema.parse(response);
  }

  validateGetResponse(response: unknown) {
    return HubSpotCompanySchema.parse(response);
  }

  getObjectsFromListResponse(response: HubSpotCompanyListResponse): Array<CrmAccount> {
    return response.results.map((result) => ({
      id: result.id,
      updatedAt: result.updatedAt,
      isDeleted: false,
      data: {
        name: result.properties.name,
        website: result.properties.website,
        phone: result.properties.phone,
        address: result.properties.address,
        address2: result.properties.address2,
        city: result.properties.city,
        state: result.properties.state,
        zip: result.properties.zip,
        country: result.properties.country,
        industry: result.properties.industry,
        numberOfEmployees: result.properties.numberofemployees,
        ownerId: result.properties.hubspot_owner_id,
      },
    }));
  }

  getExternalFromObject(object: CrmAccount): HubspotCompany {
    return {
      ...super.getExternalFromObject(object),
      data: {
        name: object.data.name,
        website: object.data.website,
        phone: object.data.phone,
        address: object.data.address.street,
      street2: "address.street2",
      city: "address.city",
      state: "address.state",
      zip: "address.postalCode",
      country: "address.country",
      industry: "industry",
      numberofemployees: "numberOfEmployees",
      hubspot_owner_id: "ownerId",
    };
  }
}
