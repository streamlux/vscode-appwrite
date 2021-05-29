import { Uri } from 'vscode';
import { functionsClient } from '../../client';
import { getTarReadStream } from '../../utils/tar';
import { ext } from '../../extensionVariables';
export async function createTag(folder: Uri): Promise<void> {
    const buffer = await getTarReadStream(folder);
    if (buffer !== undefined) {
        try {
            await functionsClient?.createTag('60b1836a8e5d9', "python hello.py", buffer);
        } catch (e) {
            ext.outputChannel.appendLog("Creating tag error: " + e);
        }
    }
}
