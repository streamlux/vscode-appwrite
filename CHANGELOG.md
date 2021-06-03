# Change Log

All notable changes to the "vscode-appwrite" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## Added
Ability to set the `list`, `default` and `array` properties when creating a new collection. | [Issue #20](https://github.com/streamlux/vscode-appwrite/issues/20) | [PR #21](https://github.com/streamlux/vscode-appwrite/pull/21) | Thanks [@Maatteogekko](https://github.com/Maatteogekko)!

## [0.1.1] - 2021-5-31
## Added
- You can now easily create function tags from multiple places in the extension. [PR #19](https://github.com/streamlux/vscode-appwrite/pull/19)

## Fixed
- Fixed an error when deleting a user. [Issue #17](https://github.com/streamlux/vscode-appwrite/issues/17) [PR #18](https://github.com/streamlux/vscode-appwrite/pull/18) Thanks [@aadarshadhakalg](https://github.com/aadarshadhakalg)!

## [0.1.0] - 2021-5-29

## Functions!
### Added
- Ability to create and delete Appwrite functions
- Edit function settings
- View, and delete tags (creating tags is broken currently)
- Create and view function executions
- View execution output and errors

## [0.0.9] - 2021-5-21
- Remove temporary fix for Appwrite https://github.com/appwrite/appwrite/issues/1171. Upstream issue was resolved.

## [0.0.8] - 2021-5-21
- Temp fix for Appwrite https://github.com/appwrite/appwrite/issues/1171

## [0.0.7] - 2021-5-14
### Fixed
- Fixed a bug where the password validation for creating a new user did not follow the Appwrite spec. [Issue](https://github.com/streamlux/vscode-appwrite/issues/11)
- Show nicer message when Appwrite project can't be found. [Issue](https://github.com/streamlux/vscode-appwrite/pull/14)

## [0.0.6] - 2021-4-30
### Fixed
- Fixed a bug where the extension could not connect to Appwrite instances over localhost beacuse of self-signed certificates.

## [0.0.5] - 2021-4-30
### Fixed
- Sometimes views would not refresh after adding/removing a project [PR](https://github.com/streamlux/vscode-appwrite/pull/7)

## [0.0.4] - 2021-4-30

### Fixed
- Hotfix

## [0.0.3] - 2021-4-30

### Fixed
- Errors when user has no projects

## [0.0.2] - 2021-4-30

### Added
- Projects view
- Ability to set active project
- Refresh storage command


## [0.0.1] - 2021-4-29

- Initial release
- View and manage collections and documents
- View and manage users
- Monitor Appwrite health
- View files in storage
