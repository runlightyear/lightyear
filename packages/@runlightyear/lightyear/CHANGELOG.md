# @runlightyear/lightyear

## 0.38.0

### Minor Changes

- 678e207c7: Make the deployList global so it can work across different versions of the @runlightyear/lightyear package

## 0.37.0

### Minor Changes

- 2914452a6: Authorizer support
- 2914452a6: RestConnector and GraphQLConnector become abstract classes

## 0.36.1

### Patch Changes

- efed4a0c7: Added some missing exports

## 0.36.0

### Minor Changes

- 4393656c3: Support for refreshing expiring webhook subscriptions

## 0.35.0

### Minor Changes

- 6f77253ea: Support for adding descriptions to variables and secrets

### Patch Changes

- da7c9a679: Console logs arrays properly

## 0.34.0

### Minor Changes

- Added a function to check if an error is an HttpProxyResponseError

## 0.33.0

### Minor Changes

- 7469fbe82: Removed unsupported description from defineAction

## 0.32.0

### Minor Changes

- 7e667cda1: Catch unknown keys in defineAction and defineWebhook

## 0.31.0

### Minor Changes

- Improved validation of defineAction and defineWebhook

## 0.30.0

### Minor Changes

- Updated the typescript target to es2020
- Added exports for RunFunc parameters

## 0.29.0

### Minor Changes

- Updated documentation on defineAction and defineWebhook

### Patch Changes

- 862932a7: Added missing export

## 0.28.1

### Patch Changes

- Bump version to cope with npm problem

## 0.28.0

### Minor Changes

- Refactor index.ts to just use exports

## 0.27.0

### Minor Changes

- Support for debugging deployList issues

## 0.26.0

### Minor Changes

- RestConnector sets auth error after 401 response

## 0.25.0

### Minor Changes

- Support for refreshing access tokens on custom apps

## 0.24.0

### Minor Changes

- Custom apps supported

## 0.23.0

### Minor Changes

- Support for Zoom

### Patch Changes

- First version

## 0.22.0

### Minor Changes

- 44796238: Export dayjsUtc

## 0.21.0

### Minor Changes

- Added salesforce

## 0.20.1

### Patch Changes

- 820276f3: Added some debugging around action and webhook defintions

## 0.20.0

### Minor Changes

- Set variables and secrets from runs and subscribe/unsubscribes

## 0.19.0

### Minor Changes

- Updated support for GraphQL

## 0.18.0

### Minor Changes

- Support for Slack webhooks

## 0.17.2

### Patch Changes

- Added some debugging for webhooks

## 0.17.1

### Patch Changes

- Cleaned up deploy logging

## 0.17.0

### Minor Changes

- 6fb536f: Standardize on the term props for parameters passed as an object
- Support for Smtp
- 6fb536f: Migrate terminology from Oauth to OAuth
- 6fb536f: Updated documentation

## 0.16.0

### Minor Changes

- Flexibility to specify oauth token request params
- Initial support for GraphQL connectors

## 0.15.0

### Minor Changes

- 36fa04b: Support LIGHTYEAR_API_KEY environment variable

## 0.14.0

### Minor Changes

- Added support for OpenAI

## 0.13.0

### Minor Changes

- Added subscribeProps operation

## 0.12.4

### Patch Changes

- Added debug statement to display environment

## 0.12.3

### Patch Changes

- Fix bug that required all webhooks to have subscriptionProps

## 0.12.2

### Patch Changes

- Initialize the console at start of each operation

## 0.12.1

### Patch Changes

- Export SKIPPED for run functions to throw when necessary

## 0.12.0

### Minor Changes

- Support for skipping runs

## 0.11.0

### Minor Changes

- Improvements to logging

## 0.10.1

### Patch Changes

- Fixed bug with defineWebhook props

## 0.10.0

### Minor Changes

- Support for webhook subscriptions

## 0.9.0

### Minor Changes

- Require title on defineWebhook

## 0.8.0

### Minor Changes

- Updated support for webhooks

## 0.7.0

### Minor Changes

- New specification of apps, variables, and secrets

## 0.6.0

### Minor Changes

- Temporarily disable some deploy features while we iterate on the app

## 0.5.0

### Minor Changes

- Updated oauth2 support to work with new app

## 0.4.0

### Minor Changes

- Added required title to defineAction

## 0.3.0

### Minor Changes

- Updated terminology

## 0.2.0

### Minor Changes

- Updates to work with new production version of lightyear

## 0.1.1

### Patch Changes

- Updated README

## 0.1.0

### Minor Changes

- Initial version
