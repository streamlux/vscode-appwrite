import * as vscode from "vscode";
import { Client, Function, FunctionsList } from "../../appwrite";
import { AppwriteSDK } from "../../constants";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { ext } from "../../extensionVariables";
import { EventEmitter, TreeItem } from "vscode";
import { FunctionTreeItem } from "./FunctionTreeItem";
import { ProjectTreeItem } from "../projects/ProjectTreeItem";

export class FunctionsTreeItemProvider extends AppwriteTreeItemBase<ProjectTreeItem> {
    constructor(parent: ProjectTreeItem, private readonly sdk: Client) {
        super(parent, "Functions");
        this.iconPath = new vscode.ThemeIcon('github-action');
    }

    private _onDidChangeTreeData: EventEmitter<TreeItem | undefined | void> = new EventEmitter<TreeItem | undefined | void>();

    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        ext.outputChannel?.appendLine("Refreshing functions tree provider...");
        this._onDidChangeTreeData.fire();
    }

    refreshChild(child: vscode.TreeItem): void {
        this._onDidChangeTreeData.fire(child);
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;

    async getChildren(): Promise<vscode.TreeItem[]> {
        const functionsSdk = new AppwriteSDK.Functions(this.sdk);

        const list: FunctionsList = await functionsSdk.list();

        if (list) {
            const functionTreeItems = list.functions.map((func: Function) => new FunctionTreeItem(func, this)) ?? [];
            return functionTreeItems;
        }

        return [{ label: "No functions found" }];
    }
}
