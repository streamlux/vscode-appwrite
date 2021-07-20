import * as vscode from "vscode";
import { getActiveProjectId, getAppwriteProjects } from "../../settings";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { ProjectTreeItem } from "./ProjectTreeItem";

export class ProjectsTreeItemProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<
        vscode.TreeItem | undefined | void
    >();

    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor() {
        vscode.workspace.onDidChangeConfiguration((e) => {
            if (e.affectsConfiguration("appwrite")) {
                this.refresh();
            }
        });
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
        if (element instanceof AppwriteTreeItemBase) {
            return element.getChildren?.() ?? [];
        }

        const configs = await getAppwriteProjects();
        if (configs === undefined || configs.length === 0) {
            return [];
        }
        const activeProjectId = await getActiveProjectId();
        return configs.map((config) => new ProjectTreeItem(config, config.projectId === activeProjectId));
    }
}
