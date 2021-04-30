import { AppwriteTree, ext } from "../extensionVariables";

export function refreshTree(...trees: (keyof AppwriteTree)[]): void {
    trees.forEach((tree) => {
        ext.tree?.[tree]?.refresh();
    });
}

export function refreshAllViews(): void {
    if (ext.tree) {
        Object.keys(ext.tree).forEach((tree) => {
            refreshTree(tree as keyof AppwriteTree);
        });
    }
}
