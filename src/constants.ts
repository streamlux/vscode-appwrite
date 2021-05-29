import type { SDK } from "./appwrite";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const AppwriteSDK: SDK = require("node-appwrite") as SDK;

export const appwriteSystemEvents = [
    {
        name: "account.create",
        description: "This event triggers when the account is created.",
    },
    {
        name: "account.update.email",
        description: "This event triggers when the account email address is updated.",
    },
    {
        name: "account.update.name",
        description: "This event triggers when the account name is updated.",
    },
    {
        name: "account.update.password",
        description: "This event triggers when the account password is updated.",
    },
    {
        name: "account.update.prefs",
        description: "This event triggers when the account preferences are updated.",
    },
    {
        name: "account.recovery.create",
        description: "This event triggers when the account recovery token is created.",
    },
    {
        name: "account.recovery.update",
        description: "This event triggers when the account recovery token is validated.",
    },
    {
        name: "account.verification.create",
        description: "This event triggers when the account verification token is created.",
    },
    {
        name: "account.verification.update",
        description: "This event triggers when the account verification token is validated.",
    },
    {
        name: "account.delete",
        description: "This event triggers when the account is deleted.",
    },
    {
        name: "account.sessions.create",
        description: "This event triggers when the account session is created.",
    },
    {
        name: "account.delete",
        description: "This event triggers when the account is deleted.",
    },
    {
        name: "account.sessions.create",
        description: "This event triggers when the account session is created.",
    },
    {
        name: "account.sessions.delete",
        description: "This event triggers when the account session is deleted.",
    },
    {
        name: "database.collections.create",
        description: "This event triggers when a database collection is created.",
    },
    {
        name: "database.collections.update",
        description: "This event triggers when a database collection is updated.",
    },
    {
        name: "database.collections.delete",
        description: "This event triggers when a database collection is deleted.",
    },
    {
        name: "database.documents.create",
        description: "This event triggers when a database document is created.",
    },
    {
        name: "database.documents.update",
        description: "This event triggers when a database document is updated.",
    },
    {
        name: "database.documents.delete",
        description: "This event triggers when a database document is deleted.",
    },
    {
        name: "functions.create",
        description: "This event triggers when a function is created.",
    },
    {
        name: "functions.update",
        description: "This event triggers when a function is updated.",
    },
    {
        name: "functions.delete",
        description: "This event triggers when a function is deleted.",
    },
    {
        name: "functions.tags.create",
        description: "This event triggers when a function tag is created.",
    },
    {
        name: "functions.tags.update",
        description: "This event triggers when a function tag is updated.",
    },
    {
        name: "functions.tags.delete",
        description: "This event triggers when a function tag is deleted.",
    },
    {
        name: "functions.executions.create",
        description: "This event triggers when a function execution is created.",
    },
    {
        name: "functions.executions.update",
        description: "This event triggers when a function execution is updated.",
    },
    {
        name: "storage.files.create",
        description: "This event triggers when a storage file is created.",
    },
    {
        name: "storage.files.update",
        description: "This event triggers when a storage file is updated.",
    },
    {
        name: "storage.files.delete",
        description: "This event triggers when a storage file is deleted.",
    },
    {
        name: "users.create",
        description: "This event triggers when a user is created from the users API.",
    },
    {
        name: "users.update.prefs",
        description: "This event triggers when a user preference is updated from the users API.",
    },
    {
        name: "users.update.status",
        description: "This event triggers when a user status is updated from the users API.",
    },
    {
        name: "users.delete",
        description: "This event triggers when a user is deleted from users API.",
    },
    {
        name: "users.sessions.delete",
        description: "This event triggers when a user session is deleted from users API.",
    },
    {
        name: "teams.create",
        description: "This event triggers when a team is created.",
    },
    {
        name: "teams.update",
        description: "This event triggers when a team is updated.",
    },
    {
        name: "teams.delete",
        description: "This event triggers when a team is deleted.",
    },
    {
        name: "teams.memberships.create",
        description: "This event triggers when a team memberships is created.",
    },
    {
        name: "teams.memberships.update",
        description: "This event triggers when a team membership is updated.",
    },
    {
        name: "teams.memberships.update.status",
        description: "This event triggers when a team memberships status is updated.",
    },
    {
        name: "teams.memberships.delete",
        description: "This event triggers when a team memberships is deleted.",
    },
];

export const appwriteFunctionRuntimes = [
    "dotnet-3.1",
    "dotnet-5.0",
    "dart-2.10",
    "dart-2.12",
    "deno-1.5",
    "deno-1.6",
    "deno-1.8",
    "python-3.8",
    "python-3.9",
    "ruby-2.7",
    "ruby-3.0",
    "php-7.4",
    "php-8.0",
    "node-14.5",
    "node-15.5",
];
