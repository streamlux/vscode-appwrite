import { clientConfig } from '../../client';
import { ExecutionsTreeItem } from '../../tree/functions/executions/ExecutionsTreeItem';
import { openUrl } from '../../utils/openUrl';
import { getConsoleUrlFromEndpoint } from '../users/openUserInConsole';

export async function openFunctionTagsInBrowser(treeItem: ExecutionsTreeItem | string): Promise<void> {

    const funcId = treeItem instanceof ExecutionsTreeItem ? treeItem.parent.func.$id : treeItem;


    const consoleUrl = getConsoleUrlFromEndpoint(clientConfig.endpoint);
    // https://console.streamlux.com/console/functions/function?id=60b1836a8e5d9&project=605ce39a30c01
    const url = `${consoleUrl}/functions/function?id=${funcId}&project=${clientConfig.projectId}`;
    openUrl(url);
}
