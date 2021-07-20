import * as vscode from "vscode";
import AppwriteCall from "../../utils/AppwriteCall";
import { Client, User, UsersList } from "../../appwrite";
import { UserTreeItem } from "./UserTreeItem";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { ProjectTreeItem } from "../projects/ProjectTreeItem";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sdk = require("node-appwrite");

export class UserTreeItemProvider extends AppwriteTreeItemBase<ProjectTreeItem> {
    constructor(parent: ProjectTreeItem, private readonly sdk: Client) {
        super(parent, "Users");
        this.iconPath = new vscode.ThemeIcon('account');

    }
    private _onDidChangeTreeData: vscode.EventEmitter<UserTreeItem | undefined | void> = new vscode.EventEmitter<
        UserTreeItem | undefined | void
    >();

    readonly onDidChangeTreeData: vscode.Event<UserTreeItem | undefined | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: UserTreeItem): vscode.TreeItem {
        return element;
    }

    collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;

    async getChildren(): Promise<vscode.TreeItem[]> {

        const usersSdk = new sdk.Users(this.sdk);
        const usersList = await AppwriteCall<UsersList, UsersList>(usersSdk.list());
        if (usersList) {
            const userTreeItems = usersList.users.map((user: User) => new UserTreeItem(this, user)) ?? [];
            const headerItem: vscode.TreeItem = {
                label: `Total users: ${usersList.sum}`,
            };
            return [headerItem, ...userTreeItems];
        }

        return [{ label: "No users found" }];
    }
}
