import { CollectionTreeItem } from '../../tree/database/CollectionTreeItem';
import { openUrl } from '../../utils/openUrl';

export async function openCollectionInBrowser(treeItem: CollectionTreeItem): Promise<void> {
    openUrl(treeItem.getUrl());
}
