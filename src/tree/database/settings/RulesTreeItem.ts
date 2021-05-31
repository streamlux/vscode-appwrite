import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Rule } from "../../../appwrite";
import { AwTreeItem } from "../../common/AwTreeItem";
import { CommandTreeItem } from "../../CommandTreeItem";
import { CollectionTreeItem } from "../CollectionTreeItem";
import { RuleTreeItem } from "./RuleTreeItem";

export class RulesTreeItem extends AwTreeItem<CollectionTreeItem> {
    public readonly rules: Rule[];

    constructor(parent: CollectionTreeItem) {
        super(parent, "Rules");
        this.rules = parent.collection.rules;
    }

    public async getChildren(): Promise<TreeItem[]> {
        if (this.rules.length === 0) {
            const addRuleItem = new CommandTreeItem(
                { label: "Add rule", iconPath: new ThemeIcon("add") },
                { command: "vscode-appwrite.createRule", arguments: [this], title: "Create rule", tooltip: "Create collection rule" }
            );
            return [addRuleItem];
        }
        return this.rules.map((rule) => new RuleTreeItem(this, rule));
    }

    public async refresh(): Promise<void> {
        await this.parent.refresh();
    }

    iconPath = new ThemeIcon("symbol-property");
    contextValue = "collection.rules";
    collapsibleState = TreeItemCollapsibleState.Collapsed;
}
