import { window } from "vscode";
import { AppwriteProjectConfiguration, getActiveProjectConfiguration } from "../settings";

export async function addProjectWizard(): Promise<AppwriteProjectConfiguration | undefined> {
    const config = await getActiveProjectConfiguration();
    const endpoint = await window.showInputBox({
        placeHolder: "Endpoint",
        value: config?.endpoint ?? "https://localhost/v1",
        valueSelection: undefined,
        prompt: "Enter your Appwrite API endpoint (ex: https://localhost/v1)",
        ignoreFocusOut: true,
    });
    if (endpoint === undefined) {
        return;
    }
    const projectId = await window.showInputBox({
        placeHolder: "Project Id",
        prompt: "Enter your Appwrite project id (ex: 5df5acd0d48c2)",
        ignoreFocusOut: true,
    });
    if (projectId === undefined) {
        return;
    }
    const secret = await window.showInputBox({
        placeHolder: "API key secret",
        prompt: "Enter your Appwrite API key secret (with all scopes)",
        ignoreFocusOut: true,
    });
    if (secret === undefined) {
        return;
    }
    const selfSigned = await window.showQuickPick(
        [
            { label: "Yes", description: "If running Appwrite on localhost, or local IP" },
            { label: "No", description: "If connecting to a remote Appwrite instance" },
        ],
        {
            placeHolder: "Allow communication with self-signed SSL certificates? (Select 'Yes' for connecting to Appwrite on localhost)",
            ignoreFocusOut: true,
        }
    );
    if (selfSigned === undefined) {
        return;
    }
    const nickname = await window.showInputBox({
        prompt: "(Optional) Project name",
        ignoreFocusOut: true,
    });

    if (endpoint && projectId && secret) {
        return { endpoint, projectId, secret, nickname, selfSigned: selfSigned.label === "Yes" };
    }
    return undefined;
}
