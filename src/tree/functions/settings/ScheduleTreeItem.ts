import { InputBoxOptions, MarkdownString } from "vscode";
import { Function } from "../../../appwrite";
import { functionsClient } from "../../../client";
import { ext } from "../../../extensionVariables";
import cron from "cron-validate";
import { FunctionSettingsTreeItem } from "./FunctionSettingsTreeItem";
import cronstrue from "cronstrue";
import { StringEditableTreeItemBase } from '../../common/StringEditableTreeItem';

export class ScheduleTreeItem extends StringEditableTreeItemBase {
    private readonly func: Function;

    inputBoxOptions: InputBoxOptions = {
        validateInput: (value) => {
            if (value === "") {
                return;
            }
            const cronResult = cron(value);
            if (!cronResult.isValid()) {
                return cronResult.getError().join(", ");
            }
        },
        value: this.value === "" ? "0 0 * * *" : this.value,
        prompt: "Function execution schedule in CRON format. Leave blank for no schedule. https://crontab.guru/examples.html",
    };

    public async setValue(value: string): Promise<void> {
        await functionsClient?.update(this.func.$id, this.func.name, [], this.func.vars, this.func.events, value === "" ? undefined : value, this.func.timeout);
        ext.tree?.functions?.refresh();
    }

    constructor(private readonly parent: FunctionSettingsTreeItem) {
        super("Schedule", parent.func.schedule);
        this.func = parent.func;
        this.tooltip = new MarkdownString(`Function execution schedule in CRON format`);
        this.label = `${this.value}`;
        const cronResult = cron(parent.func.schedule);
        if (cronResult.isValid()) {
            this.label = cronstrue.toString(this.value, { verbose: true });
        } else {
            this.label = this.value === "" ? "None" : "Invalid CRON";
        }
    }
}
