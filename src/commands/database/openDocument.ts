import { workspace } from "vscode";
import { DocumentTreeItem } from "../../tree/database/DocumentTreeItem";
import { openReadOnlyJson } from "../../ui/openReadonlyContent";

function parseJSONString(str: string): { valid: boolean; value: any } {
    try {
        return { value: JSON.parse(str), valid: true };
    } catch (e) {
        return { value: str, valid: false };
    }
}

export async function viewDocumentAsJson(documentTreeItem: DocumentTreeItem): Promise<void> {
    const document = documentTreeItem.document;
    const documentId = document["$id"];

    const formatJsonStrings = workspace.getConfiguration("appwrite").get<Boolean>("formatJsonStrings");

    if (formatJsonStrings) {
        Object.entries(document).forEach(([key, value]) => {
            if (typeof value === "string") {
                const result = parseJSONString(value);
                document[key] = result.value;
            }
        });
    }

    await openReadOnlyJson(
        {
            label: documentId,
            fullId: documentId,
        },
        documentTreeItem.document
    );
}
