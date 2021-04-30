import * as vscode from "vscode";
import { storageClient } from "../../client";
import { FileTreeItem } from "./FileTreeItem";

export class StorageTreeItemProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
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
        if (storageClient === undefined) {
            return [];
        }

        const files = await storageClient.listFiles();
        if (files === undefined || files?.files.length === 0) {
            const noStorage = new vscode.TreeItem("No files found");
            return [noStorage];
        }
        return files.files.map((file) => new FileTreeItem(file));
    }
}
