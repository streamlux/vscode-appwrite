import { ChildTreeItem } from '../../tree/ChildTreeItem';
import { env, window} from 'vscode';
import { UserTreeItem } from '../../tree/users/UserTreeItem';

export async function copyUserId(item: ChildTreeItem<UserTreeItem>): Promise<void> {
    const id = item.parent.user.$id;
    await env.clipboard.writeText(id);
    window.showInformationMessage('User id copied to clipboard');
}
