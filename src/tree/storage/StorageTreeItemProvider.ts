import { Event, EventEmitter, ThemeIcon, TreeItem, TreeItemCollapsibleState } from 'vscode';
import { Client } from "../../appwrite";
import { Storage } from "../../appwrite/Storage";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { ProjectTreeItem } from "../projects/ProjectTreeItem";
import { FileTreeItem } from "./FileTreeItem";

export class StorageTreeItemProvider extends AppwriteTreeItemBase<ProjectTreeItem> {
    constructor(parent: ProjectTreeItem, private readonly sdk: Client) {
        super(parent, "Storage");
        this.iconPath = new ThemeIcon('archive');
    }

    private _onDidChangeTreeData: EventEmitter<TreeItem | undefined | void> = new EventEmitter<
        TreeItem | undefined | void
    >();

    readonly onDidChangeTreeData: Event<TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: TreeItem): TreeItem {
        return element;
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    async getChildren(_element?: TreeItem): Promise<TreeItem[]> {
        const storageClient = new Storage(this.sdk);
        const files = await storageClient.listFiles();
        if (files === undefined || files?.files.length === 0) {
            const noStorage = new TreeItem("No files found");
            return [noStorage];
        }
        return files.files.map((file) => new FileTreeItem(file));
    }
}
