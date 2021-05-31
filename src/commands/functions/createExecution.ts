import { window } from 'vscode';
import { Execution } from '../../appwrite';
import { functionsClient } from '../../client';
import { ext } from '../../extensionVariables';
import { FunctionTreeItem } from '../../tree/functions/FunctionTreeItem';
import { sleep } from '../../utils/sleep';
import { viewExecutionErrors } from './viewExecutionErrors';
import { viewExecutionOutput } from './viewExecutionOutput';

export async function createExecution(functionTreeItem: FunctionTreeItem): Promise<void> {
    const func = functionTreeItem.func;
    await executeFunction(func.$id);
}

export async function executeFunction(functionId: string): Promise<void> {
    ext.outputChannel.appendLog(`Creating execution for function with ID: ${functionId}`);
    let execution = await functionsClient?.createExecution(functionId);
    await ext.tree?.functions?.refresh();

    if (execution === undefined) {
        return;
    }

    execution = await waitForExecution(execution);

    if (execution === undefined) {
        return;
    }

    const failed = execution.status === "failed";
    const item = !failed ? "View output" : "View errors";
    const action = await window.showInformationMessage(`Execution ${failed ? "failed" : "completed"} in ${execution.time.toFixed(2)}s.`, item);
    if (action === item) {
        if (item === "View output") {
            await viewExecutionOutput(execution);
            return;
        }
        await viewExecutionErrors(execution);
        return;
    }
}

async function waitForExecution(execution: Execution | undefined): Promise<Execution | undefined> {
    ext.outputChannel.appendLog("Waiting for execution...");
    if (execution === undefined) {
        return;
    }
    if (execution.status === "processing" || execution.status === "waiting") {
        await sleep(2000);

        ext.outputChannel.appendLog("Execution still ...");
        return await waitForExecution(await functionsClient?.getExecution(execution.functionId, execution.$id));
    }

    return execution;
}
