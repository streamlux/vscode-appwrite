import { ChildTreeItem } from "../../ChildTreeItem";
import { PermissionsTreeItem } from "./PermissionsTreeItem";

export class PermissionTreeItem extends ChildTreeItem<PermissionsTreeItem> {
    constructor(parent: PermissionsTreeItem, public readonly permission: string, public readonly kind: "read" | "write") {
        super(parent, { label: permission });
    }

    contextValue = 'permission';
}
