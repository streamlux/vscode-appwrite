import { ExtensionContext } from "vscode";
import { DatabaseTreeItemProvider } from './tree/database/DatabaseTreeItemProvider';
import { FunctionsTreeItemProvider } from './tree/functions/FunctionsTreeItemProvider';
import { HealthTreeItemProvider } from './tree/health/HealthTreeItemProvider';
import { ProjectsTreeItemProvider } from './tree/projects/ProjectsTreeItemProvider';
import { StorageTreeItemProvider } from './tree/storage/StorageTreeItemProvider';
import { UserTreeItemProvider } from './tree/users/UserTreeItemProvider';
import { AppwriteOutputChannel } from './ui/AppwriteOutputChannel';

export type AppwriteTree = {
    users?: UserTreeItemProvider;
    health?: HealthTreeItemProvider;
    database?: DatabaseTreeItemProvider;
    storage?: StorageTreeItemProvider;
    projects?: ProjectsTreeItemProvider;
    functions?: FunctionsTreeItemProvider;
};

export type Ext = {
    context?: ExtensionContext;
    outputChannel: AppwriteOutputChannel;
    tree?: AppwriteTree;
};

export const ext: Ext = {} as Ext;
