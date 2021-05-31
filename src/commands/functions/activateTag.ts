import { Tag } from '../../appwrite';
import { functionsClient } from '../../client';
import { TagTreeItem } from '../../tree/functions/tags/TagTreeItem';

export async function activateTag(tagItem: TagTreeItem | Tag): Promise<void> {
    const tag = tagItem instanceof TagTreeItem ? tagItem.tag : tagItem;
    await functionsClient?.updateTag(tag.functionId, tag.$id);
}
