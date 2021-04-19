import * as vscode from "vscode";
import { initAppwriteClient } from "./client";
import { registerCommands } from "./commands/registerCommands";
import { ext } from "./extensionVariables";
import { getDefaultProject } from "./settings";
import { DatabaseTreeItemProvider } from "./tree/database/DatabaseTreeItemProvider";
import { HealthTreeItemProvider } from "./tree/health/HealthTreeItemProvider";
import { StorageTreeItemProvider } from "./tree/storage/StorageTreeItemProvider";
import { UserTreeItemProvider } from "./tree/users/UserTreeItemProvider";
import { createAppwriteOutputChannel } from "./ui/AppwriteOutputChannel";

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const userTreeItemProvider = new UserTreeItemProvider();
    const healthTreeItemProvider = new HealthTreeItemProvider();
    const databaseTreeItemProvider = new DatabaseTreeItemProvider();
    const storageTreeItemProvider = new StorageTreeItemProvider();

    vscode.window.registerTreeDataProvider("Users", userTreeItemProvider);
    vscode.window.registerTreeDataProvider("Health", healthTreeItemProvider);
    vscode.window.registerTreeDataProvider("Database", databaseTreeItemProvider);
    vscode.window.registerTreeDataProvider("Storage", storageTreeItemProvider);

    const defaultProject = await getDefaultProject();
    if (defaultProject) {
        initAppwriteClient(defaultProject);
    }

    ext.context = context;
    ext.outputChannel = createAppwriteOutputChannel("Appwrite", "appwrite");

    ext.tree = {
        users: userTreeItemProvider,
        health: healthTreeItemProvider,
        database: databaseTreeItemProvider,
        storage: storageTreeItemProvider,
    };

    registerCommands(context);
}

export function deactivate() {}
