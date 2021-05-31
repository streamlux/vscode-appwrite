import { ThemeIcon, TreeItem, TreeItemCollapsibleState } from "vscode";
import { Function } from "../../../appwrite";
import { functionsClient } from "../../../client";
import { AwTreeItem } from "../../common/AwTreeItem";
import { ChildTreeItem } from "../../ChildTreeItem";
import { FunctionTreeItem } from "../FunctionTreeItem";
import { EventsTreeItem } from "./EventsTreeItem";
import { NameTreeItem } from "./NameTreeItem";
import { ScheduleTreeItem } from "./ScheduleTreeItem";
import { TimeoutTreeItem } from "./TimeoutTreeItem";
import { VarsTreeItem } from "./VarsTreeItem";

export class FunctionSettingsTreeItem extends AwTreeItem<FunctionTreeItem> {
    public readonly func: Function;

    constructor(public readonly parent: FunctionTreeItem) {
        super(parent, "Settings");
        this.func = parent.func;
    }

    public async getChildren(): Promise<TreeItem[]> {
        if (!functionsClient) {
            return [];
        }

        const children = [
            new NameTreeItem(this),
            new ScheduleTreeItem(this),
            new TimeoutTreeItem(this.func),
            new EventsTreeItem(this),
            new VarsTreeItem(this),
        ];
        return children;
    }

    labelItem(label: string, value: string): TreeItem {
        return new ChildTreeItem(this, { label: value === "" ? "None" : value, description: label });
    }

    collapsibleState = TreeItemCollapsibleState.Collapsed;

    contextValue = "functionSettings";

    iconPath = new ThemeIcon("settings");
}
