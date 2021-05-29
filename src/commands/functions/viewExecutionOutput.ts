import { ExecutionTreeItem } from "../../tree/functions/executions/ExecutionTreeItem";
import { openReadOnlyContent } from "../../ui/openReadonlyContent";

export async function viewExecutionOutput(executionItem: ExecutionTreeItem): Promise<void> {
    if (executionItem === undefined) {
        return;
    }

    const execution = executionItem.execution;
    await openReadOnlyContent({ label: `${executionItem.parent.parent.func.name} execution stdout`, fullId: `${execution.$id}-output.txt` }, execution.stdout, '.txt');
}
