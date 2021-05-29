import { ThemeIcon, TreeItem } from "vscode";
import { Tag } from '../../../appwrite';
import { TagsTreeItem } from './TagsTreeItem';

export class TagTreeItem extends TreeItem {
    constructor(public readonly parent: TagsTreeItem, public readonly tag: Tag) {
        super(tag.$id);
        const func = parent.parent.func;
        const active = func.tag === tag.$id;
        this.label = `${tag.$id}${active ? ' (Active)' : ''}`;
        this.iconPath = new ThemeIcon(active ? 'circle-filled' : 'circle-outline');
        this.contextValue = `tag${active ? '_active' : ''}`;
    }
}
