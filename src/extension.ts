import * as vscode from "vscode";
import { createAppwriteClient } from "./client";
import { registerCommands } from "./commands/registerCommands";
import { ext } from "./extensionVariables";
import { getActiveProjectConfiguration } from "./settings";
import { ProjectsTreeItemProvider } from "./tree/projects/ProjectsTreeItemProvider";
import { createAppwriteOutputChannel } from "./ui/AppwriteOutputChannel";

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const projectsTreeItemProvider = new ProjectsTreeItemProvider();

    vscode.window.registerTreeDataProvider("Projects", projectsTreeItemProvider);

    const activeProject = await getActiveProjectConfiguration();
    createAppwriteClient(activeProject);

    ext.context = context;
    ext.outputChannel = createAppwriteOutputChannel("Appwrite", "appwrite");

    ext.tree = {
        projects: projectsTreeItemProvider,
    };

    registerCommands(context);
}
