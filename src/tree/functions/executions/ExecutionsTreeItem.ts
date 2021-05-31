import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Execution, ExecutionList } from '../../../appwrite';
import { functionsClient } from "../../../client";
import { AwTreeItem } from '../../common/AwTreeItem';
import { ExecutionTreeItem } from './ExecutionTreeItem';
import { FunctionTreeItem } from '../FunctionTreeItem';
import { ext } from '../../../extensionVariables';

const executionsToShow = 10;

export class ExecutionsTreeItem extends AwTreeItem<FunctionTreeItem> {
    constructor(public readonly parent: FunctionTreeItem) {
        super(parent, "Executions");
    }

    public async getChildren(): Promise<TreeItem[]> {
        if (!functionsClient) {
            return [];
        }
        const executions: ExecutionList | undefined = await functionsClient.listExecutions(this.parent.func.$id, undefined, executionsToShow, undefined, 'DESC');
        const children = executions?.executions.map((execution: Execution) => new ExecutionTreeItem(this, execution)) ?? [new TreeItem('No exeuctions.')];
        ext.outputChannel.appendLog(`Found ${executions?.sum} executions`);
        children.push(new TreeItem('View more'));
        return children;
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "executions";

    iconPath = new ThemeIcon("history");
}
