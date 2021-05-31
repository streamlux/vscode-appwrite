import { TreeItem, TreeItemCollapsibleState } from "vscode";
import { Vars } from "../../../appwrite";
import { AppwriteTreeItemBase } from '../../../ui/AppwriteTreeItemBase';
import { FunctionSettingsTreeItem } from "./FunctionSettingsTreeItem";
import { VarTreeItem } from "./VarTreeItem";

export class VarsTreeItem extends AppwriteTreeItemBase<FunctionSettingsTreeItem> {
    public readonly vars: Vars;

    constructor(parent: FunctionSettingsTreeItem) {
        super(parent, "Environment variables");
        this.vars = parent.func.vars;
        this.description = undefined;
    }

    public async getChildren(): Promise<TreeItem[]> {
        return Object.keys(this.vars).map((key) => new VarTreeItem(this, key, this.vars[key]));
    }
    contextValue = "vars";
    collapsibleState = TreeItemCollapsibleState.Collapsed;
}
