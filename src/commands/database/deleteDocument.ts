import { window } from "vscode";
import { databaseClient } from "../../client";
import { DocumentTreeItem } from "../../tree/database/DocumentTreeItem";
import { confirmDialog } from "../../ui/confirmDialog";

export async function deleteDocument(documentTreeItem: DocumentTreeItem): Promise<void> {
    if (!databaseClient) {
        return;
    }
    const document = documentTreeItem.document;
    const collection = documentTreeItem.parent.parent.collection;
    try {
        const shouldDelete = await confirmDialog(`Delete document "${document["$id"]}" from ${collection.name}?`);
        if (shouldDelete) {
            await databaseClient.deleteDocument(collection.$id, document["$id"]);
            documentTreeItem.parent.window.showInformationMessage(`Deleted document "${document["$id"]}" from ${collection.name}.`);
        }
    } catch (e) {
        window.showErrorMessage(e);
    }
}
