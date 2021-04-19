import { usersClient } from "../../client";
import { UserTreeItem } from "../../tree/users/UserTreeItem";
import { openReadOnlyJson } from '../../ui/openReadonlyContent';

export async function getUserLogs(treeItem: UserTreeItem): Promise<void> {
    const userId = treeItem.user.$id;

    const logs = await usersClient.getLogs(userId);

    await openReadOnlyJson({ label: `Logs for ${treeItem.user.email}`, fullId: `${treeItem.user.$id}-UserLogs` }, logs);
}
