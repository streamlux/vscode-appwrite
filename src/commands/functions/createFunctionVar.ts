import { functionsClient } from '../../client';
import { VarsTreeItem } from '../../tree/functions/settings/VarsTreeItem';
import { keyValuePrompt } from '../../tree/functions/settings/VarTreeItem';

export async function createFunctionVar(treeItem: VarsTreeItem): Promise<void> {
    if (treeItem === undefined) {
        return;
    }
    const func = treeItem.parent.func;
    const keyval = await keyValuePrompt();
    if (keyval) {
        const newVars = {...func.vars};
        newVars[keyval.key] = keyval.value;
        await functionsClient?.update(func.$id, func.name, [], newVars, func.events, func.schedule, func.timeout);
    }
}
