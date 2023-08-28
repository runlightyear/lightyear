# @runlightyear/cli

## 0.27.3

### Patch Changes

- 164319917: Removed some redundant logs
- a8f99cf36: Fix bug with not setting endedAt for deploys triggered by resubscribe
- Updated dependencies [7e667cda1]
  - @runlightyear/lightyear@0.32.0

## 0.27.2

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.31.0

## 0.27.1

### Patch Changes

- Fix bug with production url for authorizing the presence channel

## 0.27.0

### Minor Changes

- Support for dev server presence

## 0.26.0

### Minor Changes

- Provide start and end times for subscription activities run in dev

## 0.25.1

### Patch Changes

- Remove trailing '/' when opening browser to log in

## 0.25.0

### Minor Changes

- Updated the typescript target to es2020

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @runlightyear/lightyear@0.30.0

## 0.24.6

### Patch Changes

- Updated dependencies
- Updated dependencies [862932a7]
  - @runlightyear/lightyear@0.29.0

## 0.24.5

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.28.1

## 0.24.4

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.28.0

## 0.24.3

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.27.0

## 0.24.2

### Patch Changes

- Add additional debugging statements for deploy

## 0.24.1

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.26.0

## 0.24.0

### Minor Changes

- Support for refreshing access tokens on custom apps

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.25.0

## 0.23.0

### Minor Changes

- Custom apps supported

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.24.0

## 0.22.1

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @runlightyear/lightyear@0.23.0

## 0.22.0

### Minor Changes

- e3fe177d: Better support for subscribe/unsubscribe

## 0.21.0

### Minor Changes

- Support for deploy and run timing

## 0.20.2

### Patch Changes

- Updated dependencies [44796238]
  - @runlightyear/lightyear@0.22.0

## 0.20.1

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.21.0

## 0.20.0

### Minor Changes

- Run VM operations sequentially to prevent runs from clobbering each other

## 0.19.7

### Patch Changes

- Updated dependencies [820276f3]
  - @runlightyear/lightyear@0.20.1

## 0.19.6

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.20.0

## 0.19.5

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.19.0

## 0.19.4

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.18.0

## 0.19.3

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.17.2

## 0.19.2

### Patch Changes

- Cleaned up deploy logging
- Updated dependencies
  - @runlightyear/lightyear@0.17.1

## 0.19.1

### Patch Changes

- Clean up deploy log output

## 0.19.0

### Minor Changes

- Build locally for production deploy

## 0.18.0

### Minor Changes

- Clean up the commands and add our ASCII logo to the help screen

## 0.17.1

### Patch Changes

- Fixed: CLI terminates after some compilation errors

## 0.17.0

### Minor Changes

- Added separate "signup" command to reduce confusion with "login"

## 0.16.2

### Patch Changes

- Updated dependencies [6fb536f]
- Updated dependencies
- Updated dependencies [6fb536f]
- Updated dependencies [6fb536f]
  - @runlightyear/lightyear@0.17.0

## 0.16.1

### Patch Changes

- Updated dependencies
- Updated dependencies
  - @runlightyear/lightyear@0.16.0

## 0.16.0

### Minor Changes

- Improvements to webhook subscriptions

## 0.15.3

### Patch Changes

- Get rid of unnecessary log message

## 0.15.2

### Patch Changes

- 9602aa0: Fixed a log message

## 0.15.1

### Patch Changes

- Fixed error with git configuration during create

## 0.15.0

### Minor Changes

- 776bbb7: Support for new LIGHTYEAR_API_KEY env var
- bfbe1ae: Make git setup during create cross-platform

### Patch Changes

- 7969ef4: Added url for dashboard after first deploy
- Updated dependencies [36fa04b]
  - @runlightyear/lightyear@0.15.0

## 0.14.1

### Patch Changes

- Fixed typo

## 0.14.0

### Minor Changes

- Disconnect the cloned repo from the template during create

## 0.13.2

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.14.0

## 0.13.1

### Patch Changes

- Fix bug with handling manual resubscribes

## 0.13.0

### Minor Changes

- Added subscribeProps operation

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.13.0

## 0.12.1

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.12.4

## 0.12.0

### Minor Changes

- Support for resubscribe

## 0.11.1

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.12.3

## 0.11.0

### Minor Changes

- Added a --debug flag and cleaned up logging on production deploys

## 0.10.2

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.12.2

## 0.10.1

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.12.1

## 0.10.0

### Minor Changes

- Support for skipping runs

### Patch Changes

- Cleaned up most remaining logging issues
- Updated dependencies
  - @runlightyear/lightyear@0.12.0

## 0.9.0

### Minor Changes

- Improvements to logging

### Patch Changes

- Updated dependencies
  - @runlightyear/lightyear@0.11.0

## 0.8.0

### Minor Changes

- Support for webhook subscriptions
- Dev server improvements

## 0.7.1

### Patch Changes

- Fixed bug preventing login from working when already logged in

## 0.7.0

### Minor Changes

- Login works with new urls

## 0.6.0

### Minor Changes

- Deployment fixes

## 0.5.0

### Minor Changes

- Updated to work with new pusher events

## 0.4.1

### Patch Changes

- Fixed bug with terminology

## 0.4.0

### Minor Changes

- Upload logs from local deploys and runs

## 0.3.0

### Minor Changes

- Updates to work with new production version of lightyear

## 0.2.0

### Minor Changes

- Login command works with new production framework

## 0.1.1

### Patch Changes

- Updated README

## 0.1.0

### Minor Changes

- Initial version
