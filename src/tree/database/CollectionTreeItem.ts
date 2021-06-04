import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Collection } from "../../appwrite";
import { clientConfig, databaseClient } from "../../client";
import { getConsoleUrlFromEndpoint } from '../../commands/users/openUserInConsole';
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { DatabaseTreeItemProvider } from "./DatabaseTreeItemProvider";
import { DocumentsTreeItem } from "./DocumentsTreeItem";
import { PermissionsTreeItem } from "./settings/PermissionsTreeItem";
import { RulesTreeItem } from "./settings/RulesTreeItem";

export class CollectionTreeItem extends AppwriteTreeItemBase {
    constructor(public collection: Collection, public readonly provider: DatabaseTreeItemProvider) {
        super(undefined, collection.name);
    }

    // https://console.streamlux.com/console/database/collection?id=607cb2d6a21a8&project=605ce39a30c01
    public getUrl(): string {
        const consoleUrl = getConsoleUrlFromEndpoint(clientConfig.endpoint);
        return `${consoleUrl}/database/collection?id=${this.collection.$id}&project=${clientConfig.projectId}`;
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
