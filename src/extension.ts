import * as vscode from "vscode";
import { createAppwriteClient } from "./client";
import { registerCommands } from "./commands/registerCommands";
import { ext } from "./extensionVariables";
import { getActiveProjectConfiguration } from "./settings";
import { DatabaseTreeItemProvider } from "./tree/database/DatabaseTreeItemProvider";
import { FunctionsTreeItemProvider } from './tree/functions/FunctionsTreeItemProvider';
import { HealthTreeItemProvider } from "./tree/health/HealthTreeItemProvider";
import { ProjectsTreeItemProvider } from "./tree/projects/ProjectsTreeItemProvider";
import { StorageTreeItemProvider } from "./tree/storage/StorageTreeItemProvider";
import { UserTreeItemProvider } from "./tree/users/UserTreeItemProvider";
import { createAppwriteOutputChannel } from "./ui/AppwriteOutputChannel";

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const userTreeItemProvider = new UserTreeItemProvider();
    const healthTreeItemProvider = new HealthTreeItemProvider();
    const databaseTreeItemProvider = new DatabaseTreeItemProvider();
    const storageTreeItemProvider = new StorageTreeItemProvider();
    const projectsTreeItemProvider = new ProjectsTreeItemProvider();
    const functionsTreeItemProvider = new FunctionsTreeItemProvider();

    vscode.window.registerTreeDataProvider("Users", userTreeItemProvider);
    vscode.window.registerTreeDataProvider("Health", healthTreeItemProvider);
    vscode.window.registerTreeDataProvider("Database", databaseTreeItemProvider);
    vscode.window.registerTreeDataProvider("Storage", storageTreeItemProvider);
    vscode.window.registerTreeDataProvider("Projects", projectsTreeItemProvider);
    vscode.window.registerTreeDataProvider("Functions", functionsTreeItemProvider);

    const activeProject = await getActiveProjectConfiguration();
    createAppwriteClient(activeProject);

    ext.context = context;
    ext.outputChannel = createAppwriteOutputChannel("Appwrite", "appwrite");

    ext.tree = {
        users: userTreeItemProvider,
        health: healthTreeItemProvider,
        database: databaseTreeItemProvider,
        storage: storageTreeItemProvider,
        projects: projectsTreeItemProvider,
        functions: functionsTreeItemProvider
    };

    registerCommands(context);
}
