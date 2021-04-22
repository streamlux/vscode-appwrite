import { window } from "vscode";
import { Client, Log, SDK, User, UsersClient } from "../appwrite";
import { ext } from "../extensionVariables";
import AppwriteCall from "../utils/AppwriteCall";
const sdk: SDK = require("node-appwrite");

export class Users {
    private readonly users: UsersClient;

    constructor(client: Client) {
        this.users = new sdk.Users(client);
    }
    public async createNewUser(context: CreateUserContext): Promise<void> {
        await AppwriteCall<User, void>(this.users.create(context.email, context.password, context.name), (user) => {
            window.showInformationMessage(`Created user with id: ${user.$id}`);
        });
    }

    public async delete(userId: string): Promise<void> {
        await AppwriteCall(this.users.deleteUser(userId), () => {
            window.showInformationMessage(`Deleted user with id: ${userId}.`);
        });
    }

    public async getLogs(userId: string): Promise<Log[]> {
        return await AppwriteCall<Log[], Log[]>(this.users.getLogs(userId)) ?? [];
    }
}

type CreateUserContext = {
    email: string;
    password: string;
    name?: string;
};
