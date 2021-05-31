import { TreeItem, TreeItemCollapsibleState } from "vscode";
import { Vars } from "../../../appwrite";
import { AwTreeItem } from "../../common/AwTreeItem";
import { FunctionSettingsTreeItem } from "./FunctionSettingsTreeItem";
import { VarTreeItem } from "./VarTreeItem";

export class VarsTreeItem extends AwTreeItem<FunctionSettingsTreeItem> {
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
