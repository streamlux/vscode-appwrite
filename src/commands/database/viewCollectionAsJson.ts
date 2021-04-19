import { CollectionTreeItem } from "../../tree/database/CollectionTreeItem";
import { openReadOnlyJson } from "../../ui/openReadonlyContent";

export async function viewCollectionAsJson(collectionTreeItem: CollectionTreeItem): Promise<void> {
    const collection = collectionTreeItem.collection;
    await openReadOnlyJson({ label: collection.name, fullId: collection.$id }, collection);
}
