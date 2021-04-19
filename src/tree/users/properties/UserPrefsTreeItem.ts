import { ThemeIcon } from "vscode";
import { UserPropertyTreeItemBase } from "../UserPropertyTreeItemBase";
import { UserTreeItem } from '../UserTreeItem';

export class UserPrefsTreeItem extends UserPropertyTreeItemBase {

    constructor(parent: UserTreeItem) {
        super(parent, 'View preferences');
    }

    iconPath = new ThemeIcon("json");
    contextValue = 'users.prefs';
}
