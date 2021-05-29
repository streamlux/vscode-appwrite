import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Function } from "../../appwrite";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { ExecutionsTreeItem } from './ExecutionsTreeItem';
import { FunctionsTreeItemProvider } from './FunctionsTreeItemProvider';
import { TagsTreeItem } from './TagsTreeItem';

export class FunctionTreeItem extends AppwriteTreeItemBase {
    constructor(public func: Function, public readonly provider: FunctionsTreeItemProvider) {
        super(undefined, func.name);
    }

    public async getChildren(): Promise<TreeItem[]> {
        return [new TagsTreeItem(this), new ExecutionsTreeItem(this)];
    }

    public async refresh(): Promise<void> {
        this.provider.refreshChild(this);
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "function";

    iconPath = new ThemeIcon("symbol-event");
}
