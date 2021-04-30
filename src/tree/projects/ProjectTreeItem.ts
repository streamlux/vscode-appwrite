import { ThemeIcon, TreeItem } from "vscode";
import { AppwriteProjectConfiguration } from "../../settings";

export class ProjectTreeItem extends TreeItem {
    constructor(public readonly project: AppwriteProjectConfiguration, active: boolean) {
        super("Project");
        this.iconPath = new ThemeIcon("rocket");
        const name = project.nickname ?? "Project";
        this.label = `${name} ${active ? "(Active)" : ""}`;
        this.contextValue = `appwriteProject${active ? "_active" : ""}`;
        if (!active) {
            this.command = { command: "vscode-appwrite.setActiveProject", title: "Set active", arguments: [this] };
        }
    }
}
