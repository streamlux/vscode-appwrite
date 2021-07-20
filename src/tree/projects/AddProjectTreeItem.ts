import { ThemeIcon, TreeItem } from "vscode";

export class AddProjectTreeItem extends TreeItem {
    iconPath = new ThemeIcon("add");

    constructor() {
        super("Add Appwrite project");
    }

    contextValue = "";

    command = {
        command: "vscode-appwrite.addProject",
        title: "Add Appwrite project",
    };
}
