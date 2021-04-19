import { Client, SDK } from "./appwrite";
import { Database } from "./appwrite/Database";
import { Health } from "./appwrite/Health";
import { Storage } from "./appwrite/Storage";
import { Users } from "./appwrite/Users";
import { AppwriteProjectConfiguration } from "./settings";

const sdk: SDK = require("node-appwrite");

export let client: Client;
export let clientConfig: { endpoint: string; projectId: string; secret: string };
export let usersClient: Users;
export let healthClient: Health;
export let databaseClient: Database;
export let storageClient: Storage;

export function initAppwriteClient({ endpoint, projectId, secret }: AppwriteProjectConfiguration) {
    client = new sdk.Client();
    clientConfig = { endpoint, projectId, secret };
    client.setEndpoint(endpoint).setProject(projectId).setKey(secret);

    usersClient = new Users(client);
    healthClient = new Health(client);
    databaseClient = new Database(client);
    storageClient = new Storage(client);

    return client;
}
