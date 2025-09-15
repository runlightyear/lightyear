import { defineIntegration } from '../integration-builder-final';
import { IntegrationBuilder, IntegrationNameBuilder, createIntegration } from '../integration-builder-typed';
import { defineCollection } from '../builders';
import { defineCustomApp } from '../app-builder';

/**
 * Comparing different approaches to enforcing required app configuration
 */

// Current approach - Runtime error
const integration1 = defineIntegration('my_integration')
  .withTitle('My Integration')
  .withCollections({
    data: defineCollection('data').build()
  })
  .build(); // ❌ Runtime error: "Integration requires an app"

// Option 1: Type-safe builder with branded types
const builder = new IntegrationBuilder('my_integration')
  .withTitle('My Integration')
  .withCollections({
    data: defineCollection('data').build()
  });
// builder.build(); // ❌ TypeScript error: Property 'build' does not exist

const integration2 = new IntegrationBuilder('my_integration')
  .withApp('salesforce') // Returns IntegrationBuilder<true>
  .withCollections({
    data: defineCollection('data').build()
  })
  .build(); // ✅ Now build() is available

// Option 2: Separate steps pattern (most explicit)
const integration3 = new IntegrationNameBuilder('my_integration')
  .withApp('salesforce') // Must choose app to proceed
  .withTitle('My Integration')
  .withCollections({
    data: defineCollection('data').build()
  })
  .build(); // ✅ Works

// Can't skip the app step:
// new IntegrationNameBuilder('my_integration')
//   .withTitle('...') // ❌ TypeScript error: withTitle doesn't exist on IntegrationNameBuilder

// Option 3: Configuration object (simplest)
const integration4 = createIntegration({
  name: 'my_integration',
  app: 'salesforce', // ✅ Required by TypeScript
  title: 'My Integration',
  collections: {
    data: defineCollection('data').build()
  }
});

// Missing app:
// const integration5 = createIntegration({
//   name: 'my_integration',
//   // ❌ TypeScript error: Property 'app' is missing
//   title: 'My Integration'
// });

// Trade-offs:
// - Current: Simple API, runtime validation only
// - Option 1: Type-safe, but uses advanced TypeScript
// - Option 2: Most explicit about required steps, but more classes
// - Option 3: Simplest, but loses the builder pattern