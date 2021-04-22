import * as vscode from "vscode";
import { MarkdownString } from 'vscode';

export class HealthTreeItem extends vscode.TreeItem {
    constructor(public readonly label: string, status: any, tooltip?: string | MarkdownString | undefined) {
        super(label);
        console.log(status);
        this.label = label;
        this.iconPath = new vscode.ThemeIcon(status ? "check" : "error", new vscode.ThemeColor(status ? "#00ff00" : "list.errorForeground"));
        this.contextValue = `health.${label}`;
        this.description = "" + Object.values(status)[0];
        this.tooltip = tooltip;
    }

    contextValue = "health";
}
