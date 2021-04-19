import { AppwriteTree, ext } from "../extensionVariables";

export function refreshTree(tree?: keyof AppwriteTree): void {
    if (tree !== undefined) {
        ext.tree?.[tree]?.refresh();
        return;
    }

    if (ext.tree) {
        Object.values(ext.tree).forEach((treeView) => {
            treeView?.refresh();
        });
    }
}
