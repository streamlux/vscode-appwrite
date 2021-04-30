import { window } from "vscode";
import { AppwriteProjectConfiguration } from "../settings";

export async function addProjectWizard(): Promise<AppwriteProjectConfiguration | undefined> {
    const endpoint = await window.showInputBox({
        placeHolder: "Endpoint",
        prompt: "Enter your Appwrite API endping",
        ignoreFocusOut: true
    });
    if (endpoint === undefined) {
        return;
    }
    const projectId = await window.showInputBox({
        placeHolder: "Project Id",
        prompt: "Enter your Appwrite project id",
        ignoreFocusOut: true
    });
    if (projectId === undefined) {
        return;
    }
    const secret = await window.showInputBox({
        placeHolder: "API key secret",
        prompt: "Enter your Appwrite API key secret",
        ignoreFocusOut: true
    });
    if (secret === undefined) {
        return;
    }
    const nickname = await window.showInputBox({
        prompt: "(Optional) Project name",
        ignoreFocusOut: true
    });

    if (endpoint && projectId && secret) {
        return { endpoint, projectId, secret, nickname };
    }
    return undefined;
}
