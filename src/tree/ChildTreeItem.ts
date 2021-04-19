import { TreeItem } from "vscode";

export class ChildTreeItem<Parent> extends TreeItem {
    constructor(public readonly parent: Parent, item: TreeItem) {
        super(item.label || 'Please provide label');
        Object.assign(this, item);
    }
}
