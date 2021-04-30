import { CollectionTreeItem } from "../../tree/database/CollectionTreeItem";

export async function refreshCollection(collectionTreeItem: CollectionTreeItem):  Promise<void> {
    await collectionTreeItem.refresh();
}
