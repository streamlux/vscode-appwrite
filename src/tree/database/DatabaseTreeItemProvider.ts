import * as vscode from "vscode";
import AppwriteCall from "../../utils/AppwriteCall";
import { Client, Collection, CollectionsList } from "../../appwrite";
import { CollectionTreeItem } from "./CollectionTreeItem";
import { AppwriteSDK } from "../../constants";
import { ext } from '../../extensionVariables';
import { AppwriteTreeItemBase } from '../../ui/AppwriteTreeItemBase';
import { ProjectTreeItem } from '../projects/ProjectTreeItem';
import { Database } from '../../appwrite/Database';

export class DatabaseTreeItemProvider extends AppwriteTreeItemBase<ProjectTreeItem> {

    private databaseClient: Database;

    constructor(parent: ProjectTreeItem, private readonly sdk: Client) {
        super(parent, 'Database');
        this.databaseClient = new Database(sdk);
        this.iconPath = new vscode.ThemeIcon('database');
    }

    collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;

    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<
        CollectionTreeItem | undefined | void
    >();

    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        ext.outputChannel?.appendLine('refresh database');
        this._onDidChangeTreeData.fire();
    }

    refreshChild(child: vscode.TreeItem): void {
        this._onDidChangeTreeData.fire(child);
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(parent?: vscode.TreeItem): Promise<vscode.TreeItem[]> {
        ext.outputChannel?.appendLine('getChildren for: ' + parent?.label);

        if (parent instanceof AppwriteTreeItemBase) {
            return await parent.getChildren?.() ?? [];
        }

        const databaseSdk = new AppwriteSDK.Database(this.sdk);

        const collectionsList = await AppwriteCall<CollectionsList, CollectionsList>(databaseSdk.listCollections());
        if (collectionsList) {
            const collectionTreeItems = collectionsList.collections.map((collection: Collection) => new CollectionTreeItem(collection, this)) ?? [];
            const headerItem: vscode.TreeItem = {
                label: `Total collections: ${collectionsList.sum}`,
            };
            return [headerItem, ...collectionTreeItems];
        }

        return [{ label: "No collections found" }];
    }
}
