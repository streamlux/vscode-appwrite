import { commands, ExtensionContext } from "vscode";
import { AppwriteTree, ext } from "../extensionVariables";
import { refreshAllViews, refreshTree } from "../utils/refreshTree";
import { connectAppwrite } from "./connectAppwrite";
import { createCollection } from "./database/createCollection";
import { createPermission } from "./database/permissions/createPermission";
import { createRule } from "./database/createRule";
import { deleteCollection } from "./database/deleteCollection";
import { deleteDocument } from "./database/deleteDocument";
import { deletePermission } from "./database/permissions/deletePermission";
import { viewDocumentAsJson } from "./database/openDocument";
import { refreshCollection } from "./database/refreshCollection";
import { refreshCollectionsList } from "./database/refreshCollectionsList";
import { removeRule } from "./database/removeRule";
import { viewCollectionAsJson } from "./database/viewCollectionAsJson";
import { openDocumentation } from "./openDocumentation";
import { copyUserEmail } from "./users/copyUserEmail";
import { copyUserId } from "./users/copyUserId";
import { createUser } from "./users/createUser";
import { deleteUser } from "./users/deleteUser";
import { getUserLogs } from "./users/getUserLogs";
import { openUserInConsole } from "./users/openUserInConsole";
import { refreshUsersList } from "./users/refreshUsersList";
import { viewUserPrefs } from "./users/viewUserPrefs";
import { editPermission } from "./database/permissions/editPermission";
import { setActiveProject } from "./project/setActiveProject";
import { removeProject } from './project/removeProject';

class CommandRegistrar {
    constructor(private readonly context: ExtensionContext) {}

    registerCommand(commandId: string, callback: (...args: any[]) => any): void {
        const disposable = commands.registerCommand(commandId, callback);
        this.context.subscriptions.push(disposable);
    }
}

export function registerCommands(context: ExtensionContext): void {
    const registrar = new CommandRegistrar(context);
    const registerCommand = (
        commandId: string,
        callback?: (...args: any[]) => any,
        refresh?: keyof AppwriteTree | (keyof AppwriteTree)[] | "all"
    ) => {
        registrar.registerCommand(`vscode-appwrite.${commandId}`, async (...args: any[]) => {
            await callback?.(...args);
            if (refresh !== undefined) {
                if (refresh === "all") {
                    refreshAllViews();
                } else if (typeof refresh === "string") {
                    refreshTree(refresh);
                } else {
                    refreshTree(...refresh);
                }
            }
        });
    };

    /** General **/
    registerCommand("Connect", connectAppwrite);

    /** Users **/
    registerCommand("openUserInConsole", openUserInConsole);
    registerCommand("viewUserPrefs", viewUserPrefs);
    registerCommand("copyUserId", copyUserId);
    registerCommand("copyUserEmail", copyUserEmail);
    registerCommand("CreateUser", createUser);
    registerCommand("refreshUsersList", refreshUsersList);
    registerCommand("DeleteUser", deleteUser);
    registerCommand("OpenUsersDocumentation", () => openDocumentation("users"));
    registerCommand("GetUserLogs", getUserLogs);

    /** Database **/
    registerCommand("OpenDatabaseDocumentation", () => openDocumentation("database"));
    registerCommand("viewDocumentAsJson", viewDocumentAsJson);
    registerCommand("viewCollectionAsJson", viewCollectionAsJson);
    registerCommand("createRule", createRule);
    registerCommand("removeRule", removeRule);
    registerCommand("deleteDocument", deleteDocument, "database");
    registerCommand("deleteCollection", deleteCollection, "database");
    registerCommand("refreshCollection", refreshCollection);
    registerCommand("refreshCollectionsList", refreshCollectionsList);
    registerCommand("createCollection", createCollection, "database");
    registerCommand("createPermission", createPermission, "database");
    registerCommand("deletePermission", deletePermission, "database");
    registerCommand("editPermission", editPermission, "database");

    /** Health **/
    registerCommand("refreshHealth", () => {}, "health");
    registerCommand("openHealthDocumentation", () => openDocumentation("health"));

    /** Storage **/
    registerCommand("refreshStorage", () => {}, "storage");
    registerCommand("openStorageDocumentation", () => openDocumentation("storage"));

    /** Projects **/
    registerCommand("addProject", connectAppwrite, "all");
    registerCommand("setActiveProject", setActiveProject, "all");
    registerCommand("refreshProjects", undefined, "projects");
    registerCommand("removeProject", removeProject, "all");
}
