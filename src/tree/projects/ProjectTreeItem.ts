import { TreeItem, TreeItemCollapsibleState } from "vscode";
import { Client } from "../../appwrite";
import { createAppwriteSdk } from "../../client";
import { AppwriteProjectConfiguration } from "../../settings";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { DatabaseTreeItemProvider } from "../database/DatabaseTreeItemProvider";
import { FunctionsTreeItemProvider } from "../functions/FunctionsTreeItemProvider";
import { HealthParentTreeItem } from "../health/HealthParentTreeItem";
import { StorageTreeItemProvider } from "../storage/StorageTreeItemProvider";
import { UserTreeItemProvider } from "../users/UserTreeItemProvider";

export class ProjectTreeItem extends AppwriteTreeItemBase {
    private readonly sdk: Client;

    constructor(public readonly project: AppwriteProjectConfiguration, active: boolean) {
        super(undefined, "Project");
        const name = project.nickname ?? "Project";
        this.label = `${name}`;
        this.contextValue = `appwriteProject${active ? "_active" : ""}`;

        this.sdk = createAppwriteSdk(project);
    }

    async getChildren(): Promise<TreeItem[]> {
        return [
            new DatabaseTreeItemProvider(this, this.sdk),
            new FunctionsTreeItemProvider(this, this.sdk),
            new UserTreeItemProvider(this, this.sdk),
            new StorageTreeItemProvider(this, this.sdk),
            new HealthParentTreeItem(this, this.sdk),
        ];
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;
}
