import { defineMultiModelSync } from '../sync-connector-multi-model';
import { defineRestConnector } from '../rest-connector';
import { defineCollection, match } from '../builders';

/**
 * Advanced multi-model sync patterns
 */

// Example 1: Salesforce with related objects and associations
const salesforceConnector = defineRestConnector()
  .withBaseUrl('https://mycompany.my.salesforce.com')
  .withAuthHeader('Authorization')
  .build(httpProxy, batchProxy);

const salesforceSync = defineMultiModelSync()
  .withCollection(crmCollection)
  .withConnector(salesforceConnector)
  
  // Common SOQL query builder
  .withCommonList(async (mode, state, api) => {
    // Use composite API to fetch multiple objects efficiently
    const requests = buildCompositeRequest(mode, state);
    
    const response = await api.post('/services/data/v58.0/composite', {
      compositeRequest: requests
    });
    
    // Flatten all responses into single items array
    const allItems: any[] = [];
    response.data.compositeResponse.forEach((res: any) => {
      if (res.httpStatusCode === 200) {
        res.body.records.forEach((record: any) => {
          allItems.push({
            ...record,
            _objectType: res.referenceId // e.g., 'Account', 'Contact'
          });
        });
      }
    });
    
    return {
      items: allItems,
      nextState: {
        ...state,
        batchIndex: (state.batchIndex || 0) + 1,
        lastSyncTime: new Date()
      },
      hasMore: state.batchIndex < 2 // 3 batches total
    };
  })
  
  // Account configuration with relationship loading
  .forModel('account', {
    extractItems: response => 
      response.items.filter(item => item._objectType === 'Account'),
    
    mapFromApi: (item: any) => ({
      id: item.Id,
      data: {
        accountId: item.Id,
        name: item.Name,
        type: item.Type,
        industry: item.Industry,
        // Include nested relationship data
        primaryContact: item.Contacts?.records?.[0]?.Id,
        openOpportunities: item.Opportunities?.records?.filter(
          (opp: any) => !opp.IsClosed
        ).length || 0
      }
    }),
    
    mapToApi: (data: any, operation) => ({
      Name: data.name,
      Type: data.type,
      Industry: data.industry
    }),
    
    getEndpoint: (data, operation) => ({
      path: operation === 'create'
        ? '/services/data/v58.0/sobjects/Account'
        : `/services/data/v58.0/sobjects/Account/${data.accountId}`,
      method: operation === 'delete' ? 'DELETE' : operation === 'create' ? 'POST' : 'PATCH'
    }),
    
    // Custom list params for accounts
    getListParams: (mode, state) => ({
      fields: 'Id,Name,Type,Industry,(SELECT Id FROM Contacts),(SELECT Id,IsClosed FROM Opportunities)'
    })
  })
  
  // Contact configuration with association handling
  .forModel('contact', {
    extractItems: response => 
      response.items.filter(item => item._objectType === 'Contact'),
    
    mapFromApi: (item: any) => ({
      id: item.Id,
      data: {
        contactId: item.Id,
        email: item.Email,
        firstName: item.FirstName,
        lastName: item.LastName,
        accountId: item.AccountId,
        title: item.Title,
        // Computed fields
        isPrimary: item.IsPrimary__c || false
      }
    }),
    
    mapToApi: (data: any, operation) => ({
      Email: data.email,
      FirstName: data.firstName,
      LastName: data.lastName,
      AccountId: data.accountId,
      Title: data.title,
      IsPrimary__c: data.isPrimary
    }),
    
    getEndpoint: (data, operation) => ({
      path: operation === 'create'
        ? '/services/data/v58.0/sobjects/Contact'
        : `/services/data/v58.0/sobjects/Contact/${data.contactId}`,
      method: operation === 'delete' ? 'DELETE' : operation === 'create' ? 'POST' : 'PATCH'
    })
  })
  
  .build();

