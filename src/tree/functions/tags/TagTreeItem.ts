import { MarkdownString, ThemeIcon, TreeItem } from "vscode";
import { Tag } from '../../../appwrite';
import { msToDate } from '../../../utils/date';
import { TagsTreeItem } from './TagsTreeItem';

export class TagTreeItem extends TreeItem {
    constructor(public readonly parent: TagsTreeItem, public readonly tag: Tag) {
        super(tag.$id);
        const func = parent.parent.func;
        const active = func.tag === tag.$id;
        this.label = `${msToDate(tag.dateCreated)}${active ? ' (Active)' : ''}`;
        this.description = tag.$id;
        this.iconPath = new ThemeIcon(active ? 'circle-filled' : 'circle-outline');
        this.contextValue = `tag${active ? '_active' : ''}`;
        this.tooltip = new MarkdownString(`ID: ${tag.$id}  \nCreated: ${msToDate(tag.dateCreated)}  \nCommand: ${tag.command}  \nSize: ${tag.size}B`);
    }
}
