import type { SDK } from './appwrite';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const AppwriteSDK: SDK = require('node-appwrite') as SDK;
