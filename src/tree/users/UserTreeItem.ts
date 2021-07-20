import { User } from "../../appwrite";
import * as vscode from "vscode";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { UserTreeItemProvider } from "./UserTreeItemProvider";
import { ChildTreeItem } from '../ChildTreeItem';
import { ThemeIcon } from 'vscode';
import { UserPrefsTreeItem } from './properties/UserPrefsTreeItem';

export class UserTreeItem extends AppwriteTreeItemBase<UserTreeItemProvider> {
    constructor(parent: UserTreeItemProvider, public readonly user: User) {
        super(parent, user.email);
        console.log(user);
        this.label = `${user.email}`;
        this.tooltip = user.emailVerification ? "Verified" : "Unverified";
        this.iconPath = new vscode.ThemeIcon(user.emailVerification ? "verified" : "unverified");
    }
    async getChildren(): Promise<vscode.TreeItem[]> {
        const regDate = new Date();

        regDate.setMilliseconds(this.user.registration);
        const items: vscode.TreeItem[] = [
            new ChildTreeItem(this, {
                contextValue: "user.name",
                label: this.user.name || "Unfilled",
                iconPath: new ThemeIcon("person"),
                description: "Name",
            }),
            new ChildTreeItem(this, {
                contextValue: "user.email",
                label: this.user.email,
                iconPath: new ThemeIcon("mail"),
                description: "Email",
            }),
            new ChildTreeItem(this, {
                contextValue: "user.registration",
                label: regDate.toDateString(),
                iconPath: new vscode.ThemeIcon("calendar"),
                description: "Joined",
            }),
            new ChildTreeItem(this, {
                label: this.user.$id,
                description: "User ID",
                iconPath: new vscode.ThemeIcon("key"),
                contextValue: "user.id",
            }),
            new UserPrefsTreeItem(this),
        ];

        return items;
    }

    collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    contextValue = "user";
}
