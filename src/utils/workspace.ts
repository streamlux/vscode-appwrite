/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as path from "path";
import * as vscode from "vscode";
import { QuickPickItem } from 'vscode';

export interface IAzureQuickPickItem<T = undefined> extends QuickPickItem {
    /**
     * An optional id to uniquely identify this item across sessions, used in persisting previous selections
     * If not specified, a hash of the label will be used
     */
    id?: string;

    data: T;

    /**
     * Callback to use when this item is picked, instead of returning the pick
     * Only applies when used as part of an `AzureWizard`
     * This is not compatible with `canPickMany`
     */
    onPicked?: () => void | Promise<void>;

    /**
     * The group that this pick belongs to. Set `IAzureQuickPickOptions.enableGrouping` for this property to take effect
     * Only applies when used as part of an `AzureWizard`
     */
    group?: string;

    /**
     * Optionally used to suppress persistence for this item, defaults to `false`
     */
    suppressPersistence?: boolean;
}


export async function selectWorkspaceFolder(placeHolder: string): Promise<string> {
    return await selectWorkspaceItem(placeHolder, {
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        defaultUri:
            vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
                ? vscode.workspace.workspaceFolders[0].uri
                : undefined,
        openLabel: "Select",
    });
}

export async function selectWorkspaceFile(placeHolder: string, fileExtensions?: string[]): Promise<string> {
    const filters: { [name: string]: string[] } = {};
    if (fileExtensions) {
        filters.Artifacts = fileExtensions;
    }
    return await selectWorkspaceItem(placeHolder, {
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        openLabel: "Select",
        filters: filters,
    });
}

export async function selectWorkspaceItem(placeHolder: string, options: vscode.OpenDialogOptions): Promise<string> {
    let folder: IAzureQuickPickItem<string | undefined> | undefined;
    if (vscode.workspace.workspaceFolders) {
        const folderPicks: IAzureQuickPickItem<string | undefined>[] = await Promise.all(
            vscode.workspace.workspaceFolders.map((f: vscode.WorkspaceFolder) => {
                return { label: path.basename(f.uri.fsPath), description: f.uri.fsPath, data: f.uri.fsPath };
            })
        );

        folderPicks.push({ label: "$(file-directory) Browse...", description: "", data: undefined });
        folder = await vscode.window.showQuickPick(folderPicks, { placeHolder });
    }

    if (folder?.data) {
        return folder.data;
    } else {
        return (await vscode.window.showOpenDialog(options))?.[0].fsPath ?? '';
    }
}
