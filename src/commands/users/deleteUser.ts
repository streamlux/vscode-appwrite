import { window } from "vscode";
import { usersClient } from "../../client";
import { UserTreeItem } from '../../tree/users/UserTreeItem';
import { DialogResponses } from "../../ui/DialogResponses";
import { refreshTree } from "../../utils/refreshTree";

export async function deleteUser(userTreeItem: UserTreeItem): Promise<void> {
    if (!usersClient) {
        return;
    }
    const user = userTreeItem.user;
    const userId = user.$id;
    const shouldDeleteUser = await window.showWarningMessage(
        `Are you sure you want to delete user with email: "${user.email}"?`,
        {
            modal: true,
        },
        DialogResponses.yes,
        DialogResponses.cancel
    );

    if (shouldDeleteUser === DialogResponses.yes) {
            await usersClient.delete(userId);
        refreshTree("users");
    }
}
