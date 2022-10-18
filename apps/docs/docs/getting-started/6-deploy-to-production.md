import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Step 6 - Deploy to Production

You can use the command line to push your integrations to production once you are ready.

## Run the deploy command

<Tabs>
  <TabItem value="npm" label="npm" default>

```shell
npm run deploy
```

  </TabItem>
  <TabItem value="yarn" label="yarn" default>

```shell
yarn deploy
```

  </TabItem>
</Tabs>


## Verify the deploy worked

In order to verify that the deploy worked, you can switch to your production environment

![Slack webhook displayed](./img/deploy-to-production-1.png)

and you should be able to see all the tasks.

![Slack webhook displayed](./img/deploy-to-production-2.png)

Note that any webhook urls will be different from the their counterparts in the development environment.