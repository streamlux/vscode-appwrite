import { ProgressLocation, Uri, window } from "vscode";
import { functionsClient, storageClient } from "../../client";
import { getTarReadStream } from "../../utils/tar";
import { ext } from "../../extensionVariables";
import * as fs from "fs";
import { TagsTreeItem } from "../../tree/functions/tags/TagsTreeItem";
import { selectWorkspaceFolder } from "../../utils/workspace";
export async function createTag(item: TagsTreeItem | Uri): Promise<void> {
    if (item instanceof Uri) {
        window.withProgress({ location: ProgressLocation.Notification, title: "Creating tag..." }, async (progress, token) => {
            await createTagFromUri(item);
        });
        return;
    }

    if (item instanceof TagsTreeItem) {
        const folder = await selectWorkspaceFolder("Select folder of your function code.");
        console.log(folder);
        window.withProgress({ location: ProgressLocation.Notification, title: "Creating tag..." }, async (progress, token) => {
            await createTagFromUri(Uri.parse(folder));
        });
    }
}

async function createTagFromUri(uri: Uri): Promise<void> {
    const tarFilePath = await getTarReadStream(uri);
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
