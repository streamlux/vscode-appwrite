import { window } from 'vscode';
import { functionsClient } from '../../client';
import { appwriteFunctionRuntimes } from '../../constants';
import { validateFunctionName } from '../../tree/functions/settings/NameTreeItem';

export async function createFunction(): Promise<void> {

    const name = await window.showInputBox({ prompt: 'Function name', validateInput: validateFunctionName });
    if (name === undefined) {
        return;
    }

    const env: string | undefined = await window.showQuickPick(appwriteFunctionRuntimes);
    if (env === undefined) {
        return;
    }

    await functionsClient?.create(name, [], env);
}
