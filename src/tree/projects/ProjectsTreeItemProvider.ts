import * as vscode from "vscode";
import { getActiveProjectId, getAppwriteProjects } from '../../settings';
import { ProjectTreeItem } from './ProjectTreeItem';

export class ProjectsTreeItemProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<
        vscode.TreeItem | undefined | void
    >();

    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor() {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
        const configs = await getAppwriteProjects();
        if (configs === undefined || configs.length === 0) {
            return [];
        }
        const activeProjectId = await getActiveProjectId();
        return configs.map((config) => new ProjectTreeItem(config, config.projectId === activeProjectId));
    }
}
