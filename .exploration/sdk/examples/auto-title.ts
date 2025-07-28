import { defineModel, defineCollection, match } from '../builders';
import { getDisplayTitle } from '../utils';

/**
 * Examples showing automatic title generation
 */

// Simple names - title auto-generated as capitalized version
const customerModel = defineModel('customer')
  .withMatchPattern('email')
  .build();
// title will be "Customer" when displayed

const orderModel = defineModel('order')
  .withMatchPattern('orderId')
  .build();
// title will be "Order" when displayed

// Complex names need explicit titles
const inStoreOrderModel = defineModel('in_store_order')
  .withTitle('In-Store Order')
  .withMatchPattern('orderId')
  .build();

// Collections work the same way
const contactsCollection = defineCollection('contacts')
  .addModel('customer', {
    matchPattern: 'email'
  })
  .addModel('lead', {
    matchPattern: 'phone'
  })
  .build();
// collection title will be "Contacts"
// model titles will be "Customer" and "Lead"

// With explicit titles where needed
const ordersCollection = defineCollection('orders')
  .withTitle('Order Management')
  .addModel('online_order', {
    title: 'Online Order',
    matchPattern: 'orderId'
  })
  .addModel('in_store_order', {
    title: 'In-Store Order',
    matchPattern: match.and('orderId', 'storeId')
  })
  .addModel('subscription', {  // No title provided
    matchPattern: 'subscriptionId'
  })
  .build();
// collection title is "Order Management" (explicit)
// "online_order" title is "Online Order" (explicit)
// "in_store_order" title is "In-Store Order" (explicit)
// "subscription" title will be "Subscription" (auto-generated)

// Demonstrating the utility function
console.log(getDisplayTitle('customer')); // "Customer"
console.log(getDisplayTitle('in_store_order')); // "In Store Order"
console.log(getDisplayTitle('vip-customer')); // "Vip Customer"
console.log(getDisplayTitle('customer', 'Valued Customer')); // "Valued Customer"