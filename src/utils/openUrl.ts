import { commands, Uri } from 'vscode';

export async function openUrl(url: string): Promise<void> {
    await commands.executeCommand('vscode.open', Uri.parse(url));
}
