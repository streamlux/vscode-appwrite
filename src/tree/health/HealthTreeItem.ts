import * as vscode from "vscode";

export class HealthTreeItem extends vscode.TreeItem {
    constructor(public readonly label: string, status: boolean) {
        super(label);
        this.label = label;
        this.iconPath = new vscode.ThemeIcon(status ? "check" : "error", new vscode.ThemeColor(status ? "#00ff00" : "list.errorForeground"));
        this.contextValue = `health.${label}`;
    }

    contextValue = "health";
}
