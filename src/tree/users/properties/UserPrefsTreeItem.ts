import { ThemeIcon } from "vscode";
import { UserPropertyTreeItemBase } from "../UserPropertyTreeItemBase";
import { UserTreeItem } from '../UserTreeItem';

export class UserPrefsTreeItem extends UserPropertyTreeItemBase {

    constructor(parent: UserTreeItem) {
        super(parent, 'View preferences');
        this.command = {
            command: 'vscode-appwrite.viewUserPrefs',
            title: 'View user preferences',
            arguments: [this]
        };
    }

    iconPath = new ThemeIcon("json");
    contextValue = 'users.prefs';
}
