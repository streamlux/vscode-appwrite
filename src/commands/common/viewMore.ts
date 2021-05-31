import { AppwriteTreeItemBase } from '../../ui/AppwriteTreeItemBase';

export async function viewMore(treeItem: AppwriteTreeItemBase<any>): Promise<void> {
    await treeItem.viewMore();
}
