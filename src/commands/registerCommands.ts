import { commands, ExtensionContext } from "vscode";
import { AppwriteTree } from "../extensionVariables";
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
import { removeProject } from "./project/removeProject";
import { createTag } from './functions/createTag';
import { createExecution } from './functions/createExecution';
import { activateTag } from './functions/activateTag';
import { editValue } from './common/editValue';
import { deleteFunction } from './functions/deleteFunction';
import { createFunction } from './functions/createFunction';
import { createFunctionVar } from './functions/createFunctionVar';
import { deleteFunctionVar } from './functions/deleteFunctionVar';
import { deleteTag } from './functions/deleteTag';
import { viewExecutionErrors } from './functions/viewExecutionErrors';
import { viewExecutionOutput } from './functions/viewExecutionOutput';
import { copyExecutionErrors } from './functions/copyExecutionErrors';
import { copyExecutionOutput } from './functions/copyExecutionOutput';
import { openExecutionsInBrowser } from './functions/openExecutionsInBrowser';
import { openFunctionSettingsInBrowser } from './functions/openFunctionSettingsInBrowser';
import { openFunctionTagsInBrowser } from './functions/openFunctionTagsInBrowser';

import { viewMore } from './common/viewMore';
import { openCollectionInBrowser } from './database/openCollectionInBrowser';
import { uploadFile } from './storage/uploadFile';
import { downloadFile } from './storage/downloadFile';

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

    /** Common **/
    registerCommand("editValue", editValue);
    registerCommand("viewMore", viewMore);

    /** General **/
    registerCommand("Connect", connectAppwrite, "all");

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
    registerCommand("openCollectionInBrowser", openCollectionInBrowser);

    /** Health **/
    registerCommand("refreshHealth", undefined, "health");
    registerCommand("openHealthDocumentation", () => openDocumentation("health"));

    /** Storage **/
    registerCommand("refreshStorage", undefined, "storage");
    registerCommand("uploadFile", uploadFile, "storage");
    registerCommand("downloadFile", downloadFile);

    registerCommand("openStorageDocumentation", () => openDocumentation("storage"));

    /** Projects **/
    registerCommand("addProject", connectAppwrite, "all");
    registerCommand("setActiveProject", setActiveProject, "all");
    registerCommand("refreshProjects", undefined, "projects");
    registerCommand("removeProject", removeProject, "all");

    /** Functions **/
    registerCommand("refreshFunctions", undefined, "functions");
    registerCommand("CreateExecution", createExecution, "functions");
    registerCommand("CreateTag", createTag, "functions");
    registerCommand("activateTag", activateTag, "functions");
    registerCommand("deleteTag", deleteTag, "functions");
    registerCommand("deleteFunction", deleteFunction, "functions");
    registerCommand("openFunctionsDocumentation", () => openDocumentation("functions"));
    registerCommand("createFunction", createFunction, "functions");
    registerCommand("createFunctionVar", createFunctionVar, "functions");
    registerCommand("deleteFunctionVar", deleteFunctionVar, "functions");
    registerCommand("viewExecutionErrors", viewExecutionErrors);
    registerCommand("viewExecutionOutput", viewExecutionOutput);
    registerCommand("copyExecutionOutput", copyExecutionOutput);
    registerCommand("copyExecutionErrors", copyExecutionErrors);
    registerCommand("openExecutionsInBrowser", openExecutionsInBrowser);
    registerCommand("openFunctionTagsInBrowser", openFunctionTagsInBrowser);
    registerCommand("openFunctionSettingsInBrowser", openFunctionSettingsInBrowser);
}
