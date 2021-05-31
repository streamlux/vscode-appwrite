import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { functionsClient } from "../../../client";
import { AppwriteTreeItemBase } from '../../../ui/AppwriteTreeItemBase';
import { FunctionTreeItem } from '../FunctionTreeItem';
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
        const children = tags?.tags.sort((a, b) => b.dateCreated - a.dateCreated).map((tag) => new TagTreeItem(this, tag)) ?? [new TreeItem('No tags.')];

        if (children.length === 0) {
            const noTagsItem: TreeItem = {
                command: {
                    command: "vscode-appwrite.CreateTag",
                    title: "Create tag",
                    arguments: [this],
                    tooltip: "Create a tag"
                },
                label: "Create a tag",
                iconPath: new ThemeIcon("cloud-upload"),
            };
            children.push(noTagsItem);
        }
        return children;
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "tags";

    iconPath = new ThemeIcon("tag");
}
