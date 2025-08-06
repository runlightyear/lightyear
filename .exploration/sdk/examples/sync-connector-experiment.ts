const hubspotRestConnector = defineRestConnector()
  .withBaseUrl('asdasdf')
  .addHeaders({
    'x-api-key': '{{ apiKey }}',
  })
  .build();

const hubspotSyncConnector = defineSyncConnector()
  .withCollection(crmCollection)
  .withRestConnector(hubspotRestConnector)
  .withBaseListRequest(async (connector, url) => {
    return await connector.get({
        url,
        params: {
            limit: 100,
        }
    })
  })
  .withBaseListSchema(z.object({...}))
  .withBaseList()
  .withBaseCreateRequest(async (connector, endpoint, data) => {
    return await connector.post({
        url: endpoint,
        data,
    })
  })
  .withModelConnectors({
    account: defineModelConnector()
      .withValidateList(z.object())
      .withUrl('companies')
      .withPrepareData((obj) => {
        return {
          name: obj.name,
        }
      })
      .build(),
    contact: defineModelConnector()
      .withValidateList(z.object())
      .withUrl('contacts')
      .withPrepareData((obj) => {
        return {
          firstname: obj.firstName,
          lastname: obj.lastName,
        }
      })
      }))
  )
)
  