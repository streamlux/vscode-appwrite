import { ThemeIcon, TreeItem } from "vscode";
import { File } from "../../appwrite";

export class FileTreeItem extends TreeItem {
    constructor(public readonly file: File) {
        super(file.name);
    }

    iconPath = new ThemeIcon("file");

    contextValue = "file";
}
