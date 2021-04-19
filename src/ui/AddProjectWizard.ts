import { window } from "vscode";
import { AppwriteProjectConfiguration } from "../settings";

export async function addProjectWizard(): Promise<AppwriteProjectConfiguration | undefined> {
    const endpoint = await window.showInputBox({
        placeHolder: "Endpoint",
        prompt: "Enter your Appwrite API endping",
        ignoreFocusOut: true
    });
    const projectId = await window.showInputBox({
        placeHolder: "Project Id",
        prompt: "Enter your Appwrite project id",
        ignoreFocusOut: true
    });
    const secret = await window.showInputBox({
        placeHolder: "API key secret",
        prompt: "Enter your Appwrite API key secret",
        ignoreFocusOut: true
    });
    const nickname = await window.showInputBox({
        prompt: "(Optional) Project nickname",
        ignoreFocusOut: true
    });

    if (endpoint && projectId && secret) {
        return { endpoint, projectId, secret, nickname };
    }
    return undefined;
}
