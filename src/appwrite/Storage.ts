import { ReadStream } from 'node:fs';
import { Client, FilesList, StorageClient } from "../appwrite";
import { AppwriteSDK } from '../constants';
import AppwriteCall from "../utils/AppwriteCall";

export class Storage {
    private readonly storage: StorageClient;

    constructor(client: Client) {
        this.storage = new AppwriteSDK.Storage(client);
    }

    public async listFiles(): Promise<FilesList | undefined> {
        return await AppwriteCall(this.storage.listFiles());
    }

    public async createFile(file: ReadStream): Promise<void> {
        return await AppwriteCall(this.storage.createFile(file));
    }
}
