import { MarkdownString } from 'vscode';
import { AppwriteHealth, Client, HealthClient } from "../appwrite";
import { AppwriteSDK } from '../constants';
export class Health {
    private readonly health: HealthClient;

    constructor(client: Client) {
        this.health = new AppwriteSDK.Health(client);
    }

    /**
     * @returns The health of all Appwrite services.
     */
    public async checkup(): Promise<Partial<AppwriteHealth>> {
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

export const healthTooltips: Record<keyof AppwriteHealth, string | MarkdownString | undefined> = {
    HTTP: "Check the Appwrite HTTP server is up and responsive.",
    DB: "Check the Appwrite in-memory cache server is up and connection is successful.",
    Cache: "Check the Appwrite in-memory cache server is up and connection is successful.",
    Time:
        new MarkdownString("Check the Appwrite server time is synced with Google remote NTP server. We use this technology to smoothly handle leap seconds with no disruptive events. The [Network Time Protocol (NTP)](https://en.wikipedia.org/wiki/Network_Time_Protocol) is used by hundreds of millions of computers and devices to synchronize their clocks over the Internet. If your computer sets its own clock, it likely uses NTP."),
    QueueWebhooks: "The number of webhooks that are waiting to be processed in the Appwrite internal queue server.",
    QueueTasks: "The number of tasks that are waiting to be processed in the Appwrite internal queue server.",
    QueueLogs: "The number of logs that are waiting to be processed in the Appwrite internal queue server.",
    QueueUsage: "The number of usage stats that are waiting to be processed in the Appwrite internal queue server.",
    QueueCertificates:
        new MarkdownString("The number of certificates that are waiting to be issued against [Letsencrypt](https://letsencrypt.org/) in the Appwrite internal queue server."),
    QueueFunctions: "The number of functions waiting to be executed.",
    StorageLocal: "Check the Appwrite local storage device is up and connection is successful.",
    AntiVirus: "Check the Appwrite Anti Virus server is up and connection is successful.",
};
