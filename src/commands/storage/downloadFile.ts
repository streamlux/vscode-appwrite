import { ProgressLocation, Uri, window, workspace } from "vscode";
import { storageClient } from "../../client";
import * as fs from "fs";
import { FileTreeItem } from "../../tree/storage/FileTreeItem";
import downloadsFolder = require("downloads-folder");
import { File } from "../../appwrite";
import { ProgressMessage } from "../../utils/types";
import { CancellationToken } from "vscode";

export async function downloadFile(item: FileTreeItem | File): Promise<void> {
    const file = item instanceof FileTreeItem ? item.file : item;

    const data = await window.withProgress(
        { location: ProgressLocation.Notification, title: `Downloading ${file.name}`, cancellable: false },
        async (progress: ProgressMessage, _token: CancellationToken): Promise<Buffer> => {
            const data = await storageClient?.getFileDownload(file.$id);
            progress.report({ message: "Download finished" });
            return data;
        }
    );

    const defaultUriBase = workspace.workspaceFolders?.[0].uri ?? Uri.parse(downloadsFolder());
    const defaultUri = Uri.joinPath(defaultUriBase, file.name);

    const destination = await window.showSaveDialog({ saveLabel: "Save", title: file.name, defaultUri });
    if (data && destination) {
        await fs.promises.writeFile(destination.fsPath, data);
    }
}
