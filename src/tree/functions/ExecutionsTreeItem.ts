import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Execution, ExecutionList } from '../../appwrite';
import { functionsClient } from "../../client";
import { AppwriteTreeItemBase } from '../../ui/AppwriteTreeItemBase';
import { ExecutionTreeItem } from './ExecutionTreeItem';
import { FunctionTreeItem } from './FunctionTreeItem';

export class ExecutionsTreeItem extends AppwriteTreeItemBase<FunctionTreeItem> {
    constructor(public readonly parent: FunctionTreeItem) {
        super(parent, "Executions");
    }

    public async getChildren(): Promise<TreeItem[]> {
        if (!functionsClient) {
            return [];
        }
        const executions: ExecutionList | undefined = await functionsClient.listExecutions(this.parent.func.$id, undefined, undefined, undefined, 'DESC');
        const children = executions?.executions.map((execution: Execution) => new ExecutionTreeItem(this, execution)) ?? [new TreeItem('No exeuctions.')];
        return children;
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "executions";

    iconPath = new ThemeIcon("history");
}
