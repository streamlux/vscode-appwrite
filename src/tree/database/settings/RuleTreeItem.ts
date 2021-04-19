import { TreeItem } from "vscode";
import { Rule } from "../../../appwrite";
import { ChildTreeItem } from "../../ChildTreeItem";
import { RulesTreeItem } from "./RulesTreeItem";

export class RuleTreeItem extends ChildTreeItem<RulesTreeItem> {
    constructor(parent: RulesTreeItem, public readonly rule: Rule) {
        super(parent, { label: rule.label, description: rule.type });
    }
    contextValue = "collection.rule";
}
