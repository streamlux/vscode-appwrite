import { Client } from "./appwrite";
import { Database } from "./appwrite/Database";
import { Health } from "./appwrite/Health";
import { Storage } from "./appwrite/Storage";
import { Users } from "./appwrite/Users";
import { AppwriteSDK } from "./constants";
import { AppwriteProjectConfiguration } from "./settings";

export let client: Client;
export let clientConfig: { endpoint: string; projectId: string; secret: string };
export let usersClient: Users | undefined;
export let healthClient: Health | undefined;
export let databaseClient: Database | undefined;
export let storageClient: Storage | undefined;

function initAppwriteClient({ endpoint, projectId, secret, selfSigned }: AppwriteProjectConfiguration) {
    client = new AppwriteSDK.Client();
    clientConfig = { endpoint, projectId, secret };
    client.setEndpoint(endpoint).setProject(projectId).setKey(secret).setSelfSigned(selfSigned);

    usersClient = new Users(client);
    healthClient = new Health(client);
    databaseClient = new Database(client);
    storageClient = new Storage(client);

    return client;
}

export function createAppwriteClient(config?: AppwriteProjectConfiguration): void {
    if (config) {
        initAppwriteClient(config);
        return;
    }

    usersClient = undefined;
    healthClient = undefined;
    databaseClient = undefined;
    storageClient = undefined;
}
