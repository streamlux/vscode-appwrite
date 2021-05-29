import { MarkdownString, ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Function } from "../../appwrite";
import { AppwriteTreeItemBase } from "../../ui/AppwriteTreeItemBase";
import { msToDate } from '../../utils/date';
import { ExecutionsTreeItem } from './executions/ExecutionsTreeItem';
import { FunctionsTreeItemProvider } from './FunctionsTreeItemProvider';
import { FunctionSettingsTreeItem } from './settings/FunctionSettingsTreeItem';
import { TagsTreeItem } from './tags/TagsTreeItem';

export class FunctionTreeItem extends AppwriteTreeItemBase {
    constructor(public func: Function, public readonly provider: FunctionsTreeItemProvider) {
        super(undefined, func.name);
        this.tooltip = new MarkdownString(`ID: ${func.$id}  \nLast updated: ${msToDate(func.dateUpdated)}  \nCreated: ${msToDate(func.dateCreated)}`);
        this.description = func.env;
    }

    public async getChildren(): Promise<TreeItem[]> {
        return [new FunctionSettingsTreeItem(this), new TagsTreeItem(this), new ExecutionsTreeItem(this)];
    }

    public async refresh(): Promise<void> {
        this.provider.refreshChild(this);
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "function";

    iconPath = new ThemeIcon("symbol-event");
}
