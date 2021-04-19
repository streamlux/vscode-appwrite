import { Client, Collection, CreatedCollection, CreatedRule, DatabaseClient, File, FilesList, Rule, SDK, StorageClient } from "../appwrite";
import { CreateRuleWizardContext } from "../ui/createRuleWizard";
import AppwriteCall from "../utils/AppwriteCall";

const sdk: SDK = require("node-appwrite");

export class Storage {
    private readonly storage: StorageClient;

    constructor(client: Client) {
        this.storage = new sdk.Storage(client);
    }

    public async listFiles(): Promise<FilesList | undefined> {
        return await AppwriteCall(this.storage.listFiles());
    }
}
