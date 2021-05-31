import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Permissions } from "../../../appwrite";
import { AwTreeItem } from "../../common/AwTreeItem";
import { CollapsableTreeItem } from "../../CollapsableTreeItem";
import { CollectionTreeItem } from "../CollectionTreeItem";
import { PermissionTreeItem } from "./PermissionTreeItem";

export class PermissionsTreeItem extends AwTreeItem<CollectionTreeItem> {
    public readonly permissions: Permissions;

    constructor(parent: CollectionTreeItem) {
        super(parent, "Permissions");
        this.permissions = parent.collection.$permissions;
    }

    public async getChildren(): Promise<TreeItem[]> {
        const readPermissions = this.permissions.read.map((perm) => new PermissionTreeItem(this, perm, "read"));
        const writePermissions = this.permissions.write.map((perm) => new PermissionTreeItem(this, perm, "write"));
        return [
            new CollapsableTreeItem(this, { label: "Read" }, readPermissions, "read"),
            new CollapsableTreeItem(this, { label: "Write" }, writePermissions, "write"),
        ];
    }

    iconPath = new ThemeIcon("shield");
    contextValue = "permissions";
    collapsibleState = TreeItemCollapsibleState.Collapsed;
}
