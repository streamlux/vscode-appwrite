import { env } from 'vscode';
import { ExecutionTreeItem } from "../../tree/functions/executions/ExecutionTreeItem";

export async function copyExecutionOutput(executionItem: ExecutionTreeItem): Promise<void> {
    if (executionItem === undefined) {
        return;
    }

    const execution = executionItem.execution;
    env.clipboard.writeText(execution.stdout);
}
