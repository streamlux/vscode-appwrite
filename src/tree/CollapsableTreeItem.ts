import { TreeItem, TreeItemCollapsibleState } from "vscode";
import { AppwriteTreeItemBase } from "../ui/AppwriteTreeItemBase";

export class CollapsableTreeItem<Parent> extends AppwriteTreeItemBase<Parent> {
    constructor(parent: Parent, item: Partial<TreeItem> & { label: string }, private readonly children: TreeItem[], public readonly brand?: string) {
        super(parent, item.label);
        Object.assign(this, item);
    }

    public async getChildren(): Promise<TreeItem[]> {
        return this.children;
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;
}
