import { window } from 'vscode';
import { databaseClient } from '../../client';

export async function createCollection(): Promise<void> {
    const name = await window.showInputBox({
        prompt: 'Collection name'
    });

    if (name && name.length > 0) {
        await databaseClient.createCollection({name});
        window.showInformationMessage(`Created collection "${name}".`);
    }
}
