import { Command, ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Execution, ExecutionList } from "../../../appwrite";
import { functionsClient } from "../../../client";
import { ExecutionTreeItem } from "./ExecutionTreeItem";
import { FunctionTreeItem } from "../FunctionTreeItem";
import { ext } from "../../../extensionVariables";
import { AppwriteTreeItemBase } from "../../../ui/AppwriteTreeItemBase";

export class ExecutionsTreeItem extends AppwriteTreeItemBase<FunctionTreeItem> {
    constructor(public readonly parent: FunctionTreeItem) {
        super(parent, "Executions");
    }

    private executionsToShow = 10;

    public async getChildren(): Promise<TreeItem[]> {
        if (!functionsClient) {
            return [];
        }
        const executions: ExecutionList | undefined = await functionsClient.listExecutions(
            this.parent.func.$id,
            undefined,
            this.executionsToShow,
            undefined,
            "DESC"
        );
        const children = executions?.executions.map((execution: Execution) => new ExecutionTreeItem(this, execution)) ?? [
            new TreeItem("No executions."),
        ];
        if (children.length === 0) {
            children.push(new TreeItem("No executions."));
        }
        ext.outputChannel.appendLog(`Found ${executions?.sum} executions`);
        if (executions?.sum ?? (0 > this.executionsToShow && this.executionsToShow !== 100)) {
            const viewMoreItem: TreeItem = {
                command: {
                    command: "vscode-appwrite.viewMore",
                    arguments: [this],
                    title: "View more",
                },
                label: "View more...",
            };
            children.push(viewMoreItem);
        }
        return children;
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "executions";

    iconPath = new ThemeIcon("history");

    async viewMore(): Promise<void> {
        this.executionsToShow += 10;
        if (this.executionsToShow > 100) {
            this.executionsToShow = 100;
        }
        ext.tree?.functions?.refreshChild(this);
    }
}
