import { ChildTreeItem } from '../../tree/ChildTreeItem';
import { env, window} from 'vscode';
import { UserTreeItem } from '../../tree/users/UserTreeItem';

export async function copyUserEmail(item: ChildTreeItem<UserTreeItem>): Promise<void> {
    const email = item.parent.user.email;
    await env.clipboard.writeText(email);
    window.showInformationMessage('User email copied to clipboard');
}
