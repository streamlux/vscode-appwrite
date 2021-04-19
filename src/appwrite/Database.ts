import { Client, Collection, CreatedCollection, CreatedRule, DatabaseClient, Rule, SDK } from "../appwrite";
import { CreateRuleWizardContext } from "../ui/createRuleWizard";
import AppwriteCall from "../utils/AppwriteCall";

const sdk: SDK = require("node-appwrite");

export class Database {
    private readonly database: DatabaseClient;

    constructor(client: Client) {
        this.database = new sdk.Database(client);
    }

    public async getCollection(collectionId: string): Promise<Collection | undefined> {
        return await AppwriteCall<Collection>(this.database.getCollection(collectionId));
    }

    public async deleteDocument(collectionId: string, documentId: string): Promise<void> {
        await AppwriteCall(this.database.deleteDocument(collectionId, documentId));
    }

    public async deleteCollection(collectionId: string): Promise<void> {
        await AppwriteCall(this.database.deleteCollection(collectionId));
    }

    public async createCollection(collection: CreatedCollection): Promise<void> {
        await AppwriteCall(
            this.database.createCollection(
                collection.name,
                collection.$permissions?.read ?? [],
                collection.$permissions?.write ?? [],
                collection.rules ?? []
            )
        );
    }

    public async updatePermissions(collection: Collection, read: string[], write: string[]): Promise<void> {
        await AppwriteCall(this.database.updateCollection(collection.$id, collection.name, read, write, collection.rules));
    }

    public async createRule(collection: Collection, newRule: CreatedRule): Promise<void> {
        await AppwriteCall(
            this.database.updateCollection(collection.$id, collection.name, collection.$permissions.read, collection.$permissions.write, [
                ...collection.rules,
                newRule,
            ])
        );
    }

    public async removeRule(collection: Collection, ruleToRemove: Rule): Promise<void> {
        const rules = collection.rules.filter((rule) => rule.$id !== ruleToRemove.$id);

        await AppwriteCall(
            this.database.updateCollection(
                collection.$id,
                collection.name,
                collection.$permissions.read,
                collection.$permissions.write,
                rules
            )
        );
    }
}
