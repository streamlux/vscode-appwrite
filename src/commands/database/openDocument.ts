import { DocumentTreeItem } from "../../tree/database/DocumentTreeItem";
import { openReadOnlyJson } from "../../ui/openReadonlyContent";

export async function viewDocumentAsJson(documentTreeItem: DocumentTreeItem): Promise<void> {
    const documentId = documentTreeItem.document["$id"];
    await openReadOnlyJson(
        {
            label: documentId,
            fullId: documentId,
        },
        documentTreeItem.document
    );
}
