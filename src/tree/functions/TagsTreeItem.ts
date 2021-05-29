import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { functionsClient } from "../../client";
import { AppwriteTreeItemBase } from '../../ui/AppwriteTreeItemBase';
import { FunctionTreeItem } from './FunctionTreeItem';
import { TagTreeItem } from './TagTreeItem';

export class TagsTreeItem extends AppwriteTreeItemBase<FunctionTreeItem> {
    constructor(public readonly parent: FunctionTreeItem) {
        super(parent, "Tags");
    }

    public async getChildren(): Promise<TreeItem[]> {
        if (!functionsClient) {
            return [];
        }
        const tags = await functionsClient.listTags(this.parent.func.$id);
        return tags?.tags.sort((a, b) => b.dateCreated - a.dateCreated).map((tag) => new TagTreeItem(this, tag)) ?? [new TreeItem('No tags.')];
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "tags";

    iconPath = new ThemeIcon("tag");
}