// Example 2: E-commerce sync with hierarchical data
const ecommerceSync = defineMultiModelSync()
  .withCollection(ecommerceCollection)
  .withConnector(restConnector)
  
  // Fetch hierarchical data in single request
  .withCommonList(async (mode, state, api) => {
    const response = await api.get('/api/v2/catalog/export', {
      format: 'hierarchical',
      include: ['categories', 'products', 'variants'],
      modifiedSince: mode === 'incremental' ? state.lastSyncTime : undefined,
      cursor: state.cursor
    });
    
    // Flatten hierarchical structure
    const items: any[] = [];
    
    // Categories first (parent objects)
    response.data.categories.forEach((category: any) => {
      items.push({ ...category, _objectType: 'category' });
      
      // Products under each category
      category.products?.forEach((product: any) => {
        items.push({ 
          ...product, 
          _objectType: 'product',
          _categoryId: category.id 
        });
        
        // Variants under each product
        product.variants?.forEach((variant: any) => {
          items.push({ 
            ...variant, 
            _objectType: 'variant',
            _productId: product.id,
            _categoryId: category.id
          });
        });
      });
    });
    
    return {
      items,
      nextState: {
        cursor: response.data.nextCursor,
        lastSyncTime: new Date()
      },
      hasMore: !!response.data.nextCursor
    };
  })
  
  // Category model
  .forModel('category', {
    extractItems: response => 
      response.items.filter(item => item._objectType === 'category'),
    
    mapFromApi: (item: any) => ({
      id: item.id,
      data: {
        categoryId: item.id,
        name: item.name,
        slug: item.slug,
        parentId: item.parentId
      }
    }),
    
    mapToApi: (data: any) => ({
      name: data.name,
      slug: data.slug,
      parentId: data.parentId
    }),
    
    getEndpoint: (data, operation) => ({
      path: operation === 'create' 
        ? '/api/v2/categories'
        : `/api/v2/categories/${data.categoryId}`,
      method: operation === 'delete' ? 'DELETE' : 'PUT'
    })
  })
  
  // Product model with category association
  .forModel('product', {
    extractItems: response => 
      response.items.filter(item => item._objectType === 'product'),
    
    mapFromApi: (item: any) => ({
      id: item.id,
      data: {
        productId: item.id,
        sku: item.sku,
        name: item.name,
        categoryId: item._categoryId,
        basePrice: item.price,
        active: item.status === 'active'
      }
    }),
    
    mapToApi: (data: any) => ({
      sku: data.sku,
      name: data.name,
      categoryId: data.categoryId,
      price: data.basePrice,
      status: data.active ? 'active' : 'inactive'
    }),
    
    getEndpoint: (data, operation) => ({
      path: operation === 'create'
        ? '/api/v2/products' 
        : `/api/v2/products/${data.productId}`,
      method: operation === 'delete' ? 'DELETE' : 'PUT'
    })
  })
  
  // Variant model with product association
  .forModel('variant', {
    extractItems: response => 
      response.items.filter(item => item._objectType === 'variant'),
    
    mapFromApi: (item: any) => ({
      id: item.id,
      data: {
        variantId: item.id,
        productId: item._productId,
        sku: item.sku,
        options: item.options,
        price: item.price,
        inventory: item.inventory
      }
    }),
    
    mapToApi: (data: any) => ({
      productId: data.productId,
      sku: data.sku,
      options: data.options,
      price: data.price,
      inventory: data.inventory
    }),
    
    getEndpoint: (data, operation) => ({
      path: operation === 'create'
        ? `/api/v2/products/${data.productId}/variants`
        : `/api/v2/products/${data.productId}/variants/${data.variantId}`,
      method: operation === 'delete' ? 'DELETE' : 'PUT'
    }),
    
    // Only sync variants with inventory
    shouldSync: (item: any) => item.inventory > 0
  })
  
  .build();

// Helper functions
function buildCompositeRequest(mode: string, state: any): any[] {
  const requests = [];
  const objects = ['Account', 'Contact', 'Opportunity'];
  
  objects.forEach(obj => {
    let query = `SELECT ${getFieldsForObject(obj)} FROM ${obj}`;
    if (mode === 'incremental' && state.lastSyncTime) {
      query += ` WHERE LastModifiedDate > ${state.lastSyncTime.toISOString()}`;
    }
    query += ' LIMIT 200';
    
    requests.push({
      method: 'GET',
      url: `/services/data/v58.0/query?q=${encodeURIComponent(query)}`,
      referenceId: obj
    });
  });
  
  return requests;
}

function getFieldsForObject(objectType: string): string {
  const fieldMap: Record<string, string> = {
    Account: 'Id,Name,Type,Industry,(SELECT Id FROM Contacts),(SELECT Id,IsClosed FROM Opportunities)',
    Contact: 'Id,Email,FirstName,LastName,AccountId,Title,IsPrimary__c',
    Opportunity: 'Id,Name,Amount,StageName,AccountId,CloseDate'
  };
  return fieldMap[objectType] || 'Id,Name';
}