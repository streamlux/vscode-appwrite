import { CollectionTreeItem } from "../../tree/database/CollectionTreeItem";

export async function refreshCollection(collectionTreeItem: CollectionTreeItem) {
    await collectionTreeItem.refresh();
}
