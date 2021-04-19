import { TreeItem } from 'vscode';
import { UserTreeItem } from './UserTreeItem';

export abstract class UserPropertyTreeItemBase extends TreeItem {
    constructor(public readonly parent: UserTreeItem, label: string) {
        super(label);
    }
}
