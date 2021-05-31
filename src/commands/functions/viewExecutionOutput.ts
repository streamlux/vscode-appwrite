import { Execution } from '../../appwrite';
import { ExecutionTreeItem } from "../../tree/functions/executions/ExecutionTreeItem";
import { openReadOnlyContent } from "../../ui/openReadonlyContent";

export async function viewExecutionOutput(executionItem: ExecutionTreeItem | Execution): Promise<void> {
    if (executionItem === undefined) {
        return;
    }

    let execution = executionItem as Execution;

    if (executionItem instanceof ExecutionTreeItem) {
        execution = executionItem.execution;
    }

    await openReadOnlyContent({ label: `Execution stdout`, fullId: `${execution.$id}-output.txt` }, execution.stdout, '.txt');
}
