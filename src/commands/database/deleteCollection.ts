import { window } from "vscode";
import { databaseClient } from "../../client";
import { CollectionTreeItem } from "../../tree/database/CollectionTreeItem";
import { confirmDialog } from "../../ui/confirmDialog";

export async function deleteCollection(collectionTreeItem: CollectionTreeItem): Promise<void> {
    if (!databaseClient) {
        return;
    }
    const collection = collectionTreeItem.collection;
    try {
        const shouldDelete = await confirmDialog(`Delete collection "${collection.name}"?`);
        if (shouldDelete) {
            await databaseClient.deleteCollection(collection.$id);
            window.showInformationMessage(`Deleted collection "${collection.name}".`);
        }
    } catch (e) {
        window.showErrorMessage(e);
    }
}
