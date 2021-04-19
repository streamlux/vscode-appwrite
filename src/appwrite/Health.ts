import { AppwriteHealth, Client, HealthClient, SDK } from "../appwrite";
const sdk: SDK = require("node-appwrite");

export class Health {
    private readonly health: HealthClient;

    constructor(client: Client) {
        this.health = new sdk.Health(client);
    }

    /**
     * @returns The health of all Appwrite services.
     */
    public async checkup(): Promise<AppwriteHealth> {
        return {
            HTTP: await this.health.get(),
            DB: await this.health.getDB(),
            Cache: await this.health.getCache(),
            Time: await this.health.getTime(),
            QueueWebhooks: await this.health.getQueueWebhooks(),
            QueueTasks: await this.health.getQueueTasks(),
            QueueLogs: await this.health.getQueueLogs(),
            QueueUsage: await this.health.getQueueUsage(),
            QueueCertificates: await this.health.getQueueCertificates(),
            QueueFunctions: await this.health.getQueueFunctions(),
            StorageLocal: await this.health.getStorageLocal(),
            AntiVirus: await this.health.getAntiVirus(),
        };
    }
}
