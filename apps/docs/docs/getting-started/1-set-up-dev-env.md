import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Step 1 - Set Up Dev Env

## System Requirements

* [Node](https://nodejs.org/en/) v14.20, v16.17, or greater (check with `node --version`)
* [Git](https://git-scm.com/)

## Getting Started

### Create your project

Use the command line to create a project directory based on our template. We'll use the name `my-integrations` and refer to it throughout this tutorial, but feel free to use any name you like.

```shell
npx @bigidea/cli create my-integrations
```

### Install dependencies
Change to the new project directory and use install the project packages using your favorite package manager.

<Tabs>
  <TabItem value="npm" label="npm" default>

```shell
npm install
```

  </TabItem>
  <TabItem value="yarn" label="yarn" default>

```shell
yarn install
```

  </TabItem>
</Tabs>


### Authenticate 

<Tabs>
  <TabItem value="npm" label="npm" default>

Sign up or sign in to the platform using the command line and choose whether to create a new account or use an existing one.

```shell
npx integration login
```

This will create a `.env` file in your project root with your credentials.

  </TabItem>
  <TabItem value="yarn" label="yarn" default>

Sign up or sign in to the platform using the command line and choose whether to create a new account or use an existing one.

```shell
yarn integration login
```

This will create a `.env` file in your project root with your credentials.

  </TabItem>
  <TabItem value="manual" label="Manual" default>

#### Create a .env file

You need to store a dev api key to connect your local environment to your online dev environment. 

Create a file named `.env` at the root level of your new project and set its contents to the [values you find on this page](https://integration.bigidea.io/prototype/integrations/envs/dev/setup).


  </TabItem>
</Tabs>


### Run the development server

<Tabs>
  <TabItem value="npm" label="npm" default>

```shell
npm run dev
```

  </TabItem>
  <TabItem value="yarn" label="yarn" default>

```shell
yarn dev
```

  </TabItem>
</Tabs>

The server will automatically deploy your integrations whenever you make changes to the source code.