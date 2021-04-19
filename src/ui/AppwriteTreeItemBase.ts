import { TreeDataProvider, TreeItem } from "vscode";

export abstract class AppwriteTreeItemBase<Parent = void> extends TreeItem {
    constructor(public readonly parent: Parent, label: string) {
        super(label);
    }

    abstract getChildren?(): Promise<TreeItem[]>;

}
