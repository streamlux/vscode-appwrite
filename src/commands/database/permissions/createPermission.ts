import { window } from "vscode";
import { databaseClient } from "../../../client";
import { CollapsableTreeItem } from "../../../tree/CollapsableTreeItem";
import { PermissionsTreeItem } from "../../../tree/database/settings/PermissionsTreeItem";
import { PermissionTreeItem } from "../../../tree/database/settings/PermissionTreeItem";

export type CreatePermissionWizardContext = {
    kind: "read" | "write";
    permission: string;
};
export async function createPermissionWizard(kind?: "read" | "write"): Promise<CreatePermissionWizardContext | undefined> {
    const permissionKind = kind ?? (await window.showQuickPick(["read", "write"]));
    if (permissionKind && (permissionKind === "read" || permissionKind === "write")) {
        const permission = await window.showInputBox({ prompt: "Add * for wildcard access", placeHolder: "User ID, Team ID, or Role" });
        if (permission === undefined) {
            return undefined;
        }

        return {
            kind: permissionKind,
            permission,
        };
    }
    return undefined;
}

export async function createPermission(treeItem: PermissionsTreeItem): Promise<void> {
    if (!databaseClient) {
        return;
    }

    const collection = treeItem.parent.collection;
    const context = await createPermissionWizard(undefined);

    if (context === undefined) {
        return;
    }

    const read = Array.from(collection.$permissions.read);
    const write = Array.from(collection.$permissions.write);

    if (context.kind === "read") {
        read.push(context.permission);
    } else {
        write.push(context.permission);
    }

    await databaseClient.updatePermissions(collection, read, write);
}
