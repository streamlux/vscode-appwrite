import { functionsClient } from '../../client';
import { TagTreeItem } from '../../tree/functions/tags/TagTreeItem';

export async function activateTag(tagItem: TagTreeItem): Promise<void> {
    const tag = tagItem.tag;
    await functionsClient?.updateTag(tag.functionId, tag.$id);
}
