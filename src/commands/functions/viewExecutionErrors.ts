import { Execution } from '../../appwrite';
import { ExecutionTreeItem } from "../../tree/functions/executions/ExecutionTreeItem";
import { openReadOnlyContent } from "../../ui/openReadonlyContent";

export async function viewExecutionErrors(executionItem: ExecutionTreeItem | Execution): Promise<void> {
    if (executionItem === undefined) {
        return;
    }

    let execution = executionItem as Execution;

    if (executionItem instanceof ExecutionTreeItem) {
        execution = executionItem.execution;
    }
    await openReadOnlyContent({ label: `Execution stderr`, fullId: `${execution.$id}-errors.txt` }, execution.stderr, '.txt');
}
