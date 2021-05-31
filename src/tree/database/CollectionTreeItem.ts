import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Collection } from "../../appwrite";
import { databaseClient } from "../../client";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { DatabaseTreeItemProvider } from "./DatabaseTreeItemProvider";
import { DocumentsTreeItem } from "./DocumentsTreeItem";
import { PermissionsTreeItem } from "./settings/PermissionsTreeItem";
import { RulesTreeItem } from "./settings/RulesTreeItem";

export class CollectionTreeItem extends AppwriteTreeItemBase {
    constructor(public collection: Collection, public readonly provider: DatabaseTreeItemProvider) {
        super(undefined, collection.name);
    }

    public async getChildren(): Promise<TreeItem[]> {
        return [new RulesTreeItem(this), new PermissionsTreeItem(this), new DocumentsTreeItem(this)];
    }

    public async refresh(): Promise<void> {
        if (!databaseClient) {
            return;
        }
        this.collection = (await databaseClient.getCollection(this.collection.$id)) ?? this.collection;
        this.provider.refreshChild(this);
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "collection";

    iconPath = new ThemeIcon("folder");
}
