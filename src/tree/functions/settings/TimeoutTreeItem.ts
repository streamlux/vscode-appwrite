import { InputBoxOptions, MarkdownString } from "vscode";
import { Function } from "../../../appwrite";
import { functionsClient } from "../../../client";
import { ext } from "../../../extensionVariables";
import { StringEditableTreeItemBase } from "../../common/StringEditableTreeItem";

function isNumeric(str: string) {
    console.log("here");
    return !isNaN(+str);
}

export class TimeoutTreeItem extends StringEditableTreeItemBase {
    inputBoxOptions: InputBoxOptions = {
        validateInput: (value) => {
            if (!isNumeric(value)) {
                return "Input must be an integer.";
            }

            if (+value > 900) {
                return "Value exceeds the maximum of 900 seconds (15 minutes)";
            }

            if (+value < 0) {
                return "Value cannot be negative";
            }
        },
        prompt: "Function maximum execution time in seconds. Maximum of 900 seconds (15 minutes).",
    };

    public async setValue(value: string): Promise<void> {
        await functionsClient?.update(
            this.func.$id,
            this.func.name,
            [],
            this.func.vars,
            this.func.events,
            this.func.schedule,
            parseInt(value)
        );
        ext.tree?.functions?.refresh();
    }

    constructor(private readonly func: Function) {
        super("Timeout", func.timeout.toString());
        this.tooltip = new MarkdownString(`Function maximum execution time in seconds.`);
        this.label = `${this.value}s`;
    }
}
