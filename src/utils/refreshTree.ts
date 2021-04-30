import { AppwriteTree, ext } from "../extensionVariables";

export function refreshTree(...trees: (keyof AppwriteTree)[]): void {
    trees.forEach((tree) => {
        ext.tree?.[tree]?.refresh();
    });
}

export function refreshAllViews(): void {
    if (ext.tree) {
        for (const tree in ext.tree) {
            refreshTree(tree as keyof AppwriteTree);
        }
    }
}
