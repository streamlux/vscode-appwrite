import { URL } from "url";
import { commands, Uri } from "vscode";
import { clientConfig } from "../../client";
import { UserTreeItem } from "../../tree/users/UserTreeItem";

function getConsoleUrlFromEndpoint(endpoint: string): string {
    const url = new URL(endpoint);
    return `${url.origin}/console`;
}

function getUserUrl(userId: string, endpoint: string, projectId: string): string {
    return `${getConsoleUrlFromEndpoint(endpoint)}/users/user?id=${userId}&project=${projectId}`;
}

export async function openUserInConsole(item: UserTreeItem): Promise<void> {
    const url = getUserUrl(item.user.$id, clientConfig.endpoint, clientConfig.projectId);

    await commands.executeCommand("vscode.open", Uri.parse(url));
}
