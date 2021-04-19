import { commands, ExtensionContext } from "vscode";
import { AppwriteTree, ext } from "../extensionVariables";
import { refreshTree } from "../utils/refreshTree";
import { connectAppwrite } from "./connectAppwrite";
import { createCollection } from "./database/createCollection";
import { createPermission } from './database/createPermission';
import { createRule } from "./database/createRule";
import { deleteCollection } from "./database/deleteCollection";
import { deleteDocument } from "./database/deleteDocument";
import { deletePermission } from './database/deletePermission';
import { viewDocumentAsJson } from "./database/openDocument";
import { refreshCollection } from "./database/refreshCollection";
import { refreshCollectionsList } from "./database/refreshCollectionsList";
import { removeRule } from "./database/removeRule";
import { viewCollectionAsJson } from "./database/viewCollectionAsJson";
import { openDocumentation } from "./openDocumentation";
import { addProject } from "./project/addProject";
import { copyUserEmail } from "./users/copyUserEmail";
import { copyUserId } from "./users/copyUserId";
import { createUser } from "./users/createUser";
import { deleteUser } from "./users/deleteUser";
import { getUserLogs } from "./users/getUserLogs";
import { openUserInConsole } from "./users/openUserInConsole";
import { refreshUsersList } from "./users/refreshUsersList";
import { viewUserPrefs } from "./users/viewUserPrefs";

class CommandRegistrar {
    constructor(private readonly context: ExtensionContext) {}

    registerCommand(commandId: string, callback: (...args: any[]) => any): void {
        const disposable = commands.registerCommand(commandId, callback);
        this.context.subscriptions.push(disposable);
    }
}

export function registerCommands(context: ExtensionContext): void {
    const registrar = new CommandRegistrar(context);
    const registerCommand = (commandId: string, callback: (...args: any[]) => any, refresh?: keyof AppwriteTree) => {
        registrar.registerCommand(`vscode-appwrite.${commandId}`, async (...args: any[]) => {
            await callback(...args);
            if (refresh) {
                refreshTree(refresh);
            }
        });
    };

    registerCommand("Connect", connectAppwrite);
    registerCommand("openUserInConsole", openUserInConsole);
    registerCommand("viewUserPrefs", viewUserPrefs);
    registerCommand("copyUserId", copyUserId);
    registerCommand("copyUserEmail", copyUserEmail);
    registerCommand("CreateUser", createUser);
    registerCommand("refreshUsersList", refreshUsersList);
    registerCommand("DeleteUser", deleteUser);
    registerCommand("OpenDocumentation", openDocumentation);
    registerCommand("GetUserLogs", getUserLogs);
    registerCommand("viewDocumentAsJson", viewDocumentAsJson);
    registerCommand("AddProject", addProject);
    registerCommand("viewCollectionAsJson", viewCollectionAsJson);
    registerCommand("createRule", createRule);
    registerCommand("removeRule", removeRule);
    registerCommand("deleteDocument", deleteDocument, 'database');
    registerCommand("deleteCollection", deleteCollection, 'database');
    registerCommand("refreshCollection", refreshCollection);
    registerCommand("refreshCollectionsList", refreshCollectionsList);
    registerCommand("createCollection", createCollection, 'database');
    registerCommand("createPermission", createPermission, 'database');
    registerCommand("deletePermission", deletePermission, 'database');
}
