import { window } from "vscode";
import { storageClient } from "../../client";
import * as fs from "fs";

export async function uploadFile(): Promise<void> {
    try {
        const file = await window.showOpenDialog({ canSelectFiles: true, canSelectFolders: false, canSelectMany: false });
        if (file) {
            await storageClient?.createFile(fs.createReadStream(file[0].fsPath));
        }
    } catch (e) {
        window.showErrorMessage("Failed to upload file.");
    }
}
