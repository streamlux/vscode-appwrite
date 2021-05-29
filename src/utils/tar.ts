import tar = require("tar");
import { Uri, window, workspace } from "vscode";
import { ext } from "../extensionVariables";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { ReadStream } from 'node:fs';

export async function getTarReadStream(folder: Uri): Promise<ReadStream | undefined> {
    try {
        const folderName = path.basename(folder.path);

        const tarName = `${folderName}.tar.gz`;
        const cwd = folder.fsPath;
        if (cwd === undefined) {
            window.showErrorMessage("No workspace open.");
            return;
        }
        ext.outputChannel.appendLog(`Creating '${tarName}' in '${workspace.workspaceFolders?.[0].uri.fsPath}'...`);

        const tarFilePath = path.join(os.tmpdir(), tarName);

        tar.create({ gzip: true, cwd: cwd }, [path.relative(cwd, folder.fsPath)]).pipe(fs.createWriteStream(tarFilePath, { emitClose: true}));

        const stream = fs.createReadStream(tarFilePath);
        stream.on('close', () => {
            try {
                fs.unlinkSync(tarFilePath);
            } catch (e) {
                //
            }
        });
        return stream;

    } catch (e) {
        ext.outputChannel?.appendLog("Error creating tar.gz: " + e);
    }
}
