import { Uri } from "vscode";
import { functionsClient, storageClient } from "../../client";
import { getTarReadStream } from "../../utils/tar";
import { ext } from "../../extensionVariables";
import * as fs from "fs";
export async function createTag(folder: Uri): Promise<void> {
    const tarFilePath = await getTarReadStream(folder);
    if (functionsClient === undefined) {
        return;
    }

    if (tarFilePath === undefined) {
        ext.outputChannel.appendLog("Error creating tar file.");
        return;
    }
    try {
        await functionsClient.createTag("60b1836a8e5d9", "python ./hello.py", fs.createReadStream(tarFilePath));
        await storageClient?.createFile(fs.createReadStream(tarFilePath));
    } catch (e) {
        ext.outputChannel.appendLog("Creating tag error: " + e);
    }
}
