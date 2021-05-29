import { functionsClient } from '../../client';
import { ext } from '../../extensionVariables';
import { FunctionTreeItem } from '../../tree/functions/FunctionTreeItem';

export async function createExecution(functionTreeItem: FunctionTreeItem): Promise<void> {
    const func = functionTreeItem.func;
    ext.outputChannel.appendLog(`Creating execution for function ${func.name}`);

    await functionsClient?.createExecution(func.$id);
}
