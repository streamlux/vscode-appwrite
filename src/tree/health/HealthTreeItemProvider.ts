import * as vscode from "vscode";
import { healthClient } from "../../client";
import { HealthTreeItem } from "./HealthTreeItem";

export class HealthTreeItemProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<HealthTreeItem | undefined | void> = new vscode.EventEmitter<
        HealthTreeItem | undefined | void
    >();

    readonly onDidChangeTreeData: vscode.Event<HealthTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    constructor() {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: HealthTreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: HealthTreeItem): Promise<vscode.TreeItem[]> {
        // get children for root
        if (element === undefined) {
            const health = await healthClient.checkup();
            return Object.entries(health).map(([service, status]) => {
                return new HealthTreeItem(service, status);
            });
        }
        return [];
    }
}
