import { databaseClient } from "../../client";
import { PermissionTreeItem } from "../../tree/database/settings/PermissionTreeItem";

export async function deletePermission(treeItem: PermissionTreeItem): Promise<void> {
    const collection = treeItem.parent.parent.collection;
    const kind = treeItem.kind;

    let read = Array.from(collection.$permissions.read);
    let write = Array.from(collection.$permissions.write);

    if (kind === "read") {
        read = read.filter((item) => item !== treeItem.permission);
    } else {
        write = write.filter((item) => item !== treeItem.permission);
    }

    await databaseClient.updatePermissions(collection, read, write);
}
