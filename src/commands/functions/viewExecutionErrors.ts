import { ExecutionTreeItem } from "../../tree/functions/executions/ExecutionTreeItem";
import { openReadOnlyContent } from "../../ui/openReadonlyContent";

export async function viewExecutionErrors(executionItem: ExecutionTreeItem): Promise<void> {
    if (executionItem === undefined) {
        return;
    }

    const execution = executionItem.execution;
    await openReadOnlyContent({ label: `${executionItem.parent.parent.func.name} execution stderr`, fullId: `${execution.$id}-errors.txt` }, execution.stderr, '.txt');
}
