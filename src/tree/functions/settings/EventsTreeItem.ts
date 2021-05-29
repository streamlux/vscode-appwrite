import { QuickPickItem, QuickPickOptions } from "vscode";
import { Function } from "../../../appwrite";
import { functionsClient } from "../../../client";
import { appwriteSystemEvents } from "../../../constants";
import { ext } from "../../../extensionVariables";
import { EnumEditableTreeItemBase } from "../../common/EnumEditableTreeItem";
import { FunctionSettingsTreeItem } from "./FunctionSettingsTreeItem";

export class EventsTreeItem extends EnumEditableTreeItemBase {
    public quickPickOptions: QuickPickOptions = {
        placeHolder: "Select which system events should trigger this function.",
        matchOnDescription: true
    };
    public options: string[] | QuickPickItem[] = appwriteSystemEvents.map((event) => ({
        label: event.name,
        description: event.description.replace("This event t", "T")
    }));

    public readonly func: Function;

    constructor(public readonly parent: FunctionSettingsTreeItem) {
        super("System events", parent.func.events);
        this.func = parent.func;
        this.label = parent.func.events.length === 0 ? 'None' : `${parent.func.events.length} active`;
    }

    public async setValue(value: string[]): Promise<void> {
        await functionsClient?.update(this.func.$id, this.func.name, [], this.func.vars, value, this.func.schedule, this.func.timeout);
        ext.tree?.functions?.refresh();
    }
}
