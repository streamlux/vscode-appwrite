import { ProgressLocation, Uri, window, workspace } from "vscode";
import { functionsClient } from "../../client";
import { getTarReadStream } from "../../utils/tar";
import { ext } from "../../extensionVariables";
import * as fs from "fs";
import { TagsTreeItem } from "../../tree/functions/tags/TagsTreeItem";
import { selectWorkspaceFolder } from "../../utils/workspace";
import { ProgressMessage } from '../../utils/types';
import { Tag } from '../../appwrite';

export async function createTag(item: TagsTreeItem | Uri): Promise<void> {
    if (item instanceof Uri) {
        const tag = await window.withProgress({ location: ProgressLocation.Notification, title: "Creating tag..." }, async (progress, _token) => {
            return await createTagFromUri(item, progress);
        });
        if (tag) {
            await window.showInformationMessage(`Successfully created tag with size ${tag.size}B.`, "Execution function", "View in console");
            return;
        }
        return;
    }

    if (item instanceof TagsTreeItem) {
        const folder = await selectWorkspaceFolder("Select folder of your function code.");
        console.log(folder);
        const tag = await window.withProgress({ location: ProgressLocation.Notification, title: "Creating tag..." }, async (progress, _token) => {
            return await createTagFromUri(Uri.parse(folder), progress);
        });

        if (tag) {
            await window.showInformationMessage(`Successfully created tag with size ${tag.size}B.`);
            return;
        }
    }
}

async function createTagFromUri(uri: Uri, progress: ProgressMessage): Promise<Tag | undefined> {

    progress.report({message: "Creating tarball", increment: 10});

    if (functionsClient === undefined) {
        return;
    }

    let tarFilePath;
    try {
        tarFilePath = await getTarReadStream(uri);
    } catch (e) {
        window.showErrorMessage("Error creating tar file.\n" + e);
        return;
    }
    if (tarFilePath === undefined) {
        window.showErrorMessage("Failed to create tar file.");
        ext.outputChannel.appendLog("Failed to create tar file.");
        return;
    }
    // somehow makes the upload work
    await workspace.fs.readFile(Uri.file(tarFilePath));
    progress.report({message: "Uploading tag", increment: 60});
    try {
        return await functionsClient.createTag("60b1836a8e5d9", "python ./hello.py", fs.createReadStream(tarFilePath));
    } catch (e) {
        ext.outputChannel.appendLog("Creating tag error: " + e);
    }
}
