import { EditableTreeItem } from '../../tree/common/SimpleEditableTreeItem';

export async function editValue(treeItem: EditableTreeItem): Promise<void> {
    if (treeItem === undefined) {
        return;
    }

    await treeItem.prompt();
}
