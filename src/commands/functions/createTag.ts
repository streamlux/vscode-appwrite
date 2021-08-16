/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProgressLocation, QuickPickItem, Uri, window, workspace } from "vscode";
import { functionsClient } from "../../client";
import { getTarReadStream } from "../../utils/tar";
import { ext } from "../../extensionVariables";
import * as path from "path";
import * as fs from "fs";
import { TagsTreeItem } from "../../tree/functions/tags/TagsTreeItem";
import { selectWorkspaceFolder } from "../../utils/workspace";
import { ProgressMessage } from "../../utils/types";
import { Tag } from "../../appwrite";
import { activateTag } from "./activateTag";
import { execSync } from "child_process";
export async function createTag(item?: TagsTreeItem | Uri): Promise<void> {
    if (item instanceof Uri) {
        const functions = await functionsClient?.list();
        if (functions === undefined) {
            return;
        }
        const pick = await window.showQuickPick(
            functions.functions.map<QuickPickItem>(
                (func): QuickPickItem => ({ label: func.name, description: func.env, detail: func.$id })
            ),
            { placeHolder: "Select a function to create tag" }
        );
        if (pick === undefined || pick.detail === undefined) {
            return;
        }
        const tags = await functionsClient?.listTags(pick.detail);
        let value;
        if (tags && tags.tags.length > 0) {
            value = tags.tags[tags.tags.length - 1].command;
        }
        const command = await window.showInputBox({ value, prompt: "Command to run your code" });
        if (command === undefined) {
            return;
        }
        const tag = await window.withProgress(
            { location: ProgressLocation.Notification, title: "Creating tag..." },
            async (progress, _token) => {
                if (pick.detail === undefined) {
                    return;
                }
                return await createTagFromUri(pick.detail, command, item.path, progress, false);
            }
        );
        if (tag) {
            await tagNotification(tag);
        }

        return;
    }

    if (item instanceof TagsTreeItem) {
        const func = item.parent.func;
        const folder = await selectWorkspaceFolder("Select folder of your function code.");
        if (folder === undefined || folder === "") {
            return;
        }
        const tags = await functionsClient?.listTags(func.$id);
        let value;
        if (tags && tags.tags.length > 0) {
            value = tags.tags[tags.tags.length - 1].command;
        }
        const command = await window.showInputBox({ value, prompt: "Command to run your code" });
        const commaasdsdnd = await window.showInputBox({ value, prompt: folder });
        if (command === undefined) {
            return;
        }
        // there is a  special way to publishing a tag for .net5.0
        const envPick = await window.showQuickPick(
            [".net5.0", "other"],
            { placeHolder: "Select env" }
        );
        let customTarCreation = false;
        try {
            if (envPick === ".net5.0") {
                const comm = "dotnet publish --runtime linux-x64 --framework net5.0 --no-self-contained " + folder;
                const result = execSync(comm);
                if (fs.statSync(folder + "/bin/Debug/net5.0/linux-x64/")) {
                    customTarCreation = true;
                }
            }
        } catch (error) {
            window.showErrorMessage("Error publishing .net archive.\n" + error);
        }

        const tag = await window.withProgress(
            { location: ProgressLocation.Notification, title: "Creating tag..." },
            async (progress, _token) => {
                return await createTagFromUri(func.$id, command, folder, progress, customTarCreation);
            }
        );

        if (tag) {
            await tagNotification(tag);
            return;
        }
    }

    if (item === undefined) {
        const functions = await functionsClient?.list();
        if (functions === undefined) {
            return;
        }
        const pick = await window.showQuickPick(
            functions.functions.map<QuickPickItem>(
                (func): QuickPickItem => ({ label: func.name, description: func.env, detail: func.$id })
            ),
            { placeHolder: "Select a function to create tag" }
        );
        if (pick === undefined || pick.detail === undefined) {
            return;
        }
        const funcId = pick.detail;
        const folder = await selectWorkspaceFolder("Select folder of your function code.");
        const tags = await functionsClient?.listTags(funcId);
        let value;
        if (tags && tags.tags.length > 0) {
            value = tags.tags[tags.tags.length - 1].command;
        }
        const command = await window.showInputBox({ value, prompt: "Command to run your code" });
        if (command === undefined) {
            return;
        }

        const tag = await window.withProgress(
            { location: ProgressLocation.Notification, title: "Creating tag..." },
            async (progress, _token) => {
                return await createTagFromUri(funcId, command, folder, progress, false);
            }
        );

        if (tag) {
            await tagNotification(tag);
            return;
        }
    }
}

async function createTagFromUri(functionId: string, command: string, uri: string, progress: ProgressMessage, customTarCreation: boolean): Promise<Tag | undefined> {
    progress.report({ message: "Creating tarball", increment: 10 });

    if (functionsClient === undefined) {
        return;
    }

    let tarFilePath;
    try {
        if (customTarCreation === false) {
            tarFilePath = await getTarReadStream(Uri.parse(uri));
        }
        else {
            const comm = "tar -C " + uri + "/bin/Debug/net5.0/linux-x64 -zcvf" + uri + "/code.tar.gz publish";
            const result = execSync(comm);
            if (fs.statSync(uri + "code.tar.gz")) {

                window.showInformationMessage("udalo sie");

            } else {
                window.showErrorMessage("Error creating tar file.\n");

            }
        }
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
    progress.report({ message: "Uploading tag", increment: 60 });
    try {
        return await functionsClient.createTag(functionId, command, fs.createReadStream(tarFilePath));
    } catch (e) {
        ext.outputChannel.appendLog("Creating tag error: " + e);
    }
}

async function tagNotification(tag: Tag): Promise<void> {
    ext.tree?.functions?.refresh();
    if (tag) {
        const action = await window.showInformationMessage(
            `Successfully created tag with size ${tag.size}B.`,
            "Activate tag",
            "View in console"
        );
        if (action === "Activate tag") {
            await activateTag(tag);
        }
        if (action === "View in console") {
            //
        }
        return;
    }
}
