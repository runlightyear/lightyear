# Step 2 - Understand the Repo

## Check out the folder structure

Open up the `my-integrations` repo with your IDE and familiarize yourself with the key files in the directory structure.

    .
    ├── ...
    ├── src
    │   ├── index.js
    │   └── tasks
    │       ├── helloToSlack.js
    │       ├── helloWorld.js
    │       ├── webhookToSlack.js
    └── ...

## Control which tasks are deployed in `src/index.js`

If you take a look at `src/index.js`, you can see each of the files in task is referenced, but most are commented out.

```typescript
import "./tasks/helloWorld";
// import "./tasks/helloToSlack";
// import "./tasks/webhookToSlack";
```

Since `helloWorld` is the only one linked, it will be the only task deployed for now.

## Look at `src/tasks/helloWorld`

If you examine the code, you can see it simply prints out Hello World! to the console. 

```typescript
import { defineTask } from "@bigidea/integration";

defineTask({
  name: "helloWorld",
  run: async () => {
    console.log("Hello World!");
  },
});
```

Not much of an integration, but it's a start to help you understand the platform.

## Update the message

For fun, let's update the message to something new.

```typescript
import { defineTask } from "@bigidea/integration";

defineTask({
  name: "helloWorld",
  run: async () => {
    // highlight-next-line
    console.log("Hello World! Nice to meet you!");
  },
});
```
