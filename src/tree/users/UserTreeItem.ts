import { User } from "../../appwrite";
import * as vscode from "vscode";

export class UserTreeItem extends vscode.TreeItem {
    constructor(public readonly user: User) {
        super(user.email);
        console.log(user);
        this.label = `${user.email}`;
        this.tooltip = user.emailVerification ? "Verified" : "Unverified";
        this.iconPath = new vscode.ThemeIcon(user.emailVerification ? "verified" : "unverified");
    }

    collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    contextValue = "user";
}
