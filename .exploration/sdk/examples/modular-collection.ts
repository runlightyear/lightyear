import { defineModel, defineCollection, match } from '../builders';

/**
 * Example: Building models separately and composing them into collections
 */

// Define individual models that can be reused across collections
export const customerModel = defineModel('customer')
  .withSchema({
    type: 'object',
    properties: {
      id: { type: 'string' },
      email: { type: 'string', format: 'email' },
      customerId: { type: 'string' },
      company: { 
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' }
        }
      }
    },
    required: ['id', 'email']
  })
  .withMatchPattern(
    match.or(
      'email',
      'customerId',
      match.jsonPath('.company.id')
    )
  )
  .build();

export const leadModel = defineModel('lead')
  .withSchema({
    type: 'object',
    properties: {
      id: { type: 'string' },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string' },
      source: { type: 'string' },
      contact: {
        type: 'object',
        properties: {
          phone: { type: 'string' }
        }
      }
    }
  })
  .withMatchPattern(
    match.and(
      'email',
      match.or('phone', match.jsonPath('.contact.phone'))
    )
  )
  .build();

export const genericContactModel = defineModel('contact')
  .withMatchPattern('email')
  .build();

// Compose models into a collection - order matters!
export const contactsCollection = defineCollection('contacts', 'Contact Management')
  .withModels([
    customerModel,      // Highest precedence
    leadModel,          // Second precedence
    genericContactModel // Catch-all
  ])
  .build();

// Alternative: Add models one by one
export const alternativeContactsCollection = defineCollection('contacts', 'Contact Management')
  .withModel(customerModel)
  .withModel(leadModel)
  .withModel(genericContactModel)
  .build();

// Example: Reusing models in different collections
export const vipContactsCollection = defineCollection('vip_contacts')
  .withTitle('VIP Contact Management')
  .withModel(
    defineModel('vip_customer')
      .withTitle('VIP Customer')
      .withSchema({
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          vipStatus: { type: 'string', enum: ['gold', 'platinum', 'diamond'] },
          customerId: { type: 'string' }
        },
        required: ['id', 'email', 'vipStatus']
      })
      .withMatchPattern(
        match.and(
          match.or('email', 'customerId'),
          'vipStatus'
        )
      )
      .build()
  )
  .withModel(customerModel) // Reuse existing model
  .build();